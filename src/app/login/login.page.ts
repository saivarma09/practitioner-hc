import { Component, OnInit } from '@angular/core';
import { COMMON_MODULES } from '../shared/imports/imports';
import { SsoAuthenticationService } from '../shared/core/services/sso-authentication/sso-authentication';
import { ConfigurationService } from '../shared/core/services/configuration/configuration';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [COMMON_MODULES]
})
export class LoginPage implements OnInit {
pathFill: string = 'var(--ion-login-image-color)';
  constructor(private readonly ssoConfiguration:ConfigurationService) { }

  ngOnInit() {
  }

  openExternalLogin() {
    this.ssoConfiguration.initiateApp()
  }

}
