import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common'; // 👈 Importa esto
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode'
 

@Injectable({ providedIn: 'root' })
export class AuthService {


  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  login(email: string, password: string) {
    return this.http.post<any>('https://localhost:44325/api/Auth/Login', { email, password }).pipe(
      tap(response => {
        if (isPlatformBrowser(this.platformId) && response && response.token) {
          localStorage.setItem('auth_token', response.token);
          this.router.navigate(['/home']);
        }
      })
    );
    
  }

  getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('auth_token');
    }
    return null;
  }

  private getDecodedToken(): any {
    const token = this.getToken();
    if (!token) {
      return null;
    }
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      return null;
    }
  }

  getUserId(): number | null {
    const decodedToken = this.getDecodedToken();
    const userIdClaim = decodedToken ? decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'] : null;
    return userIdClaim ? +userIdClaim : null; // El '+' convierte el string a número
  }

  
  getUserRoles(): string[] {
    const decodedToken = this.getDecodedToken();
    if (!decodedToken) {
      return [];
    }

    const rolesClaim = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

    if (Array.isArray(rolesClaim)) {
      return rolesClaim; 
    } else if (rolesClaim) {
      return [rolesClaim]; 
    }
    
    return []; 
  }

  getUsername(): string | null {
    const decodedToken = this.getDecodedToken();
    if (!decodedToken) {
      return null;
    }

    const usernameClaim = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    return usernameClaim ? usernameClaim : null;
  }

  
  hasRole(role: string): boolean {
    const userRoles = this.getUserRoles();
    return userRoles.includes(role);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('auth_token');
    }
    this.router.navigate(['/login']);
  }
}