import {HttpInterceptorFn} from '@angular/common/http';
import {inject} from '@angular/core';
import {Auth} from '../services/auth';
import {catchError, throwError} from 'rxjs';
import {Router} from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(Auth);
  const router = inject(Router);
  const token = auth.getToken();

  let authReq = req;

  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(authReq).pipe(
    catchError(error => {
      if (error.status === 401 || error.status === 403) {
        console.log('Błąd autoryzacji lub wygasły token. Wylogowywanie...');
        auth.logout();
        router.navigate(['/login']);
      }
      return throwError(() => error);
    })
  );
};
