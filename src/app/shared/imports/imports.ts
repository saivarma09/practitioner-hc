
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonSkeletonText } from '@ionic/angular/standalone';



// Export modules for reuse in other modules
export const COMMON_MODULES = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  IonHeader, IonToolbar, IonTitle, IonContent, IonSkeletonText
];


