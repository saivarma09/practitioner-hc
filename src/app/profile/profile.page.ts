import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, NavController } from '@ionic/angular/standalone';
import { PatientService } from '../patient-details/service/patient/patient-service';
import { ActivatedRoute } from '@angular/router';
import { PatientDemographicsResponse } from '../patient-details/models/patient-details';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonToolbar, CommonModule, FormsModule]
})
export class ProfilePage implements OnInit {
  patientId: string = 'avatar-2';
  patientDetails: any;
  selectedAvatar: string | null = null;
  constructor(private navController: NavController, private route: ActivatedRoute, private patientService: PatientService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.selectedAvatar = localStorage.getItem('avatar') || 'avatar-2';
    this.patientDetails = JSON.parse(localStorage.getItem('userData') || '{}');
    console.log('userData', this.patientDetails)
    this.cdr.detectChanges();
  }


  goBack() {
    this.navController.navigateBack('/dashboard');

  }
}
