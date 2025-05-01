import { Component, inject } from '@angular/core';

import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { LoginRequestModel } from '../../../shared/models/login-request.model';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  error = '';

  submit() {
    if (this.form.invalid) return;
  
    const loginData: LoginRequestModel = this.form.value as LoginRequestModel;
  
    this.auth.login(loginData).subscribe({
      next: () => {
        const user = this.auth.getCurrentUser();
        console.log('User after login:', user);
  
        // Assurez-vous que le rôle est bien détecté
        if (user?.role === 'ADMIN') {
          this.router.navigate(['/admin/dashboard']);
        } else if (user?.role === 'STUDENT') {
          this.router.navigate(['/student/dashboard']);
        } else {
          console.warn("Aucun rôle trouvé dans le token.");
        }
      },
      error: () => {
        this.error = 'Identifiants incorrects. Veuillez réessayer.';
      }
    });
  }
  
}
