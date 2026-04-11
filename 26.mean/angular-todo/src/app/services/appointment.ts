import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interface/todo.interface';

@Injectable({
  providedIn: 'root',
})
export class Appointmentapi {

  private baseUrl = environment.apiUrl + environment.middleware + environment.endpoints.appointment;

  constructor(private http: HttpClient) { }


  createAppointment(data: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.baseUrl}/create`, data);
  }

  createWithValidation(data: any): Observable<ApiResponse<any>> {
    return this.http.post<ApiResponse<any>>(`${this.baseUrl}/createWithValidation`, data);
  }

  getAllAppointments(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.baseUrl}/read`);
  }


}
