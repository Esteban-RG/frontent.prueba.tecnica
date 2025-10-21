import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private decodedTokenSubject = new BehaviorSubject<any | null>(null);
  public currentUser$ = this.decodedTokenSubject.asObservable();

  public isLoggedIn$: Observable<boolean> = this.currentUser$.pipe(
    map(decodedToken => !!decodedToken)
  );

  public getUsername$: Observable<string | null> = this.currentUser$.pipe(
    map(decodedToken => {
      if (!decodedToken) return null;
      return decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] || null;
    })
  );

  public getUserRoles$: Observable<string[]> = this.currentUser$.pipe(
    map(decodedToken => {
      if (!decodedToken) return [];
      const rolesClaim = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      if (Array.isArray(rolesClaim)) return rolesClaim;
      if (rolesClaim) return [rolesClaim];
      return [];
    })
  );

  public getUserId$: Observable<number | null> = this.currentUser$.pipe(
    map(decodedToken => {
      if (!decodedToken) return null;
      const userIdClaim = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
      return userIdClaim ? +userIdClaim : null;
    })
  );


  constructor(
    private http: HttpClient,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    
    if (isPlatformBrowser(this.platformId)) {
      const token = this.getToken();
      const decodedToken = this.decodeTokenInternal(token);
      this.decodedTokenSubject.next(decodedToken);
    }
  }

  login(email: string, password: string) {
    return this.http.post<any>('https://localhost:44325/api/Auth/Login', { email, password }).pipe(
      tap(response => {
        if (isPlatformBrowser(this.platformId) && response && response.token) {
          localStorage.setItem('auth_token', response.token);
          
          const decodedToken = this.decodeTokenInternal(response.token);
          this.decodedTokenSubject.next(decodedToken); 

          this.router.navigate(['/home']);
        }
      })
    );
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('auth_token');
    }
    this.decodedTokenSubject.next(null); 

    this.router.navigate(['/login']);
  }

  public hasRole(role: string): Observable<boolean> {
    return this.getUserRoles$.pipe(
      map(roles => roles.includes(role))
    );
  }

 
  public getToken(): string | null {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('auth_token');
    }
    return null;
  }

  private decodeTokenInternal(token: string | null): any {
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
}