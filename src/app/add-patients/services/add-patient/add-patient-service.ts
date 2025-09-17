import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})



export class AddPatientService {


  constructor(private http: HttpClient) { }


  addPatient(patientInfo: any): Observable<any> {
    const patientData = {
      "isValidationSucceeded": false,
      "title": patientInfo.patientDetails.title.id || '',
      "firstName": patientInfo.patientDetails.firstName || '',
      "lastName": patientInfo.patientDetails.lastName || '',
      "dateOfBirth": patientInfo.patientDetails.dob || '',
      "gender": patientInfo.patientDetails.gender.id || '',
      "initials": patientInfo.patientDetails.initials || '',
      "ethnicityCode": patientInfo.patientDetails.ethnicity.code || '',
      "languages": [],
      "noChase": patientInfo.patientDetails.dontChase,
      "noChaseUntil": '',
      "onStop": patientInfo.patientDetails.onStop,
      "sendInvoiceZone": patientInfo.patientDetails.paperInvoice,
      "isSafeguarded": patientInfo.patientDetails.safeguarding,
      "address": {
        "type": patientInfo.address.type.description || '',
        "city": patientInfo.address.postCodeCity || '',
        "postCode": patientInfo.address.postcode || '',
        "preFix": patientInfo.address.prefix || '',
        "address1": patientInfo.address.address1 || '',
        "address2": patientInfo.address.address2 || '',
        "address3": patientInfo.address.address3 || '',
        "address4": patientInfo.address.address4 || '',
        "country": patientInfo.address.country || '',
        "primary": patientInfo.address.primary || true,
        "billing": patientInfo.address.billing || true
      },
      "telecoms": patientInfo.telecoms.length > 0 ? patientInfo.telecoms : [],
      "identifiers": patientInfo.identifiers.length > 0 ? patientInfo.identifiers : []
    }
    console.log('Patient Data to be sent:', patientData);
    return this.http.post(`${environment.apiUrl}/patient`, patientData);
  }



  getLanguages(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/language`);
  }

  getIdentifiers(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/identifiertype`);
  }

  getEthnicities(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/ethnicity`);
  }

  getAddressTypes(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/addresstype`);
  }

  getTelecomTypes(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/telecomtype`);
  }
}
