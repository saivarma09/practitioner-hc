import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { IonAlert, IonButton, IonDatetime, IonDatetimeButton, IonModal } from '@ionic/angular/standalone';
import { FORM_MODULES, REACTIVE_FORM_MODULES } from '../../imports/imports';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  imports:[IonDatetime, IonDatetimeButton, IonModal, REACTIVE_FORM_MODULES, IonButton, IonAlert, FORM_MODULES, DatePipe]
})
export class DatePickerComponent  implements OnInit {
  @Input() dateControl: any = new FormControl('');
  @ViewChild('dateModal') dateModal!: IonModal;
  public maxDate: string = new Date().toISOString();
  constructor(private cdk:ChangeDetectorRef) { }

  ngOnInit() {}

  closeModel() {
    this.dateModal?.dismiss();
    this.cdk.detectChanges();
  }
}
