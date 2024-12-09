import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    const username = (document.getElementById('email') as HTMLInputElement).value;
    const password = (document.getElementById('password') as HTMLInputElement).value;
    console.log('Login form submitted', { username, password });
    this.authService.login(username, password).subscribe(response => {
      console.log('Login successful', response);
      this.router.navigate(['/Home']); // Change to the desired URL
    }, error => {
      console.error('Login failed', error);
    });
  }
}
