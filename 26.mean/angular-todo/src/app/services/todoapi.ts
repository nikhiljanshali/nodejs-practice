import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, Todo } from '../interface/todo.interface';
import { environment } from '../../environment/environment';



@Injectable({
  providedIn: 'root',
})
export class Todoapi {

  private baseUrl = environment.apiUrl + environment.middleware + environment.endpoints.todos;

  constructor(private http: HttpClient) { }

  // ✅ Get All Todos
  getAllTodos(): Observable<ApiResponse<Todo[]>> {
    return this.http.get<ApiResponse<Todo[]>>(`${this.baseUrl}/read`);
  }

  // ✅ Get Todo By ID
  getTodoById(id: string): Observable<ApiResponse<Todo>> {
    return this.http.get<ApiResponse<Todo>>(`${this.baseUrl}/read/${id}`);
  }

  // ✅ Create Todo
  createTodo(data: Todo): Observable<ApiResponse<Todo>> {
    return this.http.post<ApiResponse<Todo>>(`${this.baseUrl}/create`, data);
  }

  // ✅ Update Todo
  updateTodo(id: string, data: Partial<Todo>): Observable<ApiResponse<Todo>> {
    return this.http.post<ApiResponse<Todo>>(`${this.baseUrl}/update/${id}`, data);
  }

  // ✅ Delete Todo
  deleteTodo(id: string): Observable<ApiResponse<Todo>> {
    return this.http.delete<ApiResponse<Todo>>(`${this.baseUrl}/delete/${id}`);
  }

  getTodosCount(): Observable<ApiResponse<Todo[]>> {
    return this.http.get<ApiResponse<Todo[]>>(`${this.baseUrl}/counter`);
  }

  createMultipleTodos(data: Todo[]): Observable<ApiResponse<Todo[]>> {
    return this.http.post<ApiResponse<Todo[]>>(`${this.baseUrl}/createMultiple`, data);
  }
}
