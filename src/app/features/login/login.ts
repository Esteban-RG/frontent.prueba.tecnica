import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth-service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Card } from "../../shared/components/card/card";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})

export class Login {
  formLogin: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
      this.formLogin = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });
    }
  
  onLogin() {
    if (this.formLogin.invalid) {
      return;
    }
    const formValue = this.formLogin.value;
    
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
