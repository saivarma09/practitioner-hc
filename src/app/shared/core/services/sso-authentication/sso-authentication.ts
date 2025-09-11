import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, firstValueFrom, map } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface SsoSession {
  idToken: string;
  token: string;
  refreshToken: string;
}


@Injectable({
  providedIn: 'root'
})
export class SsoAuthenticationService {

  constructor( private readonly http: HttpClient) { }

  getTokenUsingParamCode(paramCode: string, clientId: string): Promise<any> {
    const pkceGeneratedCode = localStorage.getItem('pkceGeneratedCode');
    const codeVerifier = pkceGeneratedCode ? JSON.parse(pkceGeneratedCode).verifier : '';

    // Create the query parameters
    const params = new HttpParams()
      .set('grant_type', 'authorization_code')
      .set('code', paramCode)
      .set('redirect_uri', environment.healthcodeSSO_redirectUri)
      .set('client_id', clientId)
      .set('code_verifier', codeVerifier);
      console.log(environment);
      // alert(JSON.stringify(environment));

    const observable$ = this.http.post<any>(`${environment.healthcodeSSO_host}/token`, null, { params }).pipe(
      map((data) => {

        const tokenObject: SsoSession = {
          token: data.access_token,
          idToken: data.id_token,
          refreshToken: data.refresh_token,
        };

        const ssoSession: any = {
          sessionData: tokenObject
        }

        console.log('SSO session created successfully:', ssoSession);

        return tokenObject;
      })
    );

    return firstValueFrom(observable$);
  }



    getUser(accessToken: string): Promise<any> {
    const headers = this.getHeadersByToken(accessToken);
    return firstValueFrom(
      this.http.get<any>(`${environment.healthcodeAccounts_host}/api/restricted/user`, { headers }).pipe(
        catchError((error => {
          console.error('Error fetching user data:', error);
          throw error;
        }) )
      )
    );
  }



   private getHeadersByToken(token: string, siteId: string = ''): HttpHeaders {

    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'SU-SiteId': siteId,
    });
  }


  


}
