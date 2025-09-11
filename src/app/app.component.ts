import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { App as CapacitorApp } from '@capacitor/app';
import { Browser } from '@capacitor/browser';
import { ConfigurationService } from './shared/core/services/configuration/configuration';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(
    private router: Router, 
    private configurationService: ConfigurationService
  ) {
    this.initializeDeepLinkHandler();
  }

  initializeDeepLinkHandler() {
    CapacitorApp.addListener('appUrlOpen', async (data: any) => {
      if (data?.url) {
        try {
          const url = new URL(data.url);
          console.log('Received deep link:', url.href);
          console.log('Parsed URL:', {
            protocol: url.protocol,
            host: url.host,
            hostname: url.hostname,
            pathname: url.pathname,
            search: url.search,
          });

          // Support custom scheme format like: io.ionic.starter://login?...
          // In that case, URL treats "login" as the host and pathname may be ''
          const routePath = url.pathname && url.pathname !== '/' ? url.pathname : `/${url.host}`;

          // Some environments show only `search` and not usable `searchParams`
          // Build a resilient params object from `search` (and `hash` if needed)
          const rawQuery = url.search || (url.hash && url.hash.includes('?') ? url.hash.substring(url.hash.indexOf('?')) : '');
          const normalizedQuery = rawQuery.startsWith('?') ? rawQuery.substring(1) : rawQuery;
          const searchParams = new URLSearchParams(normalizedQuery);

          // Handle successful authentication callback
          if (searchParams.get('code')) {
            if (routePath === '/login') {
              const code = searchParams.get('code');
              const state = searchParams.get('state');
              console.log('Parsed code:', code, 'Parsed state:', state);

              // Close the browser immediately
              try {
                await Browser.close();
              } catch (e) {
                console.log('Browser close error (expected):', e);
              }

              // Delay to ensure browser is closed and router is ready
              setTimeout(async () => {
                try {
                  // Process the SSO code
                  const success = await this.configurationService.generateSsoSession(code);
                  if (success) {
                    console.log(success)
                    console.log('SSO session generated successfully');
                    // Navigation is handled within generateSsoSession
                  } else {
                    console.error('Failed to generate SSO session');
                    this.handleAuthenticationError();
                  }
                } catch (error) {
                  console.error('Error processing SSO code:', error);
                  this.handleAuthenticationError();
                }
              }, 300);
            }
          } 
          // Handle authentication errors
          else if (routePath === '/login' && searchParams.get('error')) {
            const error = searchParams.get('error');
            const errorDescription = searchParams.get('error_description');
            
            console.log('Authentication error:', error, errorDescription);

            // Close browser safely
            try {
              await Browser.close();
            } catch (e) {
              console.log('Browser close error (expected):', e);
            }

            // Handle specific error cases
            if (error === 'login_required') {
              console.log('Login required, switching to interactive login');
              this.configurationService.prompt = 'login';
              
              // Add delay before reopening browser
              setTimeout(async () => {
                try {
                  await this.configurationService.initiateApp();
                } catch (e) {
                  console.error('Error during login retry:', e);
                  this.handleAuthenticationError();
                }
              }, 800); // Increased delay for better stability
            } else {
              // Handle other errors
              this.handleAuthenticationError(error, errorDescription);
            }
          }
          // Handle other routes or scenarios
          else {
            console.log('Unhandled deep link route:', routePath);
          }

        } catch (e) {
          console.error('Error parsing URL:', e);
          this.handleAuthenticationError();
        }
      }
    });
  }

  private handleAuthenticationError(error?: any, description?: any) {
    console.error('Authentication error occurred:', error, description);
    
    // Reset configuration service state
    this.configurationService.prompt = 'none';
    
    // Navigate to appropriate error page or retry login
    // You might want to show an error message to the user here
    setTimeout(() => {
      this.router.navigate(['/login-error'], {
        queryParams: { error, description }
      });
    }, 300);
  }


  
}
