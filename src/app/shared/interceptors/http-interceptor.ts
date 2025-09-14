import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpResponse,
  HttpHeaders,
  HttpParams,
  HttpClient
} from '@angular/common/http';
import { Observable, throwError, from, of } from 'rxjs';
import { catchError, mergeMap, switchMap } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { Capacitor, CapacitorHttp } from '@capacitor/core';
import { environment } from 'src/environments/environment';
import { ConfigurationService } from '../core/services/configuration/configuration';
import { SsoAuthenticationService } from '../core/services/sso-authentication/sso-authentication';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private toastController: ToastController, private configurationService: ConfigurationService, private http:HttpClient) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 🔹 Fetch token & siteId (replace with Preferences/Storage in real apps)
    const ssoSessionRaw = localStorage.getItem('ssoSession');
    let token: string | null = null;
    const siteId = localStorage.getItem('site_id');
    if (ssoSessionRaw) {
      try {
        const ssoSession = JSON.parse(ssoSessionRaw);
        token = ssoSession?.sessionData?.token || null;

      } catch (e) {
        console.error('Invalid ssoSession JSON in storage', e);
      }
    }


    if (!token || !siteId) {
      this.showToast('Authentication details missing. Please login again.');
      return throwError(() => new Error('Missing token or siteId'));
    }



    // 🔹 Clone request with Bearer + SU-siteId headers
    const modifiedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'SU-siteId': siteId
      }
    });

    const isNative = Capacitor.isNativePlatform();

    let handled$: Observable<HttpEvent<any>>;

    if (isNative) {
      // Use Capacitor native HTTP on device to bypass CORS
      const headersObj: Record<string, string> = {};
      modifiedReq.headers.keys().forEach((k) => {
        const v = modifiedReq.headers.get(k);
        if (v !== null) headersObj[k] = v;
      });

      // Use request URL as provided by the caller (services build full URLs)
      const url = modifiedReq.url;

      const paramsObj: Record<string, string> = {};
      modifiedReq.params.keys().forEach((k) => {
        const v = modifiedReq.params.get(k);
        if (v !== null) paramsObj[k] = v;
      });

      console.debug('[HTTP][native] request', { url: modifiedReq.url, method: modifiedReq.method });
      handled$ = from(
        CapacitorHttp.request({
          url,
          method: modifiedReq.method,
          headers: headersObj,
          data: modifiedReq.body ?? undefined,
          params: Object.keys(paramsObj).length ? paramsObj : undefined,
        })
      ).pipe(
        mergeMap((res: any) => {
          console.debug('[HTTP][native] response', { url, status: res?.status });
          if (res.status >= 200 && res.status < 300) {
            const response = new HttpResponse({
              body: res.data,
              status: res.status,
              url,
              headers: new HttpHeaders(res.headers || {}),
            });
            return of(response as HttpEvent<any>);
          }
          console.error('[HTTP][native] error', { url, status: res?.status, data: res?.data });
          return throwError(() => new HttpErrorResponse({
            status: res.status,
            statusText: res?.statusText ?? '',
            url,
            error: res.data,
          }));
        })
      );
    } else {
      handled$ = next.handle(modifiedReq);
    }

    return handled$.pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Something went wrong!';

        switch (error.status) {
          case 0:
            errorMessage = 'No Internet Connection';
            break;
          case 400:
            errorMessage = 'Bad Request';
            break;
          case 401:
            errorMessage = 'Unauthorized - Please login again';
            this.refreshLoginSession();
            break;
          case 403:
            errorMessage = 'Forbidden';
            break;
          case 404:
            errorMessage = 'Resource Not Found';
            break;
          case 500:
            errorMessage = 'Internal Server Error';
            break;
          default:
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }

        this.showToast(errorMessage);
        return throwError(() => error);
      })
    );
  }

  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color: 'danger',
      position: 'bottom'
    });
    await toast.present();
  }


  refreshLoginSession(): Observable<any> {

    const pkceGeneratedCode = localStorage.getItem('pkceGeneratedCode');
    const codeVerifier = pkceGeneratedCode ? JSON.parse(pkceGeneratedCode).verifier : '';
    const sessionData = localStorage.getItem('ssoSession');
    const sessionInfo = sessionData ? JSON.parse(sessionData) : null;



    const params = new HttpParams()
      .set('grant_type', 'refresh_token')
      .set('refresh_token', sessionInfo.sessionData.refreshToken)
      .set('audience', this.configurationService.clientId)
      .set('code_verifier', codeVerifier);

    const username = this.configurationService.clientId;

    const authHeader = 'Basic ' + btoa(`${username}:`);


    return this.getUpdatedTokenFromAccounts(params, authHeader)
      .pipe(switchMap((refreshSession: any) => {
        const updatedEpxSessionData: any = {
          token: refreshSession.access_token,
          refreshToken: refreshSession.refresh_token,
          siteId: localStorage.getItem('site_id'),
          idToken: refreshSession.id_token
        }
        localStorage.setItem('ssoSession', JSON.stringify({ sessionData: updatedEpxSessionData }));
        // Notify other parts of the app about the refreshed session;
        return of(refreshSession);
      }),
        catchError((err) => {
          console.log(err);
          this.handleErrorWhileRefreshingEpxSession();
          return of();
        })
      );
  }

    getUpdatedTokenFromAccounts(payload: any, authHeader: any): Observable<any> {
    // return this.http.post<any>(`${environment.healthcodeSSO_host}/token`, payload);
    return this.http.post<any>(
      `${environment.healthcodeSSO_host}/token`,
      payload, {
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    )
  }


  handleErrorWhileRefreshingEpxSession() {
    // this.router.navigate(['/session-error'], { queryParams: { errorType: SessionErrorType.SERVER_ERROR } });
    // this.sessionService.sendCloseEventToEPX('sessionExpired');
  }
}
