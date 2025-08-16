import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {Auth} from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})

export class Login {
  email = '';
  password = '';

  private auth = inject(Auth);
  private router = inject(Router);

  login() {
    const credentials = { email: this.email, password: this.password };

    this.auth.login(credentials).subscribe({
      next: (response) => {
        console.log('Logowanie udane!', response);
        this.router.navigate(['/tasks']);
      },
      error: (err) => {
        console.error('Błąd logowania:', err);
      }
    });
  }
}
