import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user.model';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: true
})
export class HomeComponent implements OnInit, OnDestroy {
  users: User[] = [];
  countdowns: { [key: string]: string } = {};
  private subscription: Subscription = new Subscription();

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getAllUsers().subscribe(
      users => {
        this.users = users;
        this.startCountdowns();
      },
      error => {
        console.error('Failed to fetch users', error);
        this.authService.logout();
      }
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  startCountdowns() {
    this.subscription = interval(1000).subscribe(() => {
      this.users.forEach(user => {
        const remainingTime = this.calculateRemainingTime(user.lastLogin);
        if (remainingTime <= 0) {
          if (user.username === this.authService.getCurrentUsername()) {
            this.authService.logout();
          } else {
            this.countdowns[user.username] = 'Logged out';
          }
        } else {
          this.countdowns[user.username] = this.formatTime(remainingTime);
        }
      });
    });
  }

  calculateRemainingTime(lastLogin: string): number {
    const lastLoginDate = new Date(lastLogin);
    const now = new Date();
    const hoursSinceLogin = (now.getTime() - lastLoginDate.getTime()) / (1000 * 60 * 60);
    return Math.max(0, 8 * 60 * 60 - hoursSinceLogin * 60 * 60);
  }

  formatTime(seconds: number): string {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h}h ${m}m ${s}s`;
  }

  logout() {
    this.authService.logout();
  }
}
