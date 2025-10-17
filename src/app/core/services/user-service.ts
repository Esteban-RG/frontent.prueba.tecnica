import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../shared/models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:44325/api/User'

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  getUserById(id: number) {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }
  
}
