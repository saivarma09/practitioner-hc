import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IonItem, IonList, IonInput, IonModal } from '@ionic/angular/standalone';
import { COMMON_MODULES, REACTIVE_FORM_MODULES } from 'src/app/shared/imports/imports';
import { PatientService } from '../../service/patient/patient-service';
import { debounceTime, distinctUntilChanged, switchMap, of } from 'rxjs';

@Component({
  selector: 'app-allergy',
  templateUrl: './allergy.component.html',
  styleUrls: ['./allergy.component.scss'],
  standalone: true,
  imports: [COMMON_MODULES, REACTIVE_FORM_MODULES, IonInput, IonItem, IonList, IonModal]
})
export class AllergyComponent implements OnInit {
  allergyForm!: FormGroup;
  allergenSearch:FormControl = new FormControl();
  filteredItems: any[] = [
        {
            "code": "3339005",
            "allergen": "(R)-20-Hydroxysteroid dehydrogenase"
        },
        {
            "code": "33664007",
            "allergen": "Acetazolamide"
        },
        {
            "code": "3392003",
            "allergen": "Aldehyde dehydrogenase (acceptor)"
        },
        {
            "code": "3361000",
            "allergen": "Anti-heparin agent"
        },
        {
            "code": "33124007",
            "allergen": "Butamidum"
        },
        {
            "code": "33675006",
            "allergen": "Carbachol"
        },
        {
            "code": "33589008",
            "allergen": "Cardiac glycoside"
        },
        {
            "code": "3334000",
            "allergen": "Cefotaxime"
        },
        {
            "code": "3342004",
            "allergen": "Copper isotope"
        },
        {
            "code": "33236006",
            "allergen": "Cortisone acetate preparation"
        },
        {
            "code": "33378002",
            "allergen": "Desipramine"
        },
        {
            "code": "3340007",
            "allergen": "Diastase"
        },
        {
            "code": "3300001",
            "allergen": "Euphorbain"
        },
        {
            "code": "336001",
            "allergen": "Fibrinogen Tokyo II"
        },
        {
            "code": "3346001",
            "allergen": "Hemoglobin Brest"
        },
        {
            "code": "3378009",
            "allergen": "Imipramine hydrochloride"
        },
        {
            "code": "3325005",
            "allergen": "Lipopolysaccharide"
        },
        {
            "code": "3379001",
            "allergen": "Merthiolate"
        },
        {
            "code": "33682005",
            "allergen": "Mydriatic"
        },
        {
            "code": "33133009",
            "allergen": "Ophthalmic anti-inflammatory preparation"
        },
        {
            "code": "33231001",
            "allergen": "Pentobarbital"
        },
        {
            "code": "33484000",
            "allergen": "Proprietary drug"
        },
        {
            "code": "33815001",
            "allergen": "Streptococcus suis antiserum"
        },
        {
            "code": "33588000",
            "allergen": "Thioridazine"
        },
        {
            "code": "33219003",
            "allergen": "Tricyclic antidepressant"
        },
        {
            "code": "3318003",
            "allergen": "Vaginal secretions"
        },
        {
            "code": "33234009",
            "allergen": "Var/Vac"
        },
        {
            "code": "33252009",
            "allergen": "beta-adrenoceptor blocking drug"
        }
    ];

  constructor(private fb: FormBuilder, private patientService: PatientService) {
    this.allergyForm = this.fb.group({
      allergen: ['']
    });
    // this.allergyForm.get('allergen')?.disable();
  }

  ngOnInit() {
    this.allergenSearch?.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(value => value ? this.patientService.searchAllergens(value) : of([]))
    ).subscribe(data => {
      this.filteredItems = data;
    });
  }

  selectItem(item: any) {
    this.allergyForm.get('allergen')!.setValue(item.allergen, { emitEvent: false });
    this.filteredItems = [];
    console.log('Selected code:', item.code);
  }

  // trackBy function for better performance
  trackByFn(index: number, item: any) {
    return item.code; 
  }


}
