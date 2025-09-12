import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  constructor(private http: HttpClient) {}

  getPatients(page: number, count: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/patient/getpatientssearch?page=${page}&count=${count}`);
  }
}

