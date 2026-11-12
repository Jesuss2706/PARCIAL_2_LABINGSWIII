import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Rol } from '../models/models';
import { AuthService } from '../services/auth.service';

/**
 * GUARD 2 — Autorización por rol.
 * Lee los roles permitidos de `data.roles` de la ruta.
 * Si el rol del usuario no coincide, lo manda a /acceso-denegado.
 */
export const roleGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const roles = (route.data['roles'] ?? []) as Rol[];

  if (!auth.isAuthenticated()) {
    return router.createUrlTree(['/login'], { queryParams: { returnUrl: state.url } });
  }
  return auth.hasRole(...roles) ? true : router.createUrlTree(['/acceso-denegado']);
};
