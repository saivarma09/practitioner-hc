import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Browser } from '@capacitor/browser';
import { HttpClient } from '@angular/common/http';
import { SsoAuthenticationService } from '../sso-authentication/sso-authentication';

declare let cordova: any;

export interface EnvironmentConfig {
  serverUrl: string;
  healthcodeSSO_host: string,
  healthcodeSSO_redirectUri: string,
  healthcodeAccounts_host: string,
  pracAppClientId: string;
  production: boolean;
}

export interface EnvironmentConfigList {
  dev: EnvironmentConfig,
  uat: EnvironmentConfig,
  sit: EnvironmentConfig,
  prod: EnvironmentConfig
}

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  prompt: 'none' | 'login' | 'consent' = 'none';
  siteId: string = '';
  state: string = '';
  private currentPKCE: any = null; // Store PKCE for the session

  constructor(private ssoAuthService: SsoAuthenticationService, private router: Router, private http: HttpClient) { }

  async initiateApp(): Promise<void> {
    console.log('Initiating application configuration...');
    await this.setUpEnvironmentConfig();
    await this.handleSsoAuthentication();
  }

  public async setUpEnvironmentConfig() {
    return new Promise(async (resolve, reject) => {
      const currentEnvironment = await this.getEnvironment() as keyof EnvironmentConfigList;
      await this.configureEnvironmentBasedOnConfig(environment);
      resolve(true);
    });
  }

  private configureEnvironmentBasedOnConfig(environmentConfig: EnvironmentConfig) {
    return new Promise((resolve, reject) => {
      environment.serverUrl = environmentConfig.serverUrl || environment.serverUrl;
      environment.healthcodeAccounts_host = environmentConfig.healthcodeAccounts_host || environment.healthcodeAccounts_host;
      environment.healthcodeSSO_host = environmentConfig.healthcodeSSO_host || environment.healthcodeSSO_host;
      environment.healthcodeSSO_redirectUri = environmentConfig.healthcodeSSO_redirectUri || environment.healthcodeSSO_redirectUri;
      environment.pracAppClientId = environmentConfig.pracAppClientId || environment.pracAppClientId;
      environment.production = environmentConfig.production || environment.production;
      resolve(environment);
    });
  }

  private getEnvironment() {
    return new Promise((resolve, reject) => {
      const hostname = location.hostname;
      if (hostname === 'localhost' || !hostname) {
        resolve('dev');
        return;
      }
      if (hostname.includes('dev')) {
        resolve('dev');
      } else if (hostname.includes('uat')) {
        resolve('uat');
      } else if (hostname.includes('sit')) {
        resolve('sit');
      } else {
        resolve('prod');
      }
    });
  }

  private async handleSsoAuthentication() {
    const user = false;
    console.log('Existing SSO session:', user);
    if (!user) {
      await this.generateSsoSession();
    }
  }

  public async generateSsoSession(paramCodeValue?: string | null): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      if (paramCodeValue) {
        console.log('SSO code found in URL parameters:', paramCodeValue);
        
        try {
          // Step 1: Get sessionData
          const sessionData = await this.ssoAuthService
            .getTokenUsingParamCode(paramCodeValue, this.clientId);

          if (!sessionData?.token) {
            console.error('Invalid session data. Access token is missing.');
            reject(new Error('Invalid session data'));
            return;
          }

          let session = {
            sessionData,
          };

          session.sessionData.siteId = this.siteId;

          if (session && session.sessionData) {
            const ssoSession: any = {
              sessionData: session.sessionData,
            };
            localStorage.setItem('ssoSession', JSON.stringify(ssoSession));
            console.log('SSO session created successfully:', ssoSession);
            
            // Reset prompt after successful login
            this.prompt = 'none';
            this.router.navigate(['/dashboard']);
            resolve(true);
          } else {
            console.log('Incomplete ssoSession data received.');
            reject(new Error('Incomplete session data'));
          }
        } catch (error) {
          console.error('Error fetching session data:', error);
          reject(error);
        }
      } else {
        await this.redirectToHealthcodeSSO();
        resolve(true);
      }
    });
  }

  async redirectToHealthcodeSSO() {
    try {
      // Ensure any existing browser session is properly closed
      await this.closeBrowserSafely();
      
      // Generate fresh PKCE for each attempt
      this.currentPKCE = await this.generatePKCEPair();
      const url = `${environment.healthcodeSSO_host}${this.getAuthorizeURLString(this.currentPKCE.challenge)}`;
      
      console.log('Redirecting to SSO URL:', url);
      console.log('Using prompt:', this.prompt);

      // Add delay to ensure browser is fully closed
      await new Promise(resolve => setTimeout(resolve, 500));

      // Use Capacitor Browser plugin if available
      if ((window as any).Capacitor) {
        await Browser.open({ 
          url,
          windowName: '_blank',
          toolbarColor: '#ffffff',
          presentationStyle: 'popover'
        });
        return;
      }

      // Fallback to Cordova InAppBrowser if available
      if (window.hasOwnProperty('cordova') && cordova.InAppBrowser) {
        const target = '_blank';
        const options = 'location=yes,clearcache=yes,clearsessioncache=yes,toolbar=yes,zoom=no';
        const browser = cordova.InAppBrowser.open(url, target, options);
        
        browser.addEventListener('loadstop', (event: any) => {
          console.log('Browser loadstop:', event.url);
          if (event.url && event.url.includes('callback')) {
            browser.close();
          }
        });

        browser.addEventListener('loaderror', (event: any) => {
          console.error('Browser load error:', event);
        });

        return;
      }

      // Fallback to window.open for web
      const popup = window.open(url, '_blank', 'width=500,height=600,scrollbars=yes,resizable=yes');
      if (!popup) {
        console.error('Popup blocked. Please allow popups for this site.');
        return;
      }

      const pollTimer = window.setInterval(() => {
        try {
          if (popup.location.href && popup.location.href.includes('callback')) {
            popup.close();
            window.clearInterval(pollTimer);
          }
        } catch (e) {
          // Ignore cross-origin errors until redirected to our domain
        }
        if (popup.closed) {
          window.clearInterval(pollTimer);
        }
      }, 500);

    } catch (error) {
      console.error('Error during SSO redirect:', error);
    }
  }

  private async closeBrowserSafely() {
    try {
      // For Capacitor Browser
      if ((window as any).Capacitor) {
        await Browser.close();
      }
      // For Cordova, browser instances are managed differently
      // The browser reference would need to be stored to close it properly
    } catch (error) {
      console.log('Browser close error (expected):', error);
      // This is expected if no browser is open
    }
  }

  getAuthorizeURLString(codeChallenge: string): string {
    // Generate a unique state for each request
    this.state = Math.random().toString(36).substring(2, 15);
    
    return `/authorize?client_id=${this.clientId}` +
      `&response_type=code&scope=openid%20siteid%20email%20offline_access` +
      `&prompt=${this.prompt}` +
      `&redirect_uri=${encodeURIComponent(environment.healthcodeSSO_redirectUri)}` +
      `&state=${this.state}` +
      `&code_challenge=${codeChallenge}` +
      `&code_challenge_method=S256`;
  }

  get clientId(): string {
    console.log('Returning client ID:', environment.pracAppClientId);
    return environment.pracAppClientId;
  }

  logout() {
    // Clear local session
    localStorage.removeItem('ssoSession');
    this.prompt = 'none'; // Reset prompt
    
    return this.http.get(environment.healthcodeSSO_host + '/logout');
  }



  async generatePKCEPair(): Promise<any> {
    const randomVerifier = Array.from(crypto.getRandomValues(new Uint8Array(32)))
        .map(b => ('0' + b.toString(16)).slice(-2))
        .join('');

    const challenge = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(randomVerifier))
        .then(hashBuffer => btoa(String.fromCharCode(...new Uint8Array(hashBuffer)))
            .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, ''));

    // Store in local storage if needed
    localStorage.setItem('pkceGeneratedCode', JSON.stringify({ verifier: randomVerifier, challenge }));

    return { verifier: randomVerifier, challenge: challenge };
}
}