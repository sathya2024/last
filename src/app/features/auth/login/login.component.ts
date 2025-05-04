// src/app/features/auth/login/login.component.ts
import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule // ✅ Needed for router navigation
  ]
})
export class LoginComponent {
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  async onSubmit() {
    if (this.loginForm.invalid) {
      alert('Please enter valid credentials.');
      return;
    }

    const { email, password } = this.loginForm.value;

    try {
      const users: any = await this.http
        .get(`http://localhost:3000/users?email=${email}`)
        .toPromise();

      if (users.length && await bcrypt.compare(password!, users[0].password)) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', email!);
        localStorage.setItem('userId', users[0].id); // Store user ID in local storage

        alert('Login successful!');
        this.router.navigate(['/dashboard']); // ✅ Redirection
      } else {
        alert('Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Something went wrong. Please try again.');
    }
  }
}
