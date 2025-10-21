import { Component, OnInit } from '@angular/core';
import { Navbar } from '../../shared/components/navbar/navbar';
import { AuthService } from '../../core/services/auth-service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-home',
  imports: [CommonModule, Navbar],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit{ 
  userId$: Observable<number | null>;
  roles$: Observable<string[]>;
  isAdmin$: Observable<boolean>;
  username$: Observable<string | null>;



  constructor(private authService: AuthService) { 
      this.userId$ = this.authService.getUserId$
      this.roles$ = this.authService.getUserRoles$
      this.isAdmin$ = this.authService.hasRole('Administrador');
      this.username$ = this.authService.getUsername$;
  }

  ngOnInit(): void {
    
  }
}