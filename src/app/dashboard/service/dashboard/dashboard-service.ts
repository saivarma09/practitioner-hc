import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  
  constructor(private http: HttpClient) {
  }
  
  appointmentCounts(): Observable<any> {
    const url = `${environment.apiUrl}/patient/SP041700/reports/summary`;
    return this.http.get(url);
  }

}
