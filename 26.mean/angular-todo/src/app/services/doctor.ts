import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interface/todo.interface';
import { DoctorPayload, DoctorResponse } from '../interface/doctor.interface';

@Injectable({
  providedIn: 'root',
})
export class Doctorapi {

  private baseUrl = environment.apiUrl + environment.middleware + environment.endpoints.doctor;

  constructor(private http: HttpClient) { }


  createDoctor(data: DoctorPayload): Observable<ApiResponse<DoctorResponse>> {
    return this.http.post<ApiResponse<DoctorResponse>>(`${this.baseUrl}/create`, data);
  }

  getDoctrorById(id: string): Observable<ApiResponse<DoctorResponse>> {
    return this.http.get<ApiResponse<DoctorResponse>>(
      `${this.baseUrl}/read/${id}`
    );
  }

  updateDoctor(id: string, data: Partial<DoctorPayload>): Observable<ApiResponse<DoctorResponse>> {
    return this.http.post<ApiResponse<DoctorResponse>>(`${this.baseUrl}/update/${id}`, data);
  }

  getAllDoctors(): Observable<ApiResponse<DoctorResponse[]>> {
    return this.http.get<ApiResponse<DoctorResponse[]>>(`${this.baseUrl}/read`);
  }

  deleteDoctor(id: string): Observable<ApiResponse<DoctorResponse>> {
    return this.http.delete<ApiResponse<DoctorResponse>>(`${this.baseUrl}/delete/${id}`);
  }

  getDoctorsCount(): Observable<ApiResponse<DoctorResponse[]>> {
    return this.http.get<ApiResponse<DoctorResponse[]>>(`${this.baseUrl}/counter`);
  }

}
