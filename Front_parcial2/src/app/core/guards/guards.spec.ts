import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree, provideRouter } from '@angular/router';
import { iniciarSesionComo } from '../testing/sesion-prueba';
import { authGuard } from './auth.guard';
import { roleGuard } from './role.guard';

function ruta(roles: string[] = []): ActivatedRouteSnapshot {
  return { data: { roles } } as unknown as ActivatedRouteSnapshot;
}
const estado = (url: string) => ({ url }) as RouterStateSnapshot;

function configurar() {
  TestBed.configureTestingModule({ providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()] });
}

describe('Guards', () => {
  beforeEach(() => localStorage.clear());

  describe('Guard 1 — authGuard', () => {
    it('sin sesión devuelve un UrlTree a /login con returnUrl', () => {
      configurar();
      const r = TestBed.runInInjectionContext(() => authGuard(ruta(), estado('/admin/citas')));
      expect(r instanceof UrlTree).toBe(true);
      expect(TestBed.inject(Router).serializeUrl(r as UrlTree)).toBe('/login?returnUrl=%2Fadmin%2Fcitas');
    });

    it('con sesión permite el acceso', () => {
      iniciarSesionComo('PACIENTE');
      configurar();
      expect(TestBed.runInInjectionContext(() => authGuard(ruta(), estado('/paciente/mis-citas')))).toBe(true);
    });
  });

  describe('Guard 2 — roleGuard', () => {
    it('ADMIN entra a una ruta de ADMIN', () => {
      iniciarSesionComo('ADMIN');
      configurar();
      expect(TestBed.runInInjectionContext(() => roleGuard(ruta(['ADMIN']), estado('/admin/citas')))).toBe(true);
    });

    it('PACIENTE NO entra a una ruta de ADMIN → /acceso-denegado', () => {
      iniciarSesionComo('PACIENTE');
      configurar();
      const r = TestBed.runInInjectionContext(() => roleGuard(ruta(['ADMIN']), estado('/admin/citas')));
      expect(TestBed.inject(Router).serializeUrl(r as UrlTree)).toBe('/acceso-denegado');
    });

    it('ADMIN NO entra a una ruta de PACIENTE → /acceso-denegado', () => {
      iniciarSesionComo('ADMIN');
      configurar();
      const r = TestBed.runInInjectionContext(() => roleGuard(ruta(['PACIENTE']), estado('/paciente/mis-citas')));
      expect(TestBed.inject(Router).serializeUrl(r as UrlTree)).toBe('/acceso-denegado');
    });
  });
});
