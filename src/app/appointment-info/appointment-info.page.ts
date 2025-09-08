import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-appointment-info',
  templateUrl: './appointment-info.page.html',
  styleUrls: ['./appointment-info.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class AppointmentInfoPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
