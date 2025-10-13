import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<any>('/login', { email, password }).pipe(
      tap(response => {
        console.log('Login exitoso');
        localStorage.setItem('auth_token', response.token);
      })
    );
  }

  getToken(){
    return localStorage.getItem('auth_token');
  }

  logout(){
    localStorage.removeItem('auth_token');
  }
}
