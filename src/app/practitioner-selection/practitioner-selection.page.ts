import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonSelect, IonTitle, IonToolbar, NavController } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { PractitionerService } from './service/practitioner/practitioner-service';
import { FORM_MODULES, REACTIVE_FORM_MODULES } from '../shared/imports/imports';
import { SiteService } from '../site-selection/service/site/site-service';

@Component({
  selector: 'app-practitioner-selection',
  templateUrl: './practitioner-selection.page.html',
  styleUrls: ['./practitioner-selection.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, FORM_MODULES, IonSelect, REACTIVE_FORM_MODULES]
})
export class PractitionerSelectionPage implements OnInit {
  sites: any = [];
  userName: string = '';
  pathFill = 'red';
  practitioners: any;
  practitionerControl: any = new FormControl('', Validators.required);
  constructor(private readonly practitionerService: PractitionerService, private navController:NavController, private siteService: SiteService) {
    this.practitioners = this.siteService.getPractitionerInfo.data;
  }

  ngOnInit() {
    this.userName = this.practitionerService.userInfo.title + ' ' + this.practitionerService.userInfo.firstName + ' ' + this.practitionerService.userInfo.lastName
    this.sites = this.practitionerService.userInfo.sites;
  }

  practitionerSelected() {
    localStorage.setItem('practitioner', JSON.stringify(this.practitionerControl.value));
    this.navController.navigateForward('/dashboard')
  }

}
