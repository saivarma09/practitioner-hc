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
  appointmentInfo = {
    name:'Olivia Bennett',
    type:'General check-up',
    time:'10:00 AM'
  }
  allergies = [
    'Latex','Penicillin'
  ]
clinicalNotes = [
  {
    type: "Follow-up",
    date: "2025-09-09",
    description: "Patient reported mild headache, advised hydration and rest.",
  },
  {
    type: "Diagnosis",
    date: "2025-09-01",
    description: "Diagnosed with seasonal allergies, prescribed antihistamines.",
  },
  {
    type: "Treatment",
    date: "2025-08-28",
    description: "Started 5-day antibiotic course for throat infection.",
  }
];

  constructor() { }

  ngOnInit() {
  }

}
