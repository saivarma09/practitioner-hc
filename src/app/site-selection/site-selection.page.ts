import { Component, OnInit } from '@angular/core';
import { COMMON_MODULES, FORM_MODULES, REACTIVE_FORM_MODULES } from '../shared/imports/imports';
import { SiteService } from './service/site/site-service';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-site-selection',
  templateUrl: './site-selection.page.html',
  styleUrls: ['./site-selection.page.scss'],
  standalone: true,
  imports: [COMMON_MODULES, FORM_MODULES, REACTIVE_FORM_MODULES]
})
export class SiteSelectionPage implements OnInit {
sites:any = [];
userName:string = '';
pathFill= 'red'
siteControl:any = new FormControl('', Validators.required);
  constructor(private readonly siteService:SiteService, private router:Router) { }

  ngOnInit() {
    this.userName = this.siteService.userInfo.title +' '+ this.siteService.userInfo.firstName +' '+ this.siteService.userInfo.lastName
    this.sites = this.siteService.userInfo.sites;
  }

  siteSelected(){
    if(this.siteControl.valid){
    localStorage.setItem('site_id', this.siteControl?.value?.siteId);
    this.router.navigate(['/dashboard']);
  }
  }

}
