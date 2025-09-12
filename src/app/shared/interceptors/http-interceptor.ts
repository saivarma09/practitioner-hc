import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
  HttpResponse,
  HttpHeaders
} from '@angular/common/http';
import { Observable, throwError, from, of } from 'rxjs';
import { catchError, mergeMap } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';
import { Capacitor, CapacitorHttp } from '@capacitor/core';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private toastController: ToastController) { }

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
}
