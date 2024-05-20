import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiServerUrl = 'https://reqres.in/api/users';

  constructor(private http: HttpClient) {}

  public getUsers(page: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiServerUrl}?page=${page}`);
  }
}
