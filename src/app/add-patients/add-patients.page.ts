import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { COMMON_MODULES, FORM_MODULES, REACTIVE_FORM_MODULES } from '../shared/imports/imports';
import { IonButton, IonButtons, IonContent, IonDatetime, IonFooter, IonModal, IonProgressBar, IonToggle, NavController } from '@ionic/angular/standalone';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePicker } from '@pantrist/capacitor-date-picker';
import { DatePickerComponent } from '../shared/components/date-picker/date-picker.component';
import { AddPatientService } from './services/add-patient/add-patient-service';
import { Language, LanguageResponse } from './models/language';
import { Identifier, IdentifiersResponse } from './models/identifiers';
import { Ethnicity, EthnicityResponse } from './models/ethnicity';
import { Gender, Title } from './models/gender';
import { AddressType, AddressTypeResponse } from './models/addresstype';
import { TelecomType, TelecomTypeResponse } from './models/telecom';
import { CommonService } from '../shared/services/common/common-service';

@Component({
  selector: 'app-add-patients',
  templateUrl: './add-patients.page.html',
  styleUrls: ['./add-patients.page.scss'],
  standalone: true,
  imports: [FORM_MODULES, COMMON_MODULES, IonDatetime, IonModal, IonToggle, IonProgressBar, IonButton, IonButtons, IonFooter, REACTIVE_FORM_MODULES, IonContent, DatePickerComponent]
})
export class AddPatientsPage implements OnInit {
  @ViewChild('telecomModal') telecomModal!: IonModal;
  @ViewChild('identifierModal') identifierModal!: IonModal;
  @ViewChild(IonContent, { static: false }) content!: IonContent;

  selectedSection: number = 1;
  progressValue: number = 0.25;
  sectionTitle: string = "Patient details";
  selectedDate: string | null = null;
  telecoms: TelecomType[] = [];
  languages: Language[] = [];
  addressTypes: AddressType[] = [];
  ethnicities: Ethnicity[] = [];
  identifiers: Identifier[] = [];
  titles: Title[] = [
    { description: "Mr", id: "Mr" },
    { description: "Sir", id: "Sir" },
    { description: "Lord", id: "Lord" },
    { description: "Mrs", id: "Mrs" },
    { description: "Ms", id: "Ms" },
    { description: "Miss", id: "Miss" },
    { description: "Lady", id: "Lady" },
  ];
  genders: Gender[] = [
    { description: "Male", id: "M" },
    { description: "Female", id: "F" },
    { description: "Transgender", id: "T" },
    { description: "Prefers not to say", id: "O" },
    { description: "Non-binary/non-conforming", id: "N" },
    { description: "Unknown", id: "U" },
  ];


  addPatientForm: FormGroup = new FormGroup({});
  telecomForm: FormGroup = new FormGroup({});
  identifierForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef, private addPatientService: AddPatientService, private navController: NavController, private commonService: CommonService) {
    this.addPatientForm = this.fb.group({
      patientDetails: this.fb.group({
        title: [''],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        initials: [''],
        dob: [''],
        gender: ['', Validators.required],
        ethnicity: [''],
        languages: [''],
        dontChase: [false],
        onStop: [false],
        safeguarding: [false],
        paperInvoice: [false],
      }),
      address: this.fb.group({
        type: ['', Validators.required],
        postcode: [''],
        postCodeCity: [''],
        prefix: [''],
        address1: ['', Validators.required],
        address2: [''],
        address3: [''],
        address4: [''],
        primary: [false],
        billing: [false],
        country: []
      }),
      telecoms: this.fb.array([]),
      identifiers: this.fb.array([]),
    });

    this.telecomForm = this.fb.group({
      telecomType: [this.telecoms[0], Validators.required],
      value: ['', Validators.required],
      isPrimary: [false],
      isPreferred: [false],
    });

    this.identifierForm = this.fb.group({
      identifierType: [''],
      value: [''],
    });


    this.getLanguages();
    this.getIdentifiers();
    this.getEthnicities();
    this.getAddressTypes();
    this.getTelecomTypes();
  }

  getLanguages() {
    this.addPatientService.getLanguages().subscribe({
      next: (response: LanguageResponse) => {
        console.log('Languages fetched successfully:', response);
        this.languages = response.data;
      },
      error: (error) => {
        console.error('Error fetching languages:', error);
      }
    });
  }

  getTelecomTypes() {
    this.addPatientService.getTelecomTypes().subscribe({
      next: (response: TelecomTypeResponse) => {
        console.log('Telecom types fetched successfully:', response);
        this.telecoms = response.data;
      },
      error: (error) => {
        console.error('Error fetching telecom types:', error);
      }
    });
  }

  getIdentifiers() {
    this.addPatientService.getIdentifiers().subscribe({
      next: (response: IdentifiersResponse) => {
        console.log('Identifiers fetched successfully:', response);
        this.identifiers = response.data;
      },
      error: (error) => {
        console.error('Error fetching identifiers:', error);
      }
    });
  }


  getEthnicities() {
    this.addPatientService.getEthnicities().subscribe({
      next: (response: EthnicityResponse) => {
        console.log('Ethnicities fetched successfully:', response);
        this.ethnicities = response.data;
      },
      error: (error) => {
        console.error('Error fetching ethnicities:', error);
      }
    });
  }

  getAddressTypes() {
    this.addPatientService.getAddressTypes().subscribe({
      next: (response: AddressTypeResponse) => {
        console.log('Address types fetched successfully:', response);
        this.addressTypes = response.data;
      },
      error: (error) => {
        console.error('Error fetching address types:', error);
      }
    });
  }

  get patientDetailsForm(): FormGroup {
    return this.addPatientForm.get('patientDetails') as FormGroup;
  }

  get addressForm(): FormGroup {
    return this.addPatientForm.get('address') as FormGroup;
  }

  get addedTelecoms(): FormArray {
    return this.addPatientForm.get('telecoms') as FormArray;
  }

  get addedIdentifiers(): FormArray {
    return this.addPatientForm.get('identifiers') as FormArray;
  }

  ngOnInit() {
  }

  private scrollToTop() {
    // Scroll to top with smooth animation
    this.content.scrollToTop(300);
  }

  nextStep() {
    switch (this.selectedSection) {
      case 1:
        this.selectedSection = 2;
        this.progressValue = 0.5;
        this.sectionTitle = "Address";
        break;
      case 2:
        this.selectedSection = 3;
        this.progressValue = 0.75;
        this.sectionTitle = "Telecoms";
        break;
      case 3:
        this.selectedSection = 4;
        this.progressValue = 1;
        this.sectionTitle = "Identifiers";
        break;
      case 4:
        this.selectedSection = 5;
        this.progressValue = 1;
        this.sectionTitle = "Review";
        break;
      case 5:
        // Final submission logic here
        console.log(this.addPatientForm.value);
        this.savePatient();
        break;
    }

    // Scroll to top after step change
    this.scrollToTop();
    this.cdr.detectChanges();
  }

  cancel() {
    switch (this.selectedSection) {
      case 1:
        this.goBack();
        break;
      case 2:
        this.selectedSection = 1;
        this.progressValue = 0.25;
        this.sectionTitle = "Patient details";
        break;
      case 3:
        this.selectedSection = 2;
        this.progressValue = 0.5;
        this.sectionTitle = "Address";
        break;
      case 4:
        this.selectedSection = 3;
        this.progressValue = 0.75;
        this.sectionTitle = "Telecoms";
        break;
      case 5:
        this.selectedSection = 4;
        this.progressValue = 1;
        this.sectionTitle = "Identifiers";
        break;
    }

    // Scroll to top after step change
    this.scrollToTop();
    this.cdr.detectChanges();
  }

  addTelecom() {
    if (this.telecomForm.valid) {
      const telecoms = this.addPatientForm.get('telecoms') as FormArray;
      telecoms.push(this.fb.group(this.telecomForm.value));
      telecoms?.updateValueAndValidity();
      this.telecomForm.reset({
        telecomType: this.telecoms[0],
        value: '',
        isPrimary: false,
        isPreferred: false,
      });
      this.telecomModal.dismiss();
    }
  }

  telecomFormReset() {
    this.telecomForm.reset({
      telecomType: this.telecoms[0],
      value: '',
      isPrimary: false,
      isPreferred: false,
    });
  }

  identifierFormReset() {
    this.identifierForm.reset({
      identifierType: '',
      value: '',
    });
  }

  addIdentifier() {
    if (this.identifierForm.valid) {
      const identifiers = this.addPatientForm.get('identifiers') as FormArray;
      identifiers.push(this.fb.group(this.identifierForm.value));
      identifiers?.updateValueAndValidity();
      this.identifierForm.reset({
        identifierType: '',
        value: '',
      });
      this.identifierModal.dismiss();
    }
    console.log(this.addPatientForm.value);
  }

  editTelecom(teleInfo: any) {
    this.telecomForm.patchValue(teleInfo);
    this.telecomModal.present();
  }

  deleteTelecom(index: number) {
    const telecoms = this.addPatientForm.get('telecoms') as FormArray;
    telecoms.removeAt(index);
    telecoms?.updateValueAndValidity();
  }

  editIdentifier(idenInfo: any) {
    this.identifierForm.patchValue(idenInfo);
    this.identifierModal.present();
  }

  deleteIdentifier(index: number) {
    const identifiers = this.addPatientForm.get('identifiers') as FormArray;
    identifiers.removeAt(index);
    identifiers?.updateValueAndValidity();
  }


  savePatient() {
    this.addPatientService.addPatient(this.addPatientForm.value).subscribe({
      next: (response) => {
        console.log('Patient added successfully:', response);
        this.commonService.setSuccessInfo({ successMessage: 'Patient added successfully', secondaryButton: { label: 'Add Another Patient', link: '/add-patients' } });
        this.navController.navigateForward(['/success']);
        this.addPatientForm.reset();
        this.selectedSection = 1;
        this.progressValue = 0;
        this.sectionTitle = "Patient details";
      },
      error: (error) => {
        console.error('Error adding patient:', error);
      }
    });
  }

  goBack() {
    this.navController.navigateBack(['/dashboard']);
  }



}