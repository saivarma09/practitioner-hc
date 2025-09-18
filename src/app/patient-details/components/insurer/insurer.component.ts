import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { AddPatientInsurer, InsurerResponse, MasterInsurer, PatientInsurer, PatientInsurerAddResponse, PatientInsurerResponse } from '../../models/insurer';
import { PatientService } from '../../service/patient/patient-service';
import { DatePipe, JsonPipe } from '@angular/common';
import { IonModal, IonSelect, IonToggle, ToastController } from '@ionic/angular/standalone';
import { COMMON_MODULES, FORM_MODULES, REACTIVE_FORM_MODULES } from 'src/app/shared/imports/imports';
import { DatePickerComponent } from 'src/app/shared/components/date-picker/date-picker.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NoRecordsComponent } from 'src/app/shared/components/no-records/no-records.component';

@Component({
  selector: 'app-insurer',
  templateUrl: './insurer.component.html',
  styleUrls: ['./insurer.component.scss'],
  providers: [DatePipe],
  imports: [DatePipe, IonModal, IonSelect, FORM_MODULES, DatePickerComponent, IonToggle, REACTIVE_FORM_MODULES, JsonPipe, COMMON_MODULES, NoRecordsComponent]
})
export class InsurerComponent implements OnInit {
  @ViewChild('insurerModel') insurerModel!: IonModal;
  insurerResponse: PatientInsurerResponse = {} as PatientInsurerResponse;
  insurerInfo: PatientInsurer[] = [];
  openInsurerModel: boolean = false;
  insurerType: string = 'Add';
  skeletonEnable: boolean = false;
  insurersOptions: MasterInsurer[] = [];
  @Input() patientId: string = '';
  insurerForm: FormGroup = new FormGroup({});
  constructor(private patientService: PatientService, private fb: FormBuilder, private datePipe: DatePipe, private toastController: ToastController, private cdr: ChangeDetectorRef) {
    this.insurerForm = this.fb.group({
      insurer: [],
      membershipNumber: [],
      scheme: [],
      expiryDate: [],
      primary: []
    })
  }

  ngOnInit() {
    // this.getSelectedPatientInsurerInfo();
    // alert(this.patientId)
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
        }, {
          "patientId": "EqaN9grUfCqDVRa63kuQTekFI",
          "id": "wpa",
          "code": "wpa",
          "name": "WPA",
          "requiresDiagnosisCode": false,
          "isSTV": false,
          "acceptEdiClaims": true,
          "isESTV": false,
          "isSynchronousME": false,
          "scheme": "1234568",
          "description": "WPA",
          "startDate": "",
          "expiryDate": "09/18/2025 00:00:00",
          "expired": true,
          "renewalDate": "",
          "isPrimary": true,
          "enquireAboutMembershipNo": false,
          "lastVerified": "",
          "isValid": false,
          "membershipId": "WPA123"
        }
      ],
      "success": true,
      "resource": "PatientInsurer"
    }
    this.insurerInfo = this.insurerResponse.data
  }


  async editInsurer(insurerInfo: PatientInsurer) {
    if (!this.insurersOptions.length) {
      await this.getInsurerInfo()
    }

    const selectedInsurer = this.insurersOptions.find(option => option.id === insurerInfo.id);
    let restoreForm = {
      "insurer": {
        "id": insurerInfo.id,
        "code": insurerInfo.code,
        "name": insurerInfo.name,
        "isRequiresDiagnosisCode": insurerInfo.requiresDiagnosisCode,
        "isSTV": insurerInfo.isSTV,
        "isAcceptEdiClaims": insurerInfo.acceptEdiClaims,
        "isESTV": insurerInfo.isESTV,
        "isSynchronousME": insurerInfo.isSynchronousME,
        "addresses": []
      },
      "membershipNumber": insurerInfo.membershipId,
      "scheme": insurerInfo.scheme,
      "expiryDate": insurerInfo.expiryDate,
      "primary": insurerInfo.isPrimary
    }
    this.insurerForm.patchValue(restoreForm);
    console.log(this.insurerForm.value)
    this.insurerForm.controls['insurer'].disable();
    this.insurerType = 'Edit';
    this.insurerModel.present();
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 50);
  }

  async getInsurerInfo() {
    this.patientService.getInsurers().subscribe({
      next: (insurer: InsurerResponse) => {
        this.insurersOptions = insurer.data;
        return this.insurersOptions;
      },
      error: () => {
        console.error('Error fetching insurer');
        return 'error'
      }
    })
  }

  addInsurer() {
    console.log(this.insurerForm.getRawValue())
    let reqInsurerInfo: AddPatientInsurer = {
      "patientId": this.patientId,
      "insurerId": this.insurerForm.getRawValue().insurer.id,
      "isMemberShipVerified": this.insurerForm.getRawValue().insurer.isAcceptEdiClaims,
      "isVerificationRequired": this.insurerForm.getRawValue().insurer.isRequiresDiagnosisCode,
      "membershipNumber": this.insurerForm.getRawValue().membershipNumber || null,
      "scheme": this.insurerForm.getRawValue().scheme || null,
      "expiryDate": this.insurerForm.getRawValue().expiryDate ? this.datePipe.transform(this.insurerForm.getRawValue().expiryDate, 'yyyy-MM-dd')?.toString() : '',
      "isPrimary": this.insurerForm.getRawValue().primary
    }
    if (this.insurerType === 'Edit') {
      this.patientService.updateInsurer(reqInsurerInfo).subscribe({
        next: (updatedInfo: PatientInsurerAddResponse) => {
          this.showToast('Insurer successfully updated');
          this.getSelectedPatientInsurerInfo();
          this.insurerModel.dismiss();
        },
        error: () => { }
      })
    } else {
      this.patientService.addInsurer(reqInsurerInfo).subscribe({
        next: (updatedInfo: PatientInsurerAddResponse) => {
          this.showToast('Insurer successfully added');
          this.getSelectedPatientInsurerInfo();
          this.insurerModel.dismiss();
        },
        error: () => { }
      })
    }

  }

  insurerReset() {
    this.insurerForm.reset();
  }


  private async showToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
      color: 'success',
      position: 'bottom'
    });
    await toast.present();
  }


  compareWithFn(o1: MasterInsurer, o2: MasterInsurer): boolean {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }


  getSelectedPatientInsurerInfo() {
    this.skeletonEnable = true;
    this.patientService.getSelectedPatientInsurerInfo(this.patientId).subscribe({
      next: (patientInsurerResponse: PatientInsurerResponse) => {
        this.insurerResponse = patientInsurerResponse;
        this.insurerInfo = this.insurerResponse.data;
        this.skeletonEnable = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.skeletonEnable = false;

      }
    })
  }

}
