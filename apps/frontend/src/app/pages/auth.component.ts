import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { updateUsername, updateEmail, updatePassword, resetAuthForm } from '../store/auth-form.actions';
import { selectUsername, selectEmail, selectPassword } from '../store/auth-form.selectors';

@Component({
  standalone: true,
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  imports: [CommonModule, FormsModule],
})
export class AuthComponent implements OnInit {
  mode: 'login' | 'signup' = 'login';
  username$;
  email$;
  password$;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private store: Store
  ) {
    this.username$ = this.store.select(selectUsername);
    this.email$ = this.store.select(selectEmail);
    this.password$ = this.store.select(selectPassword);
  }


  ngOnInit(): void {
    // Read mode from route params
    this.route.params.subscribe((params) => {
      this.mode = params['mode'] || 'login'; // Default to 'login' if not provided
    });
  }

  updateUsername(username: string) {
    this.store.dispatch(updateUsername({ username }));
  }

  updateEmail(email: string) {
    this.store.dispatch(updateEmail({ email }));
  }

  updatePassword(password: string) {
    this.store.dispatch(updatePassword({ password }));
  }

  onSubmit() {
    this.username$.subscribe(username => {
      this.email$.subscribe(email => {
        this.password$.subscribe(password => {
          if (this.mode === 'login') {
            this.authService.login(email, password).subscribe(
              response => {
                console.log('Login successful', response);
                this.store.dispatch(resetAuthForm());
                this.router.navigate(['/home']);
              },
              error => console.error('Login failed', error)
            );
          } else if (this.mode === 'signup') {
            this.authService.signup(username, email, password).subscribe(
              response => {
                console.log('Signup successful', response);
                this.store.dispatch(resetAuthForm());
                this.router.navigate(['/auth/login']);
              },
              error => console.error('Signup failed', error)
            );
          }
        });
      });
    });
  }

  toggleMode() {
    const newMode = this.mode === 'login' ? 'signup' : 'login';
    this.router.navigate(['/auth', newMode]);
  }
}