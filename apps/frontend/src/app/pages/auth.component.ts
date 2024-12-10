import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  imports: [CommonModule, FormsModule],
})
export class AuthComponent implements OnInit {
  mode: 'login' | 'signup' = 'login';
  username= '';
  email = '';
  password = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Read mode from route params
    this.route.params.subscribe((params) => {
      this.mode = params['mode'] || 'login'; // Default to 'login' if not provided
    });
  }

  onSubmit() {
    if (this.mode === 'login') {
      this.authService.login(this.email, this.password).subscribe(
        (response) => {
          console.log('Login successful', response);
          this.router.navigate(['/home']);
        },
        (error) => {
          console.error('Login failed', error);
        }
      );
    } else if (this.mode === 'signup') {
      this.authService.signup(this.username, this.email, this.password).subscribe(
        (response) => {
          console.log('Signup successful', response);
          this.router.navigate(['/auth/login']);
        },
        (error) => {
          console.error('Signup failed', error);
        }
      );
    }
  }

  toggleMode() {
    this.mode = this.mode === 'login' ? 'signup' : 'login';
    this.router.navigate(['/auth', this.mode]); // Navigate with updated mode
  }
}