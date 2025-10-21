import { Component, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../core/services/auth-service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})

export class Login {
  formLogin: FormGroup;
  listErrors: any[] = [];



  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {
      this.formLogin = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });
    }
  
  onLogin() {
    this.listErrors = []; 
    if (this.formLogin.invalid) {
      return;
    }
    const formValue = this.formLogin.value;

    this.authService.login(formValue.email, formValue.password).subscribe({
      next: (response) => {
        console.log('Login exitoso');
      },
      error: (err) => {
        console.log('Error en el login', err.error);
        const errorResponse = err.error;
        if (Array.isArray(errorResponse)) {
          this.listErrors = errorResponse;
        } else if (typeof errorResponse === 'string') {
          this.listErrors = [{ message: errorResponse }];
        } else if (errorResponse && typeof errorResponse === 'object') {
          this.listErrors = [errorResponse];
        } else {
          this.listErrors = [{ message: 'An unexpected error occurred.' }];
        }
        this.cdr.detectChanges();
      }
    });
  }
}
