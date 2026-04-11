import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interface/todo.interface';
import { PatientDetails, PatientResponse, PatientResponseData } from '../interface/patient.interface';

@Injectable({
  providedIn: 'root',
})
export class Patientapi {

  private baseUrl = environment.apiUrl + environment.middleware + environment.endpoints.patient;

  constructor(private http: HttpClient) { }


  createPatient(data: PatientDetails): Observable<ApiResponse<PatientResponse>> {
    return this.http.post<ApiResponse<PatientResponse>>(`${this.baseUrl}/create`, data);
  }

  getPatientById(id: string): Observable<ApiResponse<PatientResponseData>> {
    return this.http.get<ApiResponse<PatientResponseData>>(
      `${this.baseUrl}/read/${id}`
    );
  }

  updatePatient(id: string, data: Partial<PatientResponse>): Observable<ApiResponse<PatientResponse>> {
    return this.http.post<ApiResponse<PatientResponse>>(`${this.baseUrl}/update/${id}`, data);
  }

  getAllPatients(): Observable<ApiResponse<PatientDetails[]>> {
    return this.http.get<ApiResponse<PatientDetails[]>>(`${this.baseUrl}/read`);
  }

  deletePatient(id: string): Observable<ApiResponse<PatientDetails>> {
    return this.http.delete<ApiResponse<PatientDetails>>(`${this.baseUrl}/delete/${id}`);
  }

  getPatientsCount(): Observable<ApiResponse<PatientDetails[]>> {
    return this.http.get<ApiResponse<PatientDetails[]>>(`${this.baseUrl}/counter`);
  }
}
