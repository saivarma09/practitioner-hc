import { Component, OnInit } from '@angular/core';
import { COMMON_MODULES, FORM_MODULES } from '../shared/imports/imports';
import { SsoAuthenticationService } from '../shared/core/services/sso-authentication/sso-authentication';
import { ConfigurationService } from '../shared/core/services/configuration/configuration';
import { IonList } from "@ionic/angular/standalone";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonList, COMMON_MODULES, FORM_MODULES]
})
export class LoginPage implements OnInit {
pathFill: string = 'var(--ion-login-image-color)';
sites:any = []
  constructor(private readonly ssoConfiguration:ConfigurationService) { }

  ngOnInit() {
  }

  openExternalLogin() {
    this.ssoConfiguration.initiateApp()
  }

}
