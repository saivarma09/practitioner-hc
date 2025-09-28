import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { App as CapacitorApp } from '@capacitor/app';
import { Browser } from '@capacitor/browser';
import { ConfigurationService } from './shared/core/services/configuration/configuration';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

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
    // const user = localStorage.getItem('ssoSession');
    // console.log('Existing SSO session:', user);
    // if (!user) {
    //   this.initializeDeepLinkHandler();
    //   // await this.generateSsoSession();
    // } else {
    //   this.router.navigate(['/site-selection']);
    // }
    if (!environment.production) {
      localStorage.setItem('ssoSession', JSON.stringify({
        "sessionData":{
  "token": "eyJraWQiOiJyc2ExIiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJIVUdXRkpKNiIsImF6cCI6InByZXNjcmlwdGlvbnMiLCJpc3MiOiJodHRwczpcL1wvYXV0aC5kZXYuaGVhbHRoY29kZS5jby51a1wvIiwiZXhwIjoxNzU5MDcxMjAwLCJpYXQiOjE3NTkwNjc2MDAsImp0aSI6IjI5N2FjODQyLTJhMTMtNGU1ZC05ZWQwLTM4MzIyZjA0YmFmYiJ9.Z_CJtMWKsOKRSPNxUsdk6FHFLHE4Tv5OCgn0GHgxnY7_LuU5n6yoIB-BeocLdqnwXGmNSoQfv8caGx23uhiFnJd7SxcuyEmYSNpmrEW8YKRs5M_B42N8FTw0zN6pQVrMWsxIF-6-0-9-EmnOmU9MNgTeT2pYettC_Vm4H5rmhvNGgNH0pp33K9pvoTuI5fnFQyJX8mEld14p5kj0oK7w9NZmJ8kKdfutZNJ22qn0Z9nYHB3NpVkGtCufEMWf5Z48GLPmkCfupD6oIocsTRdBWJW0S7K9ZpxABSN_Nl12qAg0wZ8XggA4sCqf_r1X540ow0OfN4ifxsF_m_JT9rW6FA",
  "idToken": "eyJraWQiOiJyc2ExIiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJIVUdXRkpKNiIsImF1ZCI6InByZXNjcmlwdGlvbnMiLCJhdXRoX3RpbWUiOjE3NTkwNjc1NDEsImtpZCI6InJzYTEiLCJpc3MiOiJodHRwczpcL1wvYXV0aC5kZXYuaGVhbHRoY29kZS5jby51a1wvIiwic2l0ZWlkIjoiIiwiZXhwIjoxNzU5MDY4MjAwLCJpYXQiOjE3NTkwNjc2MDAsImp0aSI6IjU0MTViZmEwLTIyZDMtNGVmNS1iMzY3LWY0NzU4MmFiOWU4YyIsImVtYWlsIjoicHJhdmVlbm1AaGVhbHRoY29kZS5jby51ayIsImVtYWlsdmVyaWZpZWQiOnRydWV9.O1GLjMy0SqxG6SJmz0RebOHS8sVB7sUDaxWT8vT3-j9rilIWBxdoblFW3E9Aonlf0_iZuWzWteWBoEZRu2KOJmxqqzrd1VTcWgWH_z6pcirek3nN2rYd_WmA9PSOvTMViKOve5nQugp5BOXmw3lEENm3do5LYFLhI4kwbglyZEF4jpS-YBdJUiarb1ttrIFEGvV3RukdnXmqomwNIc7sqcDKpJi_L8SszJl4RxyGDnq_Z-BRyZ1iBcL5cdeqtan2cQ01uxK5nuOS3YM7FUbSzDszl8zFR5ZCVUITIUPYLw8ukn7KVgTw4luo9Xm5wV1_U4E1MNfmMZ3uFCMLaNVOAQ",
  "refreshToken": "eyJhbGciOiJub25lIn0.eyJqdGkiOiIxZTRmMDk2MS05N2JiLTRmOTQtYTg0OC0yNGRiMGMwYzRmZjAifQ.",
  "siteId": "HC11206"
},
        "user": {
          "userId": "HUGWFJJ6",
          "title": "Mr",
          "firstName": "Praveen",
          "lastName": "Kumar",
          "middleName": "",
          "loginEmailAddress": "praveenm@healthcode.co.uk",
          "status": "ACTIVE",
          "homesite": {
            "id": "HC010H5",
            "name": "Prince Diana [0000099]"
          },
          "sites": [
            {
              "siteId": "HC010H5",
              "siteName": "Prince Diana [0000099]",
              "description": "HC010H5 migrated from Veda",
              "siteType": "s"
            },
            {
              "siteId": "HC0115B",
              "siteName": "Gregory Testing Mike",
              "description": "HC0115B migrated from Veda",
              "siteType": "s"
            },
            {
              "siteId": "HC011BF",
              "siteName": "Francis-Jones Trevor F",
              "description": "HC011BF migrated from Veda",
              "siteType": "s"
            },
            {
              "siteId": "HC011EU",
              "siteName": "Witt Ayda [SP051343]",
              "description": "HC011EU migrated from Veda",
              "siteType": "s"
            },
            {
              "siteId": "HC11206",
              "siteName": "Hyderabad Sunny Days Practice",
              "description": "",
              "siteType": "c"
            },
            {
              "siteId": "HC14308",
              "siteName": "My Skin Doctor",
              "description": null,
              "siteType": "c"
            },
            {
              "siteId": "HC14351",
              "siteName": "Alan Groom Practice",
              "description": null,
              "siteType": "s"
            },
            {
              "siteId": "HC15029",
              "siteName": "Central Health London",
              "description": null,
              "siteType": "c"
            },
            {
              "siteId": "HCODE",
              "siteName": "Healthcode",
              "description": "HCODE migrated from Veda",
              "siteType": "h"
            }
          ]
        },
        "userPermissions": [
          "Delete_ePrescription_1_0",
          "Digital_Signature_Submission_Review_1_0",
          "Formulary_Feature_1_0",
          "Asset_Management_1_0",
          "Prescribe_ePrescription_1_0",
          "Sign_ePrescription_1_0",
          "View_Site_ePrescriptions_1_0"
        ]
      })),
        localStorage.setItem('site_id', "HC11206");
    } else {
      this.initializeDeepLinkHandler();
    }

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
