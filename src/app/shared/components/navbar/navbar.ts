import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar implements OnInit {
  username: string | null = null;
  isAdmin: boolean = false;
  isSuper: boolean = false;
  isEmpl: boolean = false;

  constructor(private authService: AuthService) {
    this.isAdmin = this.authService.hasRole('Administrador');
    this.isSuper = this.authService.hasRole('Supervisor');
    this.isEmpl = this.authService.hasRole('Empleado');
  }

  ngOnInit(): void {
    this.username = this.authService.getUsername();
  }

  onLogout(): void {
    console.log('Cerrando sesion...');
    this.authService.logout();
  }

}
