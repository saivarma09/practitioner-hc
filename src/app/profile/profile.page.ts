import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, NavController, IonModal } from '@ionic/angular/standalone';
import { PatientService } from '../patient-details/service/patient/patient-service';
import { ActivatedRoute } from '@angular/router';
import { PatientDemographicsResponse } from '../patient-details/models/patient-details';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonModal, IonContent, IonHeader, IonToolbar, CommonModule, FormsModule, IonModal]
})
export class ProfilePage implements OnInit {
  @ViewChild('avatarSelectedModal') avatarSelectedModal!: IonModal;
  patientId: string = '';
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
//   patientDetails: any = {
//     "userId": "HUJB7V3V",
//     "firstName": "Praveen",
//     "lastName": "Madupathy",
//     "title": "Mr",
//     "loginEmailAddress": "praveenm@healthcode.co.uk",
//     "status": "ACTIVE",
//     "homesite": {
//         "id": "HC02242",
//         "name": "My Skin Doctor UAT Test Site"
//     },
//     "sites": [
//         {
//             "siteId": "HC00GA2",
//             "siteName": "Mr T Sample",
//             "description": "HC00GA2 migrated from Veda",
//             "siteType": "s"
//         },
//         {
//             "siteId": "HC02242",
//             "siteName": "My Skin Doctor UAT Test Site",
//             "description": "Customer access only - not for internal use",
//             "siteType": "c"
//         },
//         {
//             "siteId": "HC02298",
//             "siteName": "UK Clinic",
//             "siteType": "c"
//         },
//         {
//             "siteId": "HC02499",
//             "siteName": "Arete Hospitals",
//             "description": "Arete Hospitals Mumbai",
//             "siteType": "c"
//         },
//         {
//             "siteId": "HC02500",
//             "siteName": "Gleneagles Hospitals",
//             "description": "Gleneagles Hospitals",
//             "siteType": "s"
//         },
//         {
//             "siteId": "HC02530",
//             "siteName": "Central Health London",
//             "description": "Customer user only no testing dat",
//             "siteType": "c"
//         },
//         {
//             "siteId": "HC02541",
//             "siteName": "Jones Jonathan BD Site",
//             "siteType": "s"
//         },
//         {
//             "siteId": "HCODE",
//             "siteName": "Healthcode",
//             "description": "HCODE migrated from Veda",
//             "siteType": "h"
//         }
//     ]
// };
  selectedAvatar: string | null = 'none';
  patientDetails:any;
  constructor(private navController: NavController, private route: ActivatedRoute, private patientService: PatientService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.selectedAvatar = localStorage.getItem('avatar') || 'none';
    this.patientDetails = JSON.parse(localStorage.getItem('userData') || '{}');
    // console.log('userData', this.patientDetails)
    this.cdr.detectChanges();
  }


  goBack() {
    this.navController.navigateBack('/dashboard');

  }

  editProfile(){
    this.avatarSelectedModal.present();
  }


    avatarSelected(avatar: any) {
    this.selectedAvatar = avatar;
    localStorage.setItem('avatar', avatar);
    this.avatarSelectedModal.dismiss();
  }

}
