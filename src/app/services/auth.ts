import {Injectable, inject} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {AuthResponse} from '../models/auth-response';

@Injectable({
  providedIn: 'root'
})

export class Auth {
  private apiUrl = 'http://localhost:8080/api/auth';
  private http = inject(HttpClient);

  login(credentials: any): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: AuthResponse) => {
        localStorage.setItem('jwt_token', response.token);
        console.log('Zapisano token JWT w localStorage.');
      })
    );
  }

  logout(): void {
    localStorage.removeItem('jwt_token');
  }

  getToken(): string | null {
    return localStorage.getItem('jwt_token');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
}
