import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interface/todo.interface';
import { AuthData, AuthResponse, IAuthentication } from '../interface/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  private baseUrl = environment.apiUrl + environment.middleware + '/auth';

  constructor(private http: HttpClient) { }

  // ✅ Signup API
  signup(data: AuthData): Observable<ApiResponse<IAuthentication>> {
    return this.http.post<ApiResponse<IAuthentication>>(
      `${this.baseUrl}/signup`,
      data
    );
  }

  // ✅ Login API
  login(data: { email: string; password: string }): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(
      `${this.baseUrl}/login`,
      data
    );
  }
}
