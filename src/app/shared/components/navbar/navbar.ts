import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { NotificationBadge } from "./notification-badge/notification-badge";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, NotificationBadge],
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
