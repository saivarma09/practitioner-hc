import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { COMMON_MODULES } from '../shared/imports/imports';
import { DashboardService } from './service/dashboard/dashboard-service';
import { DashboardData } from './model/dashboard';
import { IonModal, NavController } from '@ionic/angular/standalone';
import { PractitionerService } from '../practitioner-selection/service/practitioner/practitioner-service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [COMMON_MODULES, IonModal]
})
export class DashboardPage implements OnInit, AfterViewInit {
  @ViewChild('avatarSelectedModal') avatarSelectedModal!: IonModal;
  loaders = ['', '', '', ''];
  showSkeletons = true;
  showCountsSkeletons = true;
  appointmentCounts?: DashboardData | any;
  userName: string = '';
  siteId: string = '';
  selectedAvatar: string | null = 'none';
  avatar: any[] = [
    { title: 'avatar-1' },
    { title: 'avatar-2' },
    // {title:'avatar-3'},
    { title: 'avatar-7' },
    { title: 'avatar-4' },
    { title: 'avatar-6' },
    { title: 'avatar-8' },
    { title: 'avatar-5' },
    { title: 'avatar-9' },
  ]

  constructor(private dashboardService: DashboardService,private practitionerService:PractitionerService, private router: NavController) {

    this.userName = this.practitionerService.getPractionerInfo.username;
  }

  ngOnInit() {
    this.getAppointmentInfo();
    this.siteId = localStorage.getItem('site_id') || 'HC2016';
  }


  ngAfterViewInit(): void {
    let avatar = localStorage.getItem('avatar') || null;
    if (!avatar) {
      this.avatarSelectedModal.present();
    }else{
      this.selectedAvatar = avatar;
    }

  }




  getAppointmentInfo() {
    this.dashboardService.appointmentCounts().subscribe((res: any) => {
      this.appointmentCounts = res;
      this.showCountsSkeletons = false;
    })
  }


  patientInfo() {
    this.router.navigateForward(['/patients-info'])
  }

  addPatient() {
    this.router.navigateForward(['/add-patients'])
  }

  backToSiteSelection() {
    this.router.navigateBack(['/site-selection'])
  }

  onWillDismiss() {
    // localStorage.setItem('avatar', 'none')

  }

  avatarSelected(avatar: any) {
    this.selectedAvatar = avatar;
    localStorage.setItem('avatar', avatar);
    this.avatarSelectedModal.dismiss();
  }

  profileSelected(){
    this.router.navigateForward(['/profile']);
  }
}
