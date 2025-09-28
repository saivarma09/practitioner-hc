import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonModal, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { MbscCalendarEvent, MbscCellClickEvent, MbscEventcalendarOptions, MbscEventClickEvent, MbscModule, Notifications, setOptions } from '@mobiscroll/angular';
import { AppointmentService } from './service/appointment/appointment-service';

@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.page.html',
  styleUrls: ['./book-appointment.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, MbscModule, IonModal]
})
export class BookAppointmentPage implements OnInit {
  myEvents: MbscCalendarEvent[] = [];
  siteId:any;
  // eventSettings: MbscEventcalendarOptions = {
  //   clickToCreate: true,
  //   dragToCreate: true,
  //   dragToMove: true,
  //   dragToResize: true,
  //   eventDelete: true,
  //   view: {
  //     schedule: { type: 'day', timeCellStep:30, maxEventStack:"all" },

  //   },
  //   eventOverlap:false

  // };

  eventSettings: MbscEventcalendarOptions = {
    clickToCreate: true,
    dragToCreate: true,
    dragToMove: true,
    dragToResize: true,
    eventDelete: true,
    view: {
      schedule: {
        type: 'day',
        timeCellStep: 30,
        allDay: false,
      },
      calendar: {
        type: "week",
        count: true,
        popoverClass: "mbsc-calendar",
        popover: true,
        scroll: "horizontal"
      },
    },
    eventOverlap: false
  };
  constructor(private appointmentService:AppointmentService) {
    this.siteId = localStorage.getItem('site_id');
    this.getSpecilistInfo();
   }


  getSpecilistInfo(){
    this.appointmentService.getSpeciallity(this.siteId).subscribe({
      next:()=>{},
      error:()=>{}
    })
  }

  ngOnInit() {
  }


  test(info: any) {
    if (info.source === "schedule") {
      console.log(info)
      const start = info.date;
      const end = new Date(info.date.getTime() + 30 * 60000);

      const newEvent: MbscCalendarEvent = {
        start,
        end,
        title: 'first',
        overlap: false, // This prevents Mobiscroll from allowing overlaps
      };

      // Only add if not already there
      const alreadyExists = this.myEvents.some(ev =>
        start.getTime() < (ev.end as Date).getTime() &&
        end.getTime() > (ev.start as Date).getTime()
      );

      if (!alreadyExists) {
        this.myEvents = [...this.myEvents, newEvent];
      } else {
      }
    }
  }



  addAppointment(eventInfo: MbscCellClickEvent) {
    if (eventInfo.source === "schedule") {
      console.log(eventInfo.date)
    }
  }
}
