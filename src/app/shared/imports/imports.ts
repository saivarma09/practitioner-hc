
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSkeletonText, IonInput } from '@ionic/angular/standalone';

import {IonItem, IonList, IonSelect, IonSelectOption} from "@ionic/angular/standalone";

// Export modules for reuse in other modules
export const COMMON_MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  IonHeader, IonToolbar, IonTitle, IonContent, IonSkeletonText
];



export const FORM_MODULES = [
  IonItem, IonList, IonSelect, IonSelectOption, IonInput
];  


export const REACTIVE_FORM_MODULES = [
   ReactiveFormsModule
]
