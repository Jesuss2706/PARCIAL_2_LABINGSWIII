import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { API_URL, RUTAS_PUBLICAS } from '../api.config';
import { AuthService } from '../services/auth.service';

/**
 * INTERCEPTOR — Adjunta "Authorization: Bearer <jwt>" a las peticiones
 * a rutas PRIVADAS del backend. Si el back responde 401, cierra la sesión.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  const esBackend = req.url.startsWith(API_URL);
  const esPublica = RUTAS_PUBLICAS.some((ruta) => req.url.startsWith(ruta));
  const token = auth.token();

  const request =
    esBackend && !esPublica && token
      ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
      : req;

  return next(request).pipe(
    catchError((err: HttpErrorResponse) => {
      if (err.status === 401 && esBackend && !esPublica) {
        auth.logout();
        router.navigate(['/login'], { queryParams: { expirado: '1' } });
      }
      return throwError(() => err);
    }),
  );
};
