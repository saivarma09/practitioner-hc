import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { COMMON_MODULES, FORM_MODULES, REACTIVE_FORM_MODULES } from '../shared/imports/imports';
import { IonButton, IonButtons, IonContent, IonDatetime, IonModal, IonProgressBar, IonToggle } from '@ionic/angular/standalone';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePicker } from '@pantrist/capacitor-date-picker';

@Component({
  selector: 'app-add-patients',
  templateUrl: './add-patients.page.html',
  styleUrls: ['./add-patients.page.scss'],
  standalone: true,
  imports: [FORM_MODULES, COMMON_MODULES, IonDatetime, IonModal, IonToggle, IonProgressBar, IonButton, IonButtons, REACTIVE_FORM_MODULES, IonContent]
})
export class AddPatientsPage implements OnInit {
  @ViewChild('telecomModal') telecomModal!: IonModal;
  @ViewChild('identifierModal') identifierModal!: IonModal;
  @ViewChild(IonContent, { static: false }) content!: IonContent;
  
  selectedSection: number = 1;
  progressValue: number = 0.25;
  sectionTitle: string = "Patient details";
    selectedDate: string | null = null;
  telecoms = [
    { id: 1, name: "Mobile" },
    { id: 2, name: "Landline" },
    { id: 3, name: "VoIP" },
    { id: 4, name: "Fax" },
    { id: 5, name: "Email" }
  ];
  
  titles = [
    { id: 1, name: "Mr." },
    { id: 2, name: "Mrs." },
    { id: 3, name: "Ms." },
    { id: 4, name: "Dr." },
    { id: 5, name: "Prof." }
  ];

  languages = [
    { id: 1, name: "English" },
    { id: 2, name: "Spanish" },
    { id: 3, name: "French" },
    { id: 4, name: "German" },
    { id: 5, name: "Chinese" }
  ];
  
  ethnicities = [
    { id: 1, name: "Asian" },
    { id: 2, name: "Black" },
    { id: 3, name: "White" },
    { id: 4, name: "Hispanic" },
    { id: 5, name: "Other" }
  ];
  
  genders = [
    { id: 1, name: "Male" },
    { id: 2, name: "Female" },
    { id: 3, name: "Other" }
  ];

  identifiers = [
    { id: 1, name: "NHS Number" },
    { id: 2, name: "Passport Number" },
    { id: 3, name: "Driver's License" },
    { id: 4, name: "Social Security Number" },
    { id: 5, name: "Employee ID" }
  ];

  addPatientForm: FormGroup = new FormGroup({});
  telecomForm: FormGroup = new FormGroup({});
  identifierForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {
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
        address1: [''],
        address2: [''],
        address3: [''],
        address4: [''],
        primary: [false],
        billing: [false]
      }),
      telecoms: this.fb.array([]),
      identifiers: this.fb.array([]),
    });

    this.telecomForm = this.fb.group({
      telecom: [this.telecoms[0], Validators.required],
      value: ['', Validators.required],
      isPrimary: [false],
      isPreferred: [false],
    });

    this.identifierForm = this.fb.group({
      identifier: [''],
      value: [''],
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
    }
    
    // Scroll to top after step change
    this.scrollToTop();
    this.cdr.detectChanges();
  }

  cancel() {
    switch (this.selectedSection) {
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
        telecom: this.telecoms[0],
        value: '',
        isPrimary: false,
        isPreferred: false,
      });
      this.telecomModal.dismiss();
    }
  }

  telecomFormReset() {
    this.telecomForm.reset({
      telecom: this.telecoms[0],
      value: '',
      isPrimary: false,
      isPreferred: false,
    });
  }

  identifierFormReset() {
    this.identifierForm.reset({
      identifier: '',
      value: '',
    });
  }

  addIdentifier() {
    if (this.identifierForm.valid) {
      const identifiers = this.addPatientForm.get('identifiers') as FormArray;
      identifiers.push(this.fb.group(this.identifierForm.value));
      identifiers?.updateValueAndValidity();
      this.identifierForm.reset({
        identifier: '',
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


    async openDatePicker() {
    try {
      const result = await DatePicker.present({
        mode: 'date',             // "date" | "time" | "dateAndTime"
        locale: 'en_US',          // optional
        theme: 'light',           // "light" | "dark" | "auto" (optional)
        min: new Date(2000, 0, 1).toISOString(),
        max: new Date(2030, 11, 31).toISOString(),
      });

      if (result?.value) {
        this.selectedDate = result.value; // ISO string
      }
    } catch (err) {
      console.error('DatePicker error:', err);
    }
  }

}