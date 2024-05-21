import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { User } from '../models/user';

export interface ApiResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiServerUrl = 'https://reqres.in/api/users';

  constructor(private http: HttpClient) {}

  public getUsers(page: number): Observable<ApiResponse> {
    return this.http.get<ApiResponse>(`${this.apiServerUrl}?page=${page}`);
  }
}
