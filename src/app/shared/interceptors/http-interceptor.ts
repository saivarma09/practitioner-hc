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
import { Observable, throwError, from, of, BehaviorSubject } from 'rxjs';
import { catchError, mergeMap, switchMap, filter, take } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { Capacitor, CapacitorHttp } from '@capacitor/core';
import { environment } from 'src/environments/environment';
import { ConfigurationService } from '../core/services/configuration/configuration';
import { SsoAuthenticationService } from '../core/services/sso-authentication/sso-authentication';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private toastController: ToastController, 
    private configurationService: ConfigurationService, 
    private http: HttpClient
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get auth data
    const authData = this.getAuthData();
    
    if (!authData.token || !authData.siteId) {
      this.showToast('Authentication details missing. Please login again.');
      return throwError(() => new Error('Missing token or siteId'));
    }

    // Add auth headers
    const authReq = this.addAuthHeaders(req, authData.token, authData.siteId);
    
    // Handle request (native vs web)
    return this.handleRequest(authReq, next).pipe(
      catchError((error: HttpErrorResponse) => this.handleError(error, req, next))
    );
  }

  private getAuthData() {
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
    
    return { token, siteId };
  }

  private addAuthHeaders(req: HttpRequest<any>, token: string, siteId: string): HttpRequest<any> {
    return req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        'SU-siteId': siteId
      }
    });
  }

  private handleRequest(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const isNative = Capacitor.isNativePlatform();

    if (isNative) {
      return this.handleNativeRequest(req);
    } else {
      return next.handle(req);
    }
  }

  private handleNativeRequest(req: HttpRequest<any>): Observable<HttpEvent<any>> {
    const headersObj: Record<string, string> = {};
    req.headers.keys().forEach((k) => {
      const v = req.headers.get(k);
      if (v !== null) headersObj[k] = v;
    });

    const paramsObj: Record<string, string> = {};
    req.params.keys().forEach((k) => {
      const v = req.params.get(k);
      if (v !== null) paramsObj[k] = v;
    });

    console.debug('[HTTP][native] request', { url: req.url, method: req.method });
    
    return from(
      CapacitorHttp.request({
        url: req.url,
        method: req.method,
        headers: headersObj,
        data: req.body ?? undefined,
        params: Object.keys(paramsObj).length ? paramsObj : undefined,
      })
    ).pipe(
      mergeMap((res: any) => {
        console.debug('[HTTP][native] response', { url: req.url, status: res?.status });
        if (res.status >= 200 && res.status < 300) {
          const response = new HttpResponse({
            body: res.data,
            status: res.status,
            url: req.url,
            headers: new HttpHeaders(res.headers || {}),
          });
          return of(response as HttpEvent<any>);
        }
        console.error('[HTTP][native] error', { url: req.url, status: res?.status, data: res?.data });
        return throwError(() => new HttpErrorResponse({
          status: res.status,
          statusText: res?.statusText ?? '',
          url: req.url,
          error: res.data,
        }));
      })
    );
  }

  private handleError(error: HttpErrorResponse, originalReq: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Handle 401 Unauthorized - Token refresh needed
    if (error.status === 401) {
      return this.handle401Error(originalReq, next);
    }

    // Handle other errors
    let errorMessage = this.getErrorMessage(error.status, error.message);
    this.showToast(errorMessage);
    return throwError(() => error);
  }

  private handle401Error(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.refreshLoginSession().pipe(
        switchMap((token: any) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(token);
          
          // Retry original request with new token
          const authData = this.getAuthData();
          const authReq = this.addAuthHeaders(req, authData.token!, authData.siteId!);
          return this.handleRequest(authReq, next);
        }),
        catchError((err) => {
          this.isRefreshing = false;
          this.showToast('Session expired. Please login again.');
          this.handleErrorWhileRefreshingEpxSession();
          return throwError(() => err);
        })
      );
    } else {
      // If refresh is in progress, wait for it to complete
      return this.refreshTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(() => {
          // Retry original request with new token
          const authData = this.getAuthData();
          const authReq = this.addAuthHeaders(req, authData.token!, authData.siteId!);
          return this.handleRequest(authReq, next);
        })
      );
    }
  }

  private getErrorMessage(status: number, message: string): string {
    switch (status) {
      case 0:
        return 'No Internet Connection';
      case 400:
        return 'Bad Request';
      case 403:
        return 'Forbidden';
      case 404:
        return 'Resource Not Found';
      case 500:
        return 'Internal Server Error';
      default:
        return `Error Code: ${status}\nMessage: ${message}`;
    }
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
    // alert( this.configurationService.clientId)
    const pkceGeneratedCode = localStorage.getItem('pkceGeneratedCode');
    const codeVerifier = pkceGeneratedCode ? JSON.parse(pkceGeneratedCode).verifier : '';
    const sessionData = localStorage.getItem('ssoSession');
    const sessionInfo = sessionData ? JSON.parse(sessionData) : null;

    if (!sessionInfo?.sessionData?.refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    const params = new HttpParams()
      .set('grant_type', 'refresh_token')
      .set('refresh_token', sessionInfo.sessionData.refreshToken)
      .set('audience', this.configurationService.clientId)
      .set('code_verifier', codeVerifier);

    const username = this.configurationService.clientId;
    const authHeader = 'Basic ' + btoa(`${username}:`);


    console.log(params, authHeader);

    return this.getUpdatedTokenFromAccounts(params, authHeader)
      .pipe(
        switchMap((refreshSession: any) => {
          const updatedEpxSessionData: any = {
            token: refreshSession.access_token,
            refreshToken: refreshSession.refresh_token,
            siteId: localStorage.getItem('site_id'),
            idToken: refreshSession.id_token
          };
          console.log('Token refreshed successfully', updatedEpxSessionData);
          localStorage.setItem('ssoSession', JSON.stringify({ sessionData: updatedEpxSessionData }));
          return of(refreshSession);
        }),
        catchError((err) => {
          console.error('Token refresh failed:', err);
          return throwError(() => err);
        })
      );
  }

  getUpdatedTokenFromAccounts(payload: any, authHeader: any): Observable<any> {
    return this.http.post<any>(
      `${environment.healthcodeSSO_host}/token`,
      payload, {
        headers: {
          Authorization: authHeader,
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
  }

  handleErrorWhileRefreshingEpxSession() {
    // Clear stored auth data
    localStorage.removeItem('ssoSession');
    localStorage.removeItem('pkceGeneratedCode');
    localStorage.removeItem('site_id');
    
    // Navigate to login or show error
    // this.router.navigate(['/session-error'], { queryParams: { errorType: SessionErrorType.SERVER_ERROR } });
    // this.sessionService.sendCloseEventToEPX('sessionExpired');
  }
}