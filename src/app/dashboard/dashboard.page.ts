import { Component, OnInit } from '@angular/core';
import { COMMON_MODULES } from '../shared/imports/imports';
import { LOADER_COUNT } from '../shared/constants/loader';
import { DashboardService } from './service/dashboard/dashboard-service';
import { DashboardData } from './model/dashboard';
import { SiteService } from '../site-selection/service/site/site-service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [COMMON_MODULES]
})
export class DashboardPage implements OnInit {

  loaders = ['', '', '', ''];
  showSkeletons = true;
  showCountsSkeletons = true;
  appointmentCounts?: DashboardData | any;
  userName:string =  '';


  constructor(private dashboardService: DashboardService, private siteService:SiteService, private router:Router) {
    this.userName = this.siteService.userInfo.title +' '+ this.siteService.userInfo.firstName +' '+ this.siteService.userInfo.lastName
   }

  ngOnInit() {
    this.getAppointmentInfo();
  }



  getAppointmentInfo() {
    this.dashboardService.appointmentCounts().subscribe((res: any) => {
      this.appointmentCounts = res;
      this.showCountsSkeletons = false;
    })
  }


  patientInfo(){
    this.router.navigate(['/patients-info'])
  }

  addPatient(){
    this.router.navigate(['/add-patients'])
  }
}
