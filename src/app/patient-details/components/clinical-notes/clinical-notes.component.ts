import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { PatientClinicalNote, PatientClinicalNotesResponse } from '../../models/clinical-notes';
import { DatePipe } from '@angular/common';
import { COMMON_MODULES } from 'src/app/shared/imports/imports';
import { IonModal } from "@ionic/angular/standalone";
import { NoRecordsComponent } from 'src/app/shared/components/no-records/no-records.component';
import { PatientService } from '../../service/patient/patient-service';

@Component({
  selector: 'app-clinical-notes',
  templateUrl: './clinical-notes.component.html',
  styleUrls: ['./clinical-notes.component.scss'],
  imports: [IonModal, DatePipe, COMMON_MODULES, NoRecordsComponent]
})
export class ClinicalNotesComponent  implements OnInit {
  @ViewChild('clinicalNotesModal') clinicalNotesModal!: IonModal;
  @Input() patientId:string = '';
  patientClinicalNotesResponse:PatientClinicalNotesResponse = {} as PatientClinicalNotesResponse;
  selectedNotes:PatientClinicalNote = {} as PatientClinicalNote;
  patientNotesLoaders = ['', '', ''];
  showNotesSkeletons = true;
  patientClinicalNotes:PatientClinicalNote[] = [];
  constructor(private patientService: PatientService) { }

  ngOnInit() {
    this.getPatientClinicalNotes();
  }

  getPatientClinicalNotes(){
    this.patientService.getPatientDetails(this.patientId).subscribe({
      next: (res: PatientClinicalNotesResponse) => {
        this.patientClinicalNotesResponse = res;
        this.patientClinicalNotes = res.data;
      },
      error: (err) => {
        console.error('Error fetching patient clinical notes:', err);
      }
    });
  }

  openClinicalNotesModal(notes:PatientClinicalNote) {
    this.selectedNotes = notes;
    this.clinicalNotesModal.present();
  }

}
