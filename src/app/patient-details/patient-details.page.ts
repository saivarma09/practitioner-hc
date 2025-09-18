import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTabBar, IonTabButton, IonTabs, IonTitle, IonToolbar, NavController } from '@ionic/angular/standalone';
import { PatientData, PatientDemographicsResponse } from './models/patient-details';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { PatientService } from './service/patient/patient-service';
import { ActivatedRoute } from '@angular/router';
import { InsurerComponent } from './components/insurer/insurer.component';
import { AllergyComponent } from './components/allergy/allergy.component';

@Component({
  selector: 'app-patient-details',
  templateUrl: './patient-details.page.html',
  styleUrls: ['./patient-details.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, DatePipe, IonTabs, IonTabButton, IonTabBar, AppointmentsComponent, InsurerComponent, AllergyComponent]
})
export class PatientDetailsPage implements OnInit {
  @ViewChild('scrollContainer', { static: true }) scrollContainer!: ElementRef<HTMLDivElement>;
  strokeColor: string = 'var(--ion-primary-color)';
  patientDetails: PatientData = {} as PatientData;
  patientOptions = [
    { value: 'appointments', label: 'Appointments', status: false },
    { value: 'correspondence', label: 'Correspondence', status: false },
    { value: 'insurer', label: 'Insurer', status: false },
    { value: 'allergies', label: 'Allergies', status: false },
  ];
  selectOption: string = 'allergies';
  patientId:string='';

  constructor(private navController: NavController, private patientService: PatientService, private route: ActivatedRoute, private cdr:ChangeDetectorRef) {
    // this.route.paramMap.subscribe((params: any) => {
    //   const id = params.get('id');
    //   console.log(id)
    //   if (id) {
    //     this.patientId = id;
    //     this.patientService.getPatientDetails(id).subscribe({
    //       next: (res: PatientDemographicsResponse) => {
    //         this.patientDetails = res.data;
    //         console.log('fetchsuccessful', this.patientDetails)
    //         this.cdr.detectChanges();
    //       },
    //       error: (err) => {
    //         console.error('Error fetching patient details:', err);
    //       }
    //     });
    //   }
    // });

  }

  ngOnInit() {
    this.patientDetails = {
      "id": "EqaN9grUfCqDVRa63kuQTekFI",
      "balanceDue": "",
      "lastEdited": "2025-06-20T07:27:53.127512Z",
      "status": "A",
      "isPatientLocked": false,
      "mentalStatus": "",
      "visitingStatus": [
        {
          "step": "First",
          "value": "Reception",
          "dateTime": "2025-06-20T11:04:46.1355Z",
          "isRecent": true
        },
        {
          "step": "Second",
          "value": "Arrived",
          "isRecent": false
        },
        {
          "step": "Third",
          "value": "Waiting Hall",
          "isRecent": false
        },
        {
          "step": "Fourth",
          "value": "Consulting Room",
          "isRecent": false
        },
        {
          "step": "Fifth",
          "value": "Billing",
          "isRecent": false
        },
        {
          "step": "Sixth",
          "value": "Reports Collection",
          "isRecent": false
        },
        {
          "step": "Seventh",
          "value": "Visit Completed",
          "isRecent": false
        }
      ],
      "warningNotes": [],
      "popupNotes": [],
      "addresses": [
        {
          "id": "91hpJeyaTqIvi5UGoOoZldh94",
          "typeDescription": "Office",
          "type": "0000000002",
          "postCode": "TW19 7LZ",
          "preFix": "",
          "address1": "West London Terminal",
          "address2": "Staines-upon-Thames",
          "address3": "Bedfont Road",
          "address4": "Stanwell",
          "country": "",
          "primary": true,
          "billing": true
        }
      ],
      "telecoms": [
        {
          "id": "9udOLeEODzHcE9Y4zHBxZqSYQ",
          "telecomTypeDescription": "Email",
          "telecomType": "0000000004",
          "value": "sabarwalr@healthcode.co.uk",
          "isPrimary": false,
          "isPreferred": true
        },
        {
          "id": "oFuWH94fiss6b36jpEtmx7iLK",
          "telecomTypeDescription": "Mobile",
          "telecomType": "0000000003",
          "value": "917987814140",
          "isPrimary": false,
          "isPreferred": false
        },
        {
          "id": "sxUpirCIKSP2AIPn7Fo3FK9qO",
          "telecomTypeDescription": "Email",
          "telecomType": "0000000004",
          "value": "testing.rohitsabarwal@gmail.com",
          "isPrimary": true,
          "isPreferred": false
        }
      ],
      "identifiers": [],
      "insurer": [
        {
          "id": "bup",
          "code": "bup",
          "name": "BUPA",
          "requiresDiagnosisCode": true,
          "isSTV": false,
          "acceptEdiClaims": true,
          "isESTV": false,
          "isSynchronousME": false,
          "description": "BUPA",
          "expiryDate": "31/12/2025",
          "expired": false,
          "isPrimary": true,
          "enquireAboutMembershipNo": false,
          "isValid": false,
          "membershipId": "BHU6543",
          "status": "A"
        }
      ],
      "conditions": [],
      "vitals": [
        {
          "id": "9MwRKWJIJmZ4kotfkKqz5ihAc",
          "appointmentRef": "QQ5DV99zZLBAf13AwSaOs7PTK",
          "status": "A",
          "createdBy": "HUJB7V3V",
          "createdOn": "2025-06-20T04:52:04.370635Z",
          "lastUpdatedBy": "HUJB7V3V",
          "lastUpdatedOn": "2025-06-20T08:50:07.453499Z",
          "key": "LMP",
          "value": "20/06/2025",
          "category": "OB"
        },
        {
          "id": "BYdxHupczKvvFesp5xTsvLjwE",
          "appointmentRef": "QQ5DV99zZLBAf13AwSaOs7PTK",
          "status": "A",
          "createdBy": "HUJB7V3V",
          "createdOn": "2025-06-20T04:51:46.030914Z",
          "lastUpdatedBy": "HUJB7V3V",
          "lastUpdatedOn": "2025-06-20T08:50:07.453565Z",
          "key": "MEDD",
          "value": "30/03/2025",
          "category": "OB"
        },
        {
          "id": "ZEfkCpef5ZQbjckteS0LkHexD",
          "appointmentRef": "QQ5DV99zZLBAf13AwSaOs7PTK",
          "status": "A",
          "createdBy": "HUJB7V3V",
          "createdOn": "2025-06-20T05:14:55.963261Z",
          "lastUpdatedBy": "HUJB7V3V",
          "lastUpdatedOn": "2025-06-20T08:50:07.45506Z",
          "key": "Previous pregnancy loss",
          "value": "0",
          "category": "OH"
        },
        {
          "id": "Hs7SwSJnIjapwNh4j8kx17Ixd",
          "appointmentRef": "SLKkZWVLYxvb4tm41NSJMyelS",
          "status": "A",
          "createdBy": "HUJB7V3V",
          "createdOn": "2025-06-20T06:28:57.521208Z",
          "lastUpdatedBy": "HUJB7V3V",
          "lastUpdatedOn": "2025-06-20T06:30:07.024929Z",
          "key": "LMP",
          "value": "02/06/2025",
          "category": "OB"
        }
      ],
      "languages": [],
      "title": "Mr",
      "firstName": "King",
      "lastName": "Pin",
      "dateOfBirth": "1995-09-27T00:00:00Z",
      "age": "29 y 11 m",
      "gender": "T",
      "initials": "KP",
      "ethnicityCode": "A",
      "noChase": false,
      "onStop": false,
      "sendInvoiceZone": false,
      "deceased": false,
      "isPayor": true,
      "isPrimary": true,
      "isOrganisation": false,
      "identifier": "5933121931",
      "isSafeguarded": false
    }
  }



  goBack() {
    this.navController.navigateBack('/patients-info');
  }


  
  selectOptionHandler(option: any, el: HTMLElement) {
    this.selectOption = option.value;

    const container = this.scrollContainer.nativeElement;
    const containerRect = container.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();

    // Distance of element from container
    const offset = elRect.left - containerRect.left;
    // Center position = element center - container half width
    const scrollTo = offset - (container.offsetWidth / 2 - elRect.width / 2);

    container.scrollBy({ left: scrollTo, behavior: 'smooth' });
    this.cdr.detectChanges();
  }



  scrollLeft() {
    const container = this.scrollContainer.nativeElement;
    const step = container.offsetWidth; // visible width
    container.scrollBy({ left: -step, behavior: 'smooth' });
  }

  scrollRight() {
    const container = this.scrollContainer.nativeElement;
    const step = container.offsetWidth; // visible width
    container.scrollBy({ left: step, behavior: 'smooth' });
  }
}
