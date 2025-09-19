import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Appointment, AppointmentResponse } from '../../models/appointment';
import { CommonModule, DatePipe } from '@angular/common';
import { IonSkeletonText } from '@ionic/angular/standalone';
import { PatientService } from '../../service/patient/patient-service';
import { NoRecordsComponent } from 'src/app/shared/components/no-records/no-records.component';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
  imports:[DatePipe, CommonModule, IonSkeletonText, NoRecordsComponent]
})
export class AppointmentsComponent  implements OnInit {
  appointmentInfo:AppointmentResponse = {} as AppointmentResponse;
  appointments: Appointment[] = [];
  skeletonEnable:boolean = false;
  @Input() patientId:string = '';
  constructor(private patientService:PatientService, private cdr:ChangeDetectorRef) { }

  ngOnInit() {
    this.skeletonEnable = true;
    this.patientService.getSelectedPatientAppointmentInfo(this.patientId).subscribe({

        next:(appointmentResponse:AppointmentResponse)=>{
            this.appointments = appointmentResponse.data;
            this.skeletonEnable = false;
            this.cdr.detectChanges();
        },
        error:()=>{this.appointmentInfo;this.skeletonEnable= false}
    });

    console.log(this.patientId);
    
//     this.appointmentInfo = {
//     "data": [
//         {
//             "id": "QQ5DV99zZLBAf13AwSaOs7PTK",
//             "appointmentType": {
//                 "id": "SP000025-HC02499",
//                 "description": "Video Consultation over 15 Minutes",
//                 "backgroundColour": "#cbf7b7",
//                 "hcReqProcCode": false,
//                 "episodeType": "Outpatient"
//             },
//             "appointmentInstructions": [],
//             "startDate": "2025-06-20T10:10:00",
//             "endDate": "2025-06-20T10:40:00",
//             "isSession": false,
//             "isTranslatorRequired": false,
//             "sendConfirmationSMS": false,
//             "appointmentStatus": {
//                 "id": "O",
//                 "description": "Complete"
//             },
//             "syncToEbooking": false,
//             "isSmsSent": false,
//             "isEmailSent": false,
//             "status": "A",
//             "requestEarlierSlot": false,
//             "primaryParticipantTypeCode": "S",
//             "appointmentParticipant": [
//                 {
//                     "participant": {
//                         "id": "HP003481",
//                         "name": "Arete Hospitals",
//                         "typeCode": "L"
//                     }
//                 },
//                 {
//                     "participant": {
//                         "id": "SP029729",
//                         "name": "Dr. Hill, Susan [SP029729]",
//                         "typeCode": "S"
//                     }
//                 }
//             ],
//             "appointmentPatient": [
//                 {
//                     "patient": {
//                         "id": "EqaN9grUfCqDVRa63kuQTekFI",
//                         "firstName": "King",
//                         "lastName": "Pin",
//                         "title": "Mr",
//                         "dateOfBirth": "1995-09-27T00:00:00Z",
//                         "sex": "T",
//                         "noChase": false,
//                         "onStop": false
//                     },
//                     "payorId": "EqaN9grUfCqDVRa63kuQTekFI",
//                     "payor": "King Pin",
//                     "price": 0,
//                     "balanceAmount": 0,
//                     "requestEarlierSlot": false
//                 }
//             ],
//             "appointmentPatientIndustryStandardCode": [],
//             "isICEAppointment": false,
//             "isRemoteAppointment": false,
//             "identifier": "QQ5DV99zZLBAf13AwSaOs7PTK",
//             "specialtyId": "0000L",
//             "specialty": "Occupational Therapy"
//         },
//         {
//             "id": "30NcTsqQzRjEHGppCff8U3xZo",
//             "appointmentType": {
//                 "id": "SP000023-HC02499",
//                 "description": "Telephone Consultation over 15 Minutes",
//                 "backgroundColour": "#fbfbd0",
//                 "hcReqProcCode": false,
//                 "episodeType": "Outpatient"
//             },
//             "appointmentInstructions": [],
//             "startDate": "2025-06-20T10:12:00",
//             "endDate": "2025-06-20T10:27:00",
//             "isSession": false,
//             "isTranslatorRequired": false,
//             "sendConfirmationSMS": false,
//             "appointmentStatus": {
//                 "id": "O",
//                 "description": "Complete"
//             },
//             "syncToEbooking": false,
//             "isSmsSent": false,
//             "isEmailSent": false,
//             "status": "A",
//             "requestEarlierSlot": false,
//             "primaryParticipantTypeCode": "S",
//             "appointmentParticipant": [
//                 {
//                     "participant": {
//                         "id": "HP003481",
//                         "name": "Arete Hospitals",
//                         "typeCode": "L"
//                     }
//                 },
//                 {
//                     "participant": {
//                         "id": "SP029729",
//                         "name": "Dr. Hill, Susan [SP029729]",
//                         "typeCode": "S"
//                     }
//                 }
//             ],
//             "appointmentPatient": [
//                 {
//                     "patient": {
//                         "id": "EqaN9grUfCqDVRa63kuQTekFI",
//                         "firstName": "King",
//                         "lastName": "Pin",
//                         "title": "Mr",
//                         "dateOfBirth": "1995-09-27T00:00:00Z",
//                         "sex": "T",
//                         "noChase": false,
//                         "onStop": false
//                     },
//                     "price": 0,
//                     "balanceAmount": 0,
//                     "requestEarlierSlot": false
//                 }
//             ],
//             "appointmentPatientIndustryStandardCode": [],
//             "isICEAppointment": false,
//             "isRemoteAppointment": false,
//             "identifier": "30NcTsqQzRjEHGppCff8U3xZo",
//             "specialtyId": "0000L",
//             "specialty": "Occupational Therapy"
//         },
//         {
//             "id": "v50QbbNFN9WVYAf2APZucnj0A",
//             "appointmentType": {
//                 "id": "SP000024-HC02499",
//                 "description": "Video Consultation up to 15 Minutes",
//                 "backgroundColour": "#a7eca6",
//                 "hcReqProcCode": false,
//                 "episodeType": "Outpatient"
//             },
//             "appointmentInstructions": [],
//             "startDate": "2025-06-20T11:11:00",
//             "endDate": "2025-06-20T11:26:00",
//             "isSession": false,
//             "isTranslatorRequired": false,
//             "sendConfirmationSMS": false,
//             "appointmentStatus": {
//                 "id": "O",
//                 "description": "Complete"
//             },
//             "syncToEbooking": false,
//             "isSmsSent": true,
//             "isEmailSent": true,
//             "status": "A",
//             "requestEarlierSlot": false,
//             "primaryParticipantTypeCode": "S",
//             "appointmentParticipant": [
//                 {
//                     "participant": {
//                         "id": "HP003481",
//                         "name": "Arete Hospitals",
//                         "typeCode": "L"
//                     }
//                 },
//                 {
//                     "participant": {
//                         "id": "SP029729",
//                         "name": "Dr. Hill, Susan [SP029729]",
//                         "typeCode": "S"
//                     }
//                 }
//             ],
//             "appointmentPatient": [
//                 {
//                     "patient": {
//                         "id": "EqaN9grUfCqDVRa63kuQTekFI",
//                         "firstName": "King",
//                         "lastName": "Pin",
//                         "title": "Mr",
//                         "dateOfBirth": "1995-09-27T00:00:00Z",
//                         "sex": "T",
//                         "noChase": false,
//                         "onStop": false
//                     },
//                     "payorId": "bup",
//                     "payorType": "I",
//                     "payorCode": "bup",
//                     "payor": "BUPA",
//                     "price": 0,
//                     "balanceAmount": 0,
//                     "requestEarlierSlot": false
//                 }
//             ],
//             "appointmentPatientIndustryStandardCode": [],
//             "isICEAppointment": false,
//             "isRemoteAppointment": false,
//             "identifier": "v50QbbNFN9WVYAf2APZucnj0A",
//             "mobileNumber": "917987814140",
//             "email": "testing.rohitsabarwal@gmail.com",
//             "sentSMSDate": "2025-06-20T05:43:19.887116Z",
//             "sentEmailDate": "2025-06-20T05:43:19.749158Z",
//             "specialtyId": "0000L",
//             "specialty": "Occupational Therapy"
//         },
//         {
//             "id": "SLKkZWVLYxvb4tm41NSJMyelS",
//             "appointmentType": {
//                 "id": "SP000024-HC02499",
//                 "description": "Video Consultation up to 15 Minutes",
//                 "backgroundColour": "#a7eca6",
//                 "hcReqProcCode": false,
//                 "episodeType": "Outpatient"
//             },
//             "appointmentInstructions": [],
//             "startDate": "2025-06-20T11:50:00",
//             "endDate": "2025-06-20T12:05:00",
//             "isSession": false,
//             "isTranslatorRequired": false,
//             "sendConfirmationSMS": false,
//             "appointmentStatus": {
//                 "id": "C",
//                 "description": "Confirmed"
//             },
//             "syncToEbooking": false,
//             "isSmsSent": true,
//             "isEmailSent": true,
//             "status": "A",
//             "requestEarlierSlot": false,
//             "primaryParticipantTypeCode": "S",
//             "appointmentParticipant": [
//                 {
//                     "participant": {
//                         "id": "HP003481",
//                         "name": "Arete Hospitals",
//                         "typeCode": "L"
//                     }
//                 },
//                 {
//                     "participant": {
//                         "id": "SP029729",
//                         "name": "Dr. Hill, Susan [SP029729]",
//                         "typeCode": "S"
//                     }
//                 }
//             ],
//             "appointmentPatient": [
//                 {
//                     "patient": {
//                         "id": "EqaN9grUfCqDVRa63kuQTekFI",
//                         "firstName": "King",
//                         "lastName": "Pin",
//                         "title": "Mr",
//                         "dateOfBirth": "1995-09-27T00:00:00Z",
//                         "sex": "T",
//                         "noChase": false,
//                         "onStop": false
//                     },
//                     "payorId": "jhpImStsHRi6HYoRWxr2V1T7v",
//                     "payorType": "C",
//                     "payor": "Rohit Sabarwal",
//                     "price": 0,
//                     "balanceAmount": 0,
//                     "requestEarlierSlot": false
//                 }
//             ],
//             "appointmentPatientIndustryStandardCode": [],
//             "isICEAppointment": false,
//             "isRemoteAppointment": false,
//             "identifier": "SLKkZWVLYxvb4tm41NSJMyelS",
//             "mobileNumber": "917987814140",
//             "email": "testing.rohitsabarwal@gmail.com",
//             "sentSMSDate": "2025-06-20T06:20:27.899747Z",
//             "sentEmailDate": "2025-06-20T06:20:27.755849Z",
//             "specialtyId": "0000L",
//             "specialty": "Occupational Therapy"
//         },
//         {
//             "id": "tLQdiGokbOOumKN0EyZVfa7ve",
//             "appointmentType": {
//                 "id": "SP000023-HC02499",
//                 "description": "Telephone Consultation over 15 Minutes",
//                 "backgroundColour": "#fbfbd0",
//                 "hcReqProcCode": false,
//                 "episodeType": "Outpatient"
//             },
//             "appointmentInstructions": [],
//             "startDate": "2025-06-20T11:51:00",
//             "endDate": "2025-06-20T12:06:00",
//             "isSession": false,
//             "isTranslatorRequired": false,
//             "sendConfirmationSMS": false,
//             "appointmentStatus": {
//                 "id": "X",
//                 "description": "Cancelled"
//             },
//             "syncToEbooking": false,
//             "isSmsSent": true,
//             "isEmailSent": false,
//             "status": "A",
//             "requestEarlierSlot": false,
//             "primaryParticipantTypeCode": "S",
//             "appointmentParticipant": [
//                 {
//                     "participant": {
//                         "id": "HP003481",
//                         "name": "Arete Hospitals",
//                         "typeCode": "L"
//                     }
//                 },
//                 {
//                     "participant": {
//                         "id": "SP041700",
//                         "name": "Mr Poupel, Jerome [SP041700]",
//                         "typeCode": "S"
//                     }
//                 }
//             ],
//             "appointmentPatient": [
//                 {
//                     "patient": {
//                         "id": "EqaN9grUfCqDVRa63kuQTekFI",
//                         "firstName": "King",
//                         "lastName": "Pin",
//                         "title": "Mr",
//                         "dateOfBirth": "1995-09-27T00:00:00Z",
//                         "sex": "T",
//                         "noChase": false,
//                         "onStop": false
//                     },
//                     "payorId": "bup",
//                     "payorType": "I",
//                     "payorCode": "bup",
//                     "payor": "BUPA",
//                     "price": 0,
//                     "balanceAmount": 0,
//                     "requestEarlierSlot": false
//                 }
//             ],
//             "appointmentPatientIndustryStandardCode": [],
//             "isICEAppointment": false,
//             "isRemoteAppointment": false,
//             "identifier": "tLQdiGokbOOumKN0EyZVfa7ve",
//             "mobileNumber": "917987814140",
//             "sentSMSDate": "2025-06-20T08:50:31.699075Z",
//             "specialtyId": "0000L",
//             "specialty": "Occupational Therapy"
//         },
//         {
//             "id": "FITKsQna6aNi035j8vbdBar9T",
//             "appointmentType": {
//                 "id": "SP000025-HC02499",
//                 "description": "Video Consultation over 15 Minutes",
//                 "backgroundColour": "#cbf7b7",
//                 "hcReqProcCode": false,
//                 "episodeType": "Outpatient"
//             },
//             "appointmentInstructions": [],
//             "startDate": "2025-06-20T12:00:00",
//             "endDate": "2025-06-20T12:30:00",
//             "isSession": false,
//             "isTranslatorRequired": false,
//             "sendConfirmationSMS": false,
//             "appointmentStatus": {
//                 "id": "X",
//                 "description": "Cancelled"
//             },
//             "syncToEbooking": false,
//             "isSmsSent": false,
//             "isEmailSent": false,
//             "status": "A",
//             "requestEarlierSlot": false,
//             "primaryParticipantTypeCode": "S",
//             "appointmentParticipant": [
//                 {
//                     "participant": {
//                         "id": "HP003608",
//                         "name": "Remote / Online Consultations",
//                         "typeCode": "L"
//                     }
//                 },
//                 {
//                     "participant": {
//                         "id": "SP041700",
//                         "name": "Mr Poupel, Jerome [SP041700]",
//                         "typeCode": "S"
//                     }
//                 }
//             ],
//             "appointmentPatient": [
//                 {
//                     "patient": {
//                         "id": "EqaN9grUfCqDVRa63kuQTekFI",
//                         "firstName": "King",
//                         "lastName": "Pin",
//                         "title": "Mr",
//                         "dateOfBirth": "1995-09-27T00:00:00Z",
//                         "sex": "T",
//                         "noChase": false,
//                         "onStop": false
//                     },
//                     "price": 0,
//                     "balanceAmount": 0,
//                     "requestEarlierSlot": false
//                 }
//             ],
//             "appointmentPatientIndustryStandardCode": [],
//             "isICEAppointment": false,
//             "isRemoteAppointment": false,
//             "identifier": "FITKsQna6aNi035j8vbdBar9T"
//         },
//         {
//             "id": "yaPXt6wiLt69yGFwukh4y8enV",
//             "appointmentType": {
//                 "id": "SP000024-HC02499",
//                 "description": "Video Consultation up to 15 Minutes",
//                 "backgroundColour": "#a7eca6",
//                 "hcReqProcCode": false,
//                 "episodeType": "Outpatient"
//             },
//             "appointmentInstructions": [],
//             "startDate": "2025-06-20T14:20:00",
//             "endDate": "2025-06-20T14:35:00",
//             "isSession": false,
//             "isTranslatorRequired": false,
//             "sendConfirmationSMS": false,
//             "appointmentStatus": {
//                 "id": "X",
//                 "description": "Cancelled"
//             },
//             "syncToEbooking": false,
//             "isSmsSent": false,
//             "isEmailSent": false,
//             "status": "A",
//             "requestEarlierSlot": false,
//             "primaryParticipantTypeCode": "S",
//             "appointmentParticipant": [
//                 {
//                     "participant": {
//                         "id": "HP003481",
//                         "name": "Arete Hospitals",
//                         "typeCode": "L"
//                     }
//                 },
//                 {
//                     "participant": {
//                         "id": "SP029725",
//                         "name": "Mr Monson, John R [SP029725]",
//                         "typeCode": "S"
//                     }
//                 }
//             ],
//             "appointmentPatient": [
//                 {
//                     "patient": {
//                         "id": "EqaN9grUfCqDVRa63kuQTekFI",
//                         "firstName": "King",
//                         "lastName": "Pin",
//                         "title": "Mr",
//                         "dateOfBirth": "1995-09-27T00:00:00Z",
//                         "sex": "T",
//                         "noChase": false,
//                         "onStop": false
//                     },
//                     "price": 0,
//                     "balanceAmount": 0,
//                     "requestEarlierSlot": false
//                 }
//             ],
//             "appointmentPatientIndustryStandardCode": [],
//             "isICEAppointment": false,
//             "isRemoteAppointment": false,
//             "identifier": "yaPXt6wiLt69yGFwukh4y8enV",
//             "specialtyId": "0000L",
//             "specialty": "Occupational Therapy"
//         },
//         {
//             "id": "CVfT9qBFfQt6dG8L6WwWOYMyg",
//             "appointmentType": {
//                 "id": "C0000011-HC02499",
//                 "description": "Consultation with Minor Treatment",
//                 "backgroundColour": "#ffffba",
//                 "hcReqProcCode": false,
//                 "episodeType": "Outpatient"
//             },
//             "appointmentInstructions": [],
//             "startDate": "2025-06-20T16:34:00",
//             "endDate": "2025-06-20T17:34:00",
//             "isSession": false,
//             "isTranslatorRequired": false,
//             "sendConfirmationSMS": false,
//             "appointmentStatus": {
//                 "id": "X",
//                 "description": "Cancelled"
//             },
//             "syncToEbooking": false,
//             "isSmsSent": false,
//             "isEmailSent": false,
//             "status": "A",
//             "requestEarlierSlot": false,
//             "primaryParticipantTypeCode": "S",
//             "appointmentParticipant": [
//                 {
//                     "participant": {
//                         "id": "HP003481",
//                         "name": "Arete Hospitals",
//                         "typeCode": "L"
//                     }
//                 },
//                 {
//                     "participant": {
//                         "id": "SP029729",
//                         "name": "Dr. Hill, Susan [SP029729]",
//                         "typeCode": "S"
//                     }
//                 }
//             ],
//             "appointmentPatient": [
//                 {
//                     "patient": {
//                         "id": "EqaN9grUfCqDVRa63kuQTekFI",
//                         "firstName": "King",
//                         "lastName": "Pin",
//                         "title": "Mr",
//                         "dateOfBirth": "1995-09-27T00:00:00Z",
//                         "sex": "T",
//                         "noChase": false,
//                         "onStop": false
//                     },
//                     "price": 0,
//                     "balanceAmount": 0,
//                     "requestEarlierSlot": false
//                 }
//             ],
//             "appointmentPatientIndustryStandardCode": [],
//             "isICEAppointment": false,
//             "isRemoteAppointment": false,
//             "identifier": "CVfT9qBFfQt6dG8L6WwWOYMyg",
//             "specialtyId": "0000L",
//             "specialty": "Occupational Therapy"
//         }
//     ],
//     "success": true,
//     "statusCode": 200
// }

// this.appointments = this.appointmentInfo.data;
  }

}
