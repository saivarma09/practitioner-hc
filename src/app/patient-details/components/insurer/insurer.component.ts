import { Component, Input, OnInit } from '@angular/core';
import { PatientInsurer, PatientInsurerResponse } from '../../models/insurer';
import { PatientService } from '../../service/patient/patient-service';
import { DatePipe } from '@angular/common';
import { IonModal, IonSelect, IonToggle } from '@ionic/angular/standalone';
import { FORM_MODULES } from 'src/app/shared/imports/imports';
import { DatePickerComponent } from 'src/app/shared/components/date-picker/date-picker.component';

@Component({
  selector: 'app-insurer',
  templateUrl: './insurer.component.html',
  styleUrls: ['./insurer.component.scss'],
  imports:[DatePipe, IonModal, IonSelect, FORM_MODULES, DatePickerComponent, IonToggle]
})
export class InsurerComponent implements OnInit {
  insurerResponse: PatientInsurerResponse = {} as PatientInsurerResponse;
  insurerInfo: PatientInsurer[] = [];
  openInsurerModel:boolean = false;
  @Input() patientId:string = '';
  constructor(private patientService: PatientService) { }

  ngOnInit() {
    this.insurerResponse = {
      "data": [
        {
          "patientId": "EqaN9grUfCqDVRa63kuQTekFI",
          "id": "bup",
          "code": "bup",
          "name": "BUPA",
          "requiresDiagnosisCode": true,
          "isSTV": false,
          "acceptEdiClaims": true,
          "isESTV": false,
          "isSynchronousME": false,
          "description": "BUPA",
          "startDate": "",
          "expiryDate": "12/31/2025 00:00:00",
          "expired": false,
          "renewalDate": "",
          "isPrimary": true,
          "enquireAboutMembershipNo": false,
          "lastVerified": "",
          "isValid": false,
          "membershipId": "BHU6543"
        },
        {
          "patientId": "EqaN9grUfCqDVRa63kuQTekFI",
          "id": "bup",
          "code": "bup",
          "name": "BUPA",
          "requiresDiagnosisCode": true,
          "isSTV": false,
          "acceptEdiClaims": true,
          "isESTV": false,
          "isSynchronousME": false,
          "description": "BUPA",
          "startDate": "",
          "expiryDate": "12/31/2025 00:00:00",
          "expired": false,
          "renewalDate": "",
          "isPrimary": true,
          "enquireAboutMembershipNo": false,
          "lastVerified": "",
          "isValid": false,
          "membershipId": "BHU6543"
        },
        {
          "patientId": "EqaN9grUfCqDVRa63kuQTekFI",
          "id": "bup",
          "code": "bup",
          "name": "BUPA",
          "requiresDiagnosisCode": true,
          "isSTV": false,
          "acceptEdiClaims": true,
          "isESTV": false,
          "isSynchronousME": false,
          "description": "BUPA",
          "startDate": "",
          "expiryDate": "12/31/2025 00:00:00",
          "expired": false,
          "renewalDate": "",
          "isPrimary": true,
          "enquireAboutMembershipNo": false,
          "lastVerified": "",
          "isValid": false,
          "membershipId": "BHU6543"
        },
        {
          "patientId": "EqaN9grUfCqDVRa63kuQTekFI",
          "id": "bup",
          "code": "bup",
          "name": "BUPA",
          "requiresDiagnosisCode": true,
          "isSTV": false,
          "acceptEdiClaims": true,
          "isESTV": false,
          "isSynchronousME": false,
          "description": "BUPA",
          "startDate": "",
          "expiryDate": "12/31/2025 00:00:00",
          "expired": false,
          "renewalDate": "",
          "isPrimary": true,
          "enquireAboutMembershipNo": false,
          "lastVerified": "",
          "isValid": false,
          "membershipId": "BHU6543"
        },
        {
          "patientId": "EqaN9grUfCqDVRa63kuQTekFI",
          "id": "bup",
          "code": "bup",
          "name": "BUPA",
          "requiresDiagnosisCode": true,
          "isSTV": false,
          "acceptEdiClaims": true,
          "isESTV": false,
          "isSynchronousME": false,
          "description": "BUPA",
          "startDate": "",
          "expiryDate": "12/31/2025 00:00:00",
          "expired": false,
          "renewalDate": "",
          "isPrimary": true,
          "enquireAboutMembershipNo": false,
          "lastVerified": "",
          "isValid": false,
          "membershipId": "BHU6543"
        },
        {
          "patientId": "EqaN9grUfCqDVRa63kuQTekFI",
          "id": "bup",
          "code": "bup",
          "name": "BUPA",
          "requiresDiagnosisCode": true,
          "isSTV": false,
          "acceptEdiClaims": true,
          "isESTV": false,
          "isSynchronousME": false,
          "description": "BUPA",
          "startDate": "",
          "expiryDate": "12/31/2025 00:00:00",
          "expired": false,
          "renewalDate": "",
          "isPrimary": true,
          "enquireAboutMembershipNo": false,
          "lastVerified": "",
          "isValid": false,
          "membershipId": "BHU6543"
        },
        {
          "patientId": "EqaN9grUfCqDVRa63kuQTekFI",
          "id": "bup",
          "code": "bup",
          "name": "BUPA",
          "requiresDiagnosisCode": true,
          "isSTV": false,
          "acceptEdiClaims": true,
          "isESTV": false,
          "isSynchronousME": false,
          "description": "BUPA",
          "startDate": "",
          "expiryDate": "12/31/2025 00:00:00",
          "expired": false,
          "renewalDate": "",
          "isPrimary": true,
          "enquireAboutMembershipNo": false,
          "lastVerified": "",
          "isValid": false,
          "membershipId": "BHU6543"
        }
      ],
      "success": true,
      "resource": "PatientInsurer"
    }
    this.insurerInfo = this.insurerResponse.data
  }


  editInsurer(insurerInfo:PatientInsurer){

  }
}
