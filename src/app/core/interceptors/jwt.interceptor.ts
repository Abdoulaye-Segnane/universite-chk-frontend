// core/interceptors/jwt.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();

  // Routes publiques : PAS de token ajouté
  const excludedUrls = [
    '/api/auth/login',
    '/api/auth/forgot-password'
  ];

  if (excludedUrls.some(url => req.url.includes(url))) {
    return next(req); // Utilisation correcte avec HttpInterceptorFn qui ne donne pas d'erreur ici
  }

  // Autres : ajouter le token
  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 || error.status === 403) { // pour traiter aussi les 403
        authService.logout();
        router.navigate(['/user/login']);
      }
      return throwError(() => error);
    })
  );
};
