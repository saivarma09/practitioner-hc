import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IonItem, IonList, IonInput, IonModal, IonSpinner, IonTextarea, ToastController } from '@ionic/angular/standalone';
import { COMMON_MODULES, FORM_MODULES, REACTIVE_FORM_MODULES } from 'src/app/shared/imports/imports';
import { PatientService } from '../../service/patient/patient-service';
import { debounceTime, distinctUntilChanged, switchMap, of, finalize, catchError } from 'rxjs';
import { NoRecordsComponent } from 'src/app/shared/components/no-records/no-records.component';
import { PatientAllergiesResponse, PatientAllergy, PatientAllergySubmitResponse, Severity, SeverityResponse } from 'src/app/add-patients/models/allergy';

@Component({
    selector: 'app-allergy',
    templateUrl: './allergy.component.html',
    styleUrls: ['./allergy.component.scss'],
    standalone: true,
    imports: [COMMON_MODULES, REACTIVE_FORM_MODULES, IonInput, IonItem, IonList, IonModal, IonSpinner, NoRecordsComponent, IonTextarea, FORM_MODULES, NoRecordsComponent]
})
export class AllergyComponent implements OnInit {
    @ViewChild('allergenModel') allergenModel!: IonModal;
    @ViewChild('addAllergenModel') addAllergenModel!: IonModal;
    @Input() patientId: string = ''
    allergyForm!: FormGroup;
    allergenType: string = 'Add'
    searchLoaderEnable: boolean = false;
    patientAllergysSkeletonEnable: boolean = true;
    allergenSearch: FormControl = new FormControl();
    skeletonArray = Array.from({ length: 5 });
    filteredItems: any[] = [];
    severityType: any[] = [
        { code: 'A', description: 'Allergy' },
        { code: 'I', description: 'Intolerance' },
    ]
    patientAllergys: PatientAllergy[] = [];
    severityOptions: Severity[] = []
    constructor(private fb: FormBuilder, private patientService: PatientService, private toastController: ToastController, private cdr: ChangeDetectorRef) {
        this.allergyForm = this.fb.group({
            type: ['', Validators.required],
            allergen: ['', Validators.required],
            allergenCode: ['', Validators.required],
            severity: ['', Validators.required],
            notes: [''],
            id: ['']
        });
    }

    ngOnInit() {
        this.allergenSearch?.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap(value => {
                if (!value) {
                    return of([]);
                }
                this.searchLoaderEnable = true;
                return this.patientService.searchAllergens(value).pipe(
                    finalize(() => this.searchLoaderEnable = false),
                    catchError(err => {
                        console.error('Allergen search error', err);
                        return of([]);
                    })
                );
            })
        ).subscribe(data => {
            this.filteredItems = data;
        });

        this.getPatientAllergyInfo();

    }

    selectItem(item: any) {
        this.allergyForm.get('allergen')!.setValue(item.allergen, { emitEvent: false });
        this.allergyForm.get('allergenCode')!.setValue(item.code, { emitEvent: false });
        this.allergenModel.dismiss();
        this.filteredItems = [];
    }


    getAllergyseverity(): Promise<any> {
        return new Promise((resolve, reject) => {
            if (this.severityOptions.length <= 0) {
                this.patientService.getAllergyseverity().subscribe({
                    next: (res: SeverityResponse) => {
                        this.severityOptions = res.data;
                        this.cdr.detectChanges();
                        resolve(res.data);
                    },
                    error: (error) => {
                        reject(error);
                    }
                });
            }
            else {
                resolve(this.severityOptions)
            }
        });
    }

    getPatientAllergyInfo() {
        this.patientAllergysSkeletonEnable = true;
        this.patientService.getPatientAllergyInfo(this.patientId).subscribe({
            next: (patientAllergyResponse: PatientAllergiesResponse) => {
                this.patientAllergys = patientAllergyResponse.data;
                this.patientAllergysSkeletonEnable = false;
                this.cdr.detectChanges();
            },
            error: () => {
                this.patientAllergysSkeletonEnable = false;
                this.cdr.detectChanges();
            }
        })
    }


    getAllergyType(code: string) {
        return this.severityType.find((option) => option.code === code).description
    }

    async addAllergy() {
        try {
            await this.getAllergyseverity();
            this.cdr.detectChanges();
            this.allergenType = "Add"
            this.addAllergenModel.present();
        } catch (error) {
            console.error('Failed to load severity options:', error);
        }
    }

    async editAllergie(editInfo: PatientAllergy) {
        try {
            // Wait for the API call to complete
            await this.getAllergyseverity();
            this.cdr.detectChanges();
            this.allergenType = "Edit"
            this.addAllergenModel.present();
            const typeObject = this.severityType.find(s => s.code === editInfo.allergyIntolerance) || {};
            const severityObject = this.severityOptions.find(s => s.type === editInfo.allergySeverityType) || {};
            const editForm = {
                type: typeObject,
                allergen: editInfo.allergyCode,
                allergenCode: editInfo.allergyCodeCode,
                severity: severityObject,
                notes: editInfo.notes || '',
                id: editInfo.id || null
            }
            this.allergyForm.patchValue(editForm);
            this.cdr.detectChanges();
            console.log(this.allergyForm.getRawValue());
        } catch (error) {
            console.error('Failed to load severity options:', error);
            // Handle error appropriately
        }

    }

    submitAllergy() {
        if (this.allergenType === "Add") {
            const submitInfo = {
                "patientAllergyRequests": [
                    {
                        "id": null,
                        "patientId": this.patientId,
                        "allergyCodeCode": this.allergyForm.value.allergenCode,
                        "allergyIntolerance": this.allergyForm.value.type.code,
                        "allergySeverityType": this.allergyForm.value.severity.type,
                        "notes": this.allergyForm.value.notes,
                        "appointmentRef": ""
                    }
                ]
            }
            this.patientService.submitAllergy(submitInfo).subscribe({
                next: (res: PatientAllergySubmitResponse) => {
                   this.showToast('Allergy successfully added');
                   this.getPatientAllergyInfo();
                },
                error: () => { }
            })
        } else {
            const submitInfo = {
                "id": this.allergyForm.value.id || null,
                "patientId": this.patientId,
                "allergyCodeCode": this.allergyForm.value.allergenCode,
                "allergyIntolerance": this.allergyForm.value.type.code,
                "allergySeverityType": this.allergyForm.value.severity.type,
                "notes": this.allergyForm.value.notes,
                "appointmentRef": "",
                "status": this.allergyForm.value.type.code
            }
            this.patientService.updateAllergy(submitInfo).subscribe({
                next: (res: PatientAllergySubmitResponse) => {
                  this.showToast('Allergy successfully updated');
                  this.getPatientAllergyInfo();
                },
                error: () => { }
            })
        }
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

}
