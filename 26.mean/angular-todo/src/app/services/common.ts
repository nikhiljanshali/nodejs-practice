import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interface/todo.interface';

@Injectable({
  providedIn: 'root',
})
export class Commonapi {

  private baseUrl = environment.apiUrl + environment.middleware + environment.endpoints.common;

  constructor(private http: HttpClient) { }

  getAllCounter(): Observable<ApiResponse<any[]>> {
    return this.http.get<ApiResponse<any[]>>(`${this.baseUrl}/read`);
  }
}
