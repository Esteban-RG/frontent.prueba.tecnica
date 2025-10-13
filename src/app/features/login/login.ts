import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth-service';
import { response } from 'express';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  constructor(private authService: AuthService){}
  onLogin(formValue: any){
    this.authService.login(formValue.email, formValue.password).subscribe({
      next:(response) => {
        console.log('Login exitoso');
      },
      error: (err) => {
        console.log('Error en el login',err);
      }
    });
  }
}
