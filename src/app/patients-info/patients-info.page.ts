import { Component, ChangeDetectorRef } from '@angular/core';
import { InfiniteScrollCustomEvent, IonInfiniteScroll, IonInfiniteScrollContent, IonSearchbar, NavController } from '@ionic/angular/standalone';
import { PatientsService } from './service/patients/patients-service';
import { COMMON_MODULES, FORM_MODULES } from '../shared/imports/imports';
import { GenderPipe } from '../shared/pipes/gender/gender-pipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patients-info',
  templateUrl: './patients-info.page.html',
  styleUrls: ['./patients-info.page.scss'],
  standalone: true,
  imports: [COMMON_MODULES, FORM_MODULES, IonInfiniteScroll, IonInfiniteScrollContent,GenderPipe, IonSearchbar]
})
export class PatientsInfoPage {
  patients: any[] = [];
  page = 1;
  count = 10;
  totalPages = 1;
  strokeColor: string = 'var(--ion-primary-color)';

  patientsSkeleton: Array<any> = Array(10).fill('');

  constructor(private patientService: PatientsService, private cdr: ChangeDetectorRef, private navController:NavController) {
    this.loadPatients();
    // this.patients  =  [
    //       {
    //           "id": "Mhcgahz9tzTBLdtMHeIWLIQS4",
    //           "firstName": "Win",
    //           "lastName": "Duster",
    //           "sex": "F",
    //           "deceased": true,
    //           "status": "A",
    //           "doesAppointmentExists": false,
    //           "onStop": false,
    //           "lastUpdatedOn": "2025-05-20T11:56:59.021246",
    //           "lastUpdatedBy": "HUOWRCVK",
    //           "payor": "Self pay",
    //           "isSafeguarded": false,
    //           "patientVisitStatus": [
    //               {
    //                   "step": "First",
    //                   "value": "Reception",
    //                   "isRecent": false
    //               },
    //               {
    //                   "step": "Second",
    //                   "value": "Arrived",
    //                   "isRecent": false
    //               },
    //               {
    //                   "step": "Third",
    //                   "value": "Waiting Hall",
    //                   "isRecent": false
    //               },
    //               {
    //                   "step": "Fourth",
    //                   "value": "Consulting Room",
    //                   "isRecent": false
    //               },
    //               {
    //                   "step": "Fifth",
    //                   "value": "Billing",
    //                   "isRecent": false
    //               },
    //               {
    //                   "step": "Sixth",
    //                   "value": "Reports Collection",
    //                   "isRecent": false
    //               },
    //               {
    //                   "step": "Seventh",
    //                   "value": "Visit Completed",
    //                   "isRecent": false
    //               }
    //           ]
    //       },
    //       {
    //           "id": "JEaH0rJGmwyjPbwArVOyVlB6J",
    //           "firstName": "Nischala",
    //           "lastName": "Nandan",
    //           "sex": "F",
    //           "deceased": false,
    //           "status": "A",
    //           "doesAppointmentExists": true,
    //           "onStop": false,
    //           "lastUpdatedOn": "2025-05-20T11:54:09.159067",
    //           "lastUpdatedBy": "HUOWRCVK",
    //           "payor": "Self pay",
    //           "isSafeguarded": false,
    //           "patientVisitStatus": [
    //               {
    //                   "step": "First",
    //                   "value": "Reception",
    //                   "isRecent": false
    //               },
    //               {
    //                   "step": "Second",
    //                   "value": "Arrived",
    //                   "isRecent": false
    //               },
    //               {
    //                   "step": "Third",
    //                   "value": "Waiting Hall",
    //                   "isRecent": false
    //               },
    //               {
    //                   "step": "Fourth",
    //                   "value": "Consulting Room",
    //                   "isRecent": false
    //               },
    //               {
    //                   "step": "Fifth",
    //                   "value": "Billing",
    //                   "isRecent": false
    //               },
    //               {
    //                   "step": "Sixth",
    //                   "value": "Reports Collection",
    //                   "isRecent": false
    //               },
    //               {
    //                   "step": "Seventh",
    //                   "value": "Visit Completed",
    //                   "isRecent": false
    //               }
    //           ]
    //       },
    //       {
    //           "id": "CZrSMa9suEpAtF3AZbP4HOwIL",
    //           "firstName": "Chenna",
    //           "lastName": "Kalyan",
    //           "title": "Mr",
    //           "sex": "M",
    //           "postCode": "TW18 3BA",
    //           "deceased": false,
    //           "status": "A",
    //           "doesAppointmentExists": true,
    //           "onStop": false,
    //           "lastUpdatedOn": "2025-05-20T11:45:11.360211",
    //           "lastUpdatedBy": "HUOWRCVK",
    //           "payor": "Self pay",
    //           "isSafeguarded": false,
    //           "patientVisitStatus": [
    //               {
    //                   "step": "First",
    //                   "value": "Reception",
    //                   "isRecent": false
    //               },
    //               {
    //                   "step": "Second",
    //                   "value": "Arrived",
    //                   "isRecent": false
    //               },
    //               {
    //                   "step": "Third",
    //                   "value": "Waiting Hall",
    //                   "isRecent": false
    //               },
    //               {
    //                   "step": "Fourth",
    //                   "value": "Consulting Room",
    //                   "isRecent": false
    //               },
    //               {
    //                   "step": "Fifth",
    //                   "value": "Billing",
    //                   "isRecent": false
    //               },
    //               {
    //                   "step": "Sixth",
    //                   "value": "Reports Collection",
    //                   "isRecent": false
    //               },
    //               {
    //                   "step": "Seventh",
    //                   "value": "Visit Completed",
    //                   "isRecent": false
    //               }
    //           ]
    //       },
    //       {
    //           "id": "WwW8XQg17O8vTq9z69TKSNCis",
    //           "firstName": "Shaik",
    //           "lastName": "Habeeb",
    //           "dateOfBirth": "1994-09-30 12:00:00",
    //           "age": "30 y 11 m",
    //           "sex": "M",
    //           "postCode": "B33 8TH",
    //           "deceased": false,
    //           "status": "A",
    //           "notification": "SLA breach - appointment booked is more than a day's time",
    //           "doesAppointmentExists": true,
    //           "onStop": false,
    //           "lastUpdatedOn": "2025-05-20T11:03:52.863212",
    //           "lastUpdatedBy": "HUOWRCVK",
    //           "payor": "Self pay",
    //           "isSafeguarded": false,
    //           "patientVisitStatus": [
    //               {
    //                   "step": "First",
    //                   "value": "Reception",
    //                   "isRecent": false
    //               },
    //               {
    //                   "step": "Second",
    //                   "value": "Arrived",
    //                   "isRecent": false
    //               },
    //               {
    //                   "step": "Third",
    //                   "value": "Waiting Hall",
    //                   "isRecent": false
    //               },
    //               {
    //                   "step": "Fourth",
    //                   "value": "Consulting Room",
    //                   "isRecent": false
    //               },
    //               {
    //                   "step": "Fifth",
    //                   "value": "Billing",
    //                   "isRecent": false
    //               },
    //               {
    //                   "step": "Sixth",
    //                   "value": "Reports Collection",
    //                   "isRecent": false
    //               },
    //               {
    //                   "step": "Seventh",
    //                   "value": "Visit Completed",
    //                   "isRecent": false
    //               }
    //           ]
    //       },
    //       {
    //           "id": "P9GmO6dsg3FwbQYesRuG10TUW",
    //           "firstName": "Vammu",
    //           "lastName": "Kk",
    //           "dateOfBirth": "1994-09-30 12:00:00",
    //           "age": "30 y 11 m",
    //           "sex": "T",
    //           "postCode": "B33 8TH",
    //           "deceased": false,
    //           "status": "A",
    //           "doesAppointmentExists": false,
    //           "onStop": false,
    //           "lastUpdatedOn": "2025-05-20T09:44:42.63719",
    //           "lastUpdatedBy": "HUOWRCVK",
    //           "payor": "Self pay",
    //           "isSafeguarded": false,
    //           "patientVisitStatus": [
    //               {
    //                   "step": "First",
    //                   "value": "Reception",
    //                   "isRecent": false
    //               },
    //               {
    //                   "step": "Second",
    //                   "value": "Arrived",
    //                   "isRecent": false
    //               },
    //               {
    //                   "step": "Third",
    //                   "value": "Waiting Hall",
    //                   "isRecent": false
    //               },
    //               {
    //                   "step": "Fourth",
    //                   "value": "Consulting Room",
    //                   "isRecent": false
    //               },
    //               {
    //                   "step": "Fifth",
    //                   "value": "Billing",
    //                   "isRecent": false
    //               },
    //               {
    //                   "step": "Sixth",
    //                   "value": "Reports Collection",
    //                   "isRecent": false
    //               },
    //               {
    //                   "step": "Seventh",
    //                   "value": "Visit Completed",
    //                   "isRecent": false
    //               }
    //           ]
    //       },
    //       {
    //           "id": "cjM6tgTYPqh1RsriXkMWaYybd",
    //           "firstName": "ollie",
    //           "lastName": "Pope",
    //           "identifier": "98769",
    //           "title": "Mr",
    //           "dateOfBirth": "1985-01-01 12:00:00",
    //           "age": "40 y 8 m",
    //           "sex": "M",
    //           "postCode": "LS1 4HR",
    //           "deceased": false,
    //           "status": "A",
    //           "notification": "This is a new patient with no appointment created",
    //           "doesAppointmentExists": true,
    //           "onStop": false,
    //           "lastUpdatedOn": "2025-05-20T05:18:03.214",
    //           "lastUpdatedBy": "HAJ59LRY_hc02499_apikey",
    //           "appointmentStartDate": "2025-07-11T21:00:00",
    //           "appointmentEndDate": "2025-07-11T22:00:00",
    //           "appointmentStatus": "Confirmed",
    //           "appointmentId": "Kf0GvzGiKWAW7xrv3twxUrdu7",
    //           "practitionerId": "SP041700",
    //           "locationId": "HP002741",
    //           "appointmentAssignedTo": "Mr Poupel, Jerome",
    //           "payor": "Self pay",
    //           "isSafeguarded": false,
    //           "patientVisitStatus": [
    //               {
    //                   "step": "First",
    //                   "value": "Reception",
    //                   "dateTime": "2025-07-11T05:31:03.665359Z",
    //                   "isRecent": true
    //               },
    //               {
    //                   "step": "Second",
    //                   "value": "Arrived",
    //                   "isRecent": false
    //               },
    //               {
    //                   "step": "Third",
    //                   "value": "Waiting Hall",
    //                   "isRecent": false
    //               },
    //               {
    //                   "step": "Fourth",
    //                   "value": "Consulting Room",
    //                   "isRecent": false
    //               },
    //               {
    //                   "step": "Fifth",
    //                   "value": "Billing",
    //                   "isRecent": false
    //               },
    //               {
    //                   "step": "Sixth",
    //                   "value": "Reports Collection",
    //                   "isRecent": false
    //               },
    //               {
    //                   "step": "Seventh",
    //                   "value": "Visit Completed",
    //                   "isRecent": false
    //               }
    //           ]
    //       },
    //       {
    //           "id": "vvPzBUmrV2Okdvsttxkvl9nlG",
    //           "firstName": "Rama",
    //           "lastName": "Raju",
    //           "title": "Mr",
    //           "sex": "M",
    //           "postCode": "TW18 3BA",
    //           "deceased": false,
    //           "status": "A",
    //           "doesAppointmentExists": true,
    //           "onStop": false,
    //           "lastUpdatedOn": "2025-05-20T05:08:32.463807",
    //           "lastUpdatedBy": "HUOWRCVK",
    //           "payor": "Self pay",
    //           "isSafeguarded": false,
    //           "patientVisitStatus": [
    //               {
    //                   "step": "First",
    //                   "value": "Reception",
    //                   "isRecent": false
    //               },
    //               {
    //                   "step": "Second",
    //                   "value": "Arrived",
    //                   "isRecent": false
    //               },
    //               {
    //                   "step": "Third",
    //                   "value": "Waiting Hall",
    //                   "isRecent": false
    //               },
    //               {
    //                   "step": "Fourth",
    //                   "value": "Consulting Room",
    //                   "isRecent": false
    //               },
    //               {
    //                   "step": "Fifth",
    //                   "value": "Billing",
    //                   "isRecent": false
    //               },
    //               {
    //                   "step": "Sixth",
    //                   "value": "Reports Collection",
    //                   "isRecent": false
    //               },
    //               {
    //                   "step": "Seventh",
    //                   "value": "Visit Completed",
    //                   "isRecent": false
    //               }
    //           ]
    //       },
    //       {
    //           "id": "AZ7Ek3iq2dDf6NgBizTWqrqcn",
    //           "firstName": "Oliver",
    //           "lastName": "Jake",
    //           "title": "Mr",
    //           "sex": "F",
    //           "postCode": "LS1 4HR",
    //           "deceased": false,
    //           "status": "A",
    //           "doesAppointmentExists": true,
    //           "onStop": false,
    //           "lastUpdatedOn": "2025-05-07T10:29:08.829",
    //           "lastUpdatedBy": "MigrationScript-epxpat",
    //           "payor": "Self pay",
    //           "isSafeguarded": false,
    //           "patientVisitStatus": [
    //               {
    //                   "step": "First",
    //                   "value": "Reception",
    //                   "isRecent": false
    //               },
    //               {
    //                   "step": "Second",
    //                   "value": "Arrived",
    //                   "isRecent": false
    //               },
    //               {
    //                   "step": "Third",
    //                   "value": "Waiting Hall",
    //                   "isRecent": false
    //               },
    //               {
    //                   "step": "Fourth",
    //                   "value": "Consulting Room",
    //                   "isRecent": false
    //               },
    //               {
    //                   "step": "Fifth",
    //                   "value": "Billing",
    //                   "isRecent": false
    //               },
    //               {
    //                   "step": "Sixth",
    //                   "value": "Reports Collection",
    //                   "isRecent": false
    //               },
    //               {
    //                   "step": "Seventh",
    //                   "value": "Visit Completed",
    //                   "isRecent": false
    //               }
    //           ]
    //       },
    //       {
    //           "id": "xHoCRmdibAnp6BkD8qjjkvA7P",
    //           "firstName": "TDPssssssssssssssssssssssssssssss",
    //           "lastName": "Zatin",
    //           "identifier": "HC02499VR7842",
    //           "title": "Sir",
    //           "dateOfBirth": "2010-05-07 12:00:00",
    //           "age": "15 y 4 m",
    //           "sex": "M",
    //           "postCode": "LS1 4HR",
    //           "deceased": false,
    //           "status": "A",
    //           "doesAppointmentExists": false,
    //           "onStop": false,
    //           "lastUpdatedOn": "2025-05-07T10:28:58.556",
    //           "lastUpdatedBy": "MigrationScript-epxpat",
    //           "payor": "Self pay",
    //           "isSafeguarded": false,
    //           "patientVisitStatus": [
    //               {
    //                   "step": "First",
    //                   "value": "Reception",
    //                   "isRecent": false
    //               },
    //               {
    //                   "step": "Second",
    //                   "value": "Arrived",
    //                   "isRecent": false
    //               },
    //               {
    //                   "step": "Third",
    //                   "value": "Waiting Hall",
    //                   "isRecent": false
    //               },
    //               {
    //                   "step": "Fourth",
    //                   "value": "Consulting Room",
    //                   "isRecent": false
    //               },
    //               {
    //                   "step": "Fifth",
    //                   "value": "Billing",
    //                   "isRecent": false
    //               },
    //               {
    //                   "step": "Sixth",
    //                   "value": "Reports Collection",
    //                   "isRecent": false
    //               },
    //               {
    //                   "step": "Seventh",
    //                   "value": "Visit Completed",
    //                   "isRecent": false
    //               }
    //           ]
    //       },
    //       {
    //           "id": "sq8BUV2wmnQuqHXye1dT5j2N0",
    //           "firstName": "Henry",
    //           "lastName": "Mark",
    //           "identifier": "HC02499DI7597",
    //           "title": "Mr",
    //           "dateOfBirth": "1975-01-01 12:00:00",
    //           "age": "50 y 8 m",
    //           "sex": "M",
    //           "postCode": "LS1 4HR",
    //           "deceased": false,
    //           "status": "A",
    //           "notification": "SLA breach - appointment booked is more than a day's time",
    //           "doesAppointmentExists": true,
    //           "onStop": false,
    //           "insurer": "Cigna Healthcare",
    //           "lastUpdatedOn": "2025-05-07T10:28:58.556",
    //           "lastUpdatedBy": "MigrationScript-epxpat",
    //           "payor": "Self pay",
    //           "isSafeguarded": false,
    //           "patientVisitStatus": [
    //               {
    //                   "step": "First",
    //                   "value": "Reception",
    //                   "isRecent": false
    //               },
    //               {
    //                   "step": "Second",
    //                   "value": "Arrived",
    //                   "isRecent": false
    //               },
    //               {
    //                   "step": "Third",
    //                   "value": "Waiting Hall",
    //                   "isRecent": false
    //               },
    //               {
    //                   "step": "Fourth",
    //                   "value": "Consulting Room",
    //                   "isRecent": false
    //               },
    //               {
    //                   "step": "Fifth",
    //                   "value": "Billing",
    //                   "isRecent": false
    //               },
    //               {
    //                   "step": "Sixth",
    //                   "value": "Reports Collection",
    //                   "isRecent": false
    //               },
    //               {
    //                   "step": "Seventh",
    //                   "value": "Visit Completed",
    //                   "isRecent": false
    //               }
    //           ]
    //       }
    //   ]

  }

  loadPatients(event?: Event) {
    this.patientService.getPatients(this.page, this.count).subscribe({
      next: (res) => {
        if (res?.data?.length) {
          this.patients = [...this.patients, ...res.data];
          this.totalPages = res.pagination?.totalPages || 1;
          this.page++;
          this.cdr.detectChanges(); // 👈 force update
        }

        if (event) {
          (event as InfiniteScrollCustomEvent).target.complete();
        }

        if (this.page > this.totalPages && event) {
          (event as InfiniteScrollCustomEvent).target.disabled = true;
        }
      },
      error: (err) => {
        console.error('Error loading patients', err);
        if (event) {
          (event as InfiniteScrollCustomEvent).target.complete();
        }
      }
    });
  }

  onIonInfinite(event: Event) {
    this.loadPatients(event);
  }


  backRoute(){
    this.navController.back();
  }
}
