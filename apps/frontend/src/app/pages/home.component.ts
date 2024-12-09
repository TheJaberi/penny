import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true
})
export class HomeComponent implements OnInit {
  users: User[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getAllUsers().subscribe(
      users => this.users = users,
      error => {
        console.error('Failed to fetch users', error);
        this.authService.logout();
      }
    );
  }

  logout() {
    this.authService.logout();
  }
}
