import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

/**
 * GUARD 1 — Autenticación.
 * Impide entrar a rutas privadas si no hay sesión iniciada.
 */
export const authGuard: CanActivateFn = (_route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isAuthenticated()) return true;

  auth.logout(); // limpia un token vencido, si lo hay
  return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
};
