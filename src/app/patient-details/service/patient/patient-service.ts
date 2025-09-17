import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientService {
 
  constructor(private http:HttpClient){}



  getPatientDetails(patientId:string): Observable<any> {
   return this.http.get(`${environment.apiUrl}/patient/${patientId}/getpatientdetailsbyidquery`)
  }

  getSelectedPatientAppointmentInfo(patientId:string):Observable<any>{
    return this.http.get(`${environment.appointmentUrl}/patient/${patientId}/appointments?isRequestEarlierSlot=false`)
  }

  getSelectedPatientInsurerInfo(patientId:string):Observable<any>{
    return this.http.get(`${environment.apiUrl}/patient/${patientId}/getpatientinsurerbyid`)
  }


}
