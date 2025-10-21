import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  username$: Observable<string | null>;
  isAdmin$: Observable<boolean>;
  isSuper$: Observable<boolean>;
  isEmpl$: Observable<boolean>;

  constructor(private authService: AuthService) {
    this.username$ = this.authService.getUsername$;
    this.isAdmin$ = this.authService.hasRole('Administrador');
    this.isSuper$ = this.authService.hasRole('Supervisor');
    this.isEmpl$ = this.authService.hasRole('Empleado');
  }
  
  onLogout(): void {
    this.authService.logout();
  }

}
