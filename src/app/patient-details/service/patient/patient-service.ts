import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AddPatientInsurer } from '../../models/insurer';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }



  getPatientDetails(patientId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/patient/${patientId}/getpatientdetailsbyidquery`)
  }

  getSelectedPatientAppointmentInfo(patientId: string): Observable<any> {
    return this.http.get(`${environment.appointmentUrl}/patient/${patientId}/appointments?isRequestEarlierSlot=false`)
  }

  getSelectedPatientInsurerInfo(patientId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/patient/${patientId}/getpatientinsurerbyid`)
  }


  getInsurers(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/insurer`)
  }

  addInsurer(insurerInfo: AddPatientInsurer): Observable<any> {
    return this.http.post(`${environment.apiUrl}/patientinsurer`, insurerInfo)
  }
  updateInsurer(insurerInfo: AddPatientInsurer): Observable<any> {
    return this.http.put(`${environment.apiUrl}/patientinsurer`, insurerInfo)
  }


  searchAllergens(query: string): Observable<any[]> {
    if (!query || query.trim() === '') {
      return of([]);
    }
    return this.http.get<any>(`${environment.apiUrl}/allergy/allergen/${query}`)
      .pipe(
        map(res => res.data || [])
      );
  }
}
