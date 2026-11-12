import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { routes } from './app.routes';
import { iniciarSesionComo, sesionVencida } from './core/testing/sesion-prueba';

/**
 * Pruebas de acceso a las rutas del frontend escribiendo la URL directamente.
 *  - Rutas públicas
 *  - Rutas privadas: acceso PERMITIDO por rol
 *  - Rutas privadas: acceso DENEGADO por rol (y sin sesión)
 */
describe('Rutas del frontend', () => {
  let harness: RouterTestingHarness;
  let router: Router;

  async function configurar(): Promise<void> {
    TestBed.configureTestingModule({
      providers: [provideRouter(routes), provideHttpClient(), provideHttpClientTesting()],
    });
    harness = await RouterTestingHarness.create();
    router = TestBed.inject(Router);
  }

  async function ir(url: string): Promise<string> {
    await harness.navigateByUrl(url);
    return router.url;
  }

  function textoPagina(): string {
    return harness.routeNativeElement?.textContent ?? '';
  }

  beforeEach(() => localStorage.clear());

  // ===================================================================
  describe('Rutas públicas (sin sesión)', () => {
    beforeEach(configurar);

    it('/ muestra la página de inicio', async () => {
      expect(await ir('/')).toBe('/');
      expect(textoPagina()).toContain('Tu salud, en manos que');
    });

    it('/medicos muestra el listado público de médicos', async () => {
      expect(await ir('/medicos')).toBe('/medicos');
      expect(textoPagina()).toContain('Nuestros médicos');
    });

    it('/login muestra el formulario de inicio de sesión', async () => {
      expect(await ir('/login')).toBe('/login');
      expect(textoPagina()).toContain('Inicia sesión');
    });

    it('una ruta inexistente muestra la página 404', async () => {
      await ir('/no-existe');
      expect(textoPagina()).toContain('Página no encontrada');
    });

    it('/registro muestra el formulario para crear cuenta', async () => {
      expect(await ir('/registro')).toBe('/registro');
      expect(textoPagina()).toContain('Crear cuenta');
    });
  });

  // ===================================================================
  describe('Rutas privadas SIN sesión → redirige a /login (Guard 1)', () => {
    beforeEach(configurar);

    const privadas = [
      '/paciente/mis-citas',
      '/admin/citas',
      '/admin/citas/nueva',
      '/admin/medicos',
      '/admin/medicos/nuevo',
      '/admin/pacientes',
      '/admin/pacientes/nuevo',
    ];

    for (const url of privadas) {
      it(`${url} → /login`, async () => {
        const destino = await ir(url);
        expect(destino.startsWith('/login')).toBe(true);
        expect(destino).toContain(`returnUrl=${encodeURIComponent(url)}`);
      });
    }

    it('con token vencido también redirige a /login', async () => {
      TestBed.resetTestingModule();
      sesionVencida('ADMIN');
      await configurar();
      expect((await ir('/admin/citas')).startsWith('/login')).toBe(true);
    });
  });

  // ===================================================================
  describe('Rol PACIENTE', () => {
    beforeEach(async () => {
      iniciarSesionComo('PACIENTE');
      await configurar();
    });

    it('PERMITIDO: /paciente/mis-citas', async () => {
      expect(await ir('/paciente/mis-citas')).toBe('/paciente/mis-citas');
      expect(textoPagina()).toContain('Mis citas');
    });

    it('PERMITIDO: /paciente redirige a /paciente/mis-citas', async () => {
      expect(await ir('/paciente')).toBe('/paciente/mis-citas');
    });

    it('PERMITIDO: rutas públicas (/medicos)', async () => {
      expect(await ir('/medicos')).toBe('/medicos');
    });

    const soloAdmin = [
      '/admin/citas',
      '/admin/citas/nueva',
      '/admin/medicos',
      '/admin/medicos/nuevo',
      '/admin/pacientes',
      '/admin/pacientes/nuevo',
    ];
    for (const url of soloAdmin) {
      it(`DENEGADO: ${url} → /acceso-denegado (Guard 2)`, async () => {
        expect(await ir(url)).toBe('/acceso-denegado');
        expect(textoPagina()).toContain('Acceso denegado');
      });
    }
  });

  // ===================================================================
  describe('Rol ADMIN', () => {
    beforeEach(async () => {
      iniciarSesionComo('ADMIN');
      await configurar();
    });

    const permitidas: [string, string][] = [
      ['/admin/citas', 'Citas médicas'],
      ['/admin/citas/nueva', 'Nueva cita'],
      ['/admin/medicos', 'Médicos'],
      ['/admin/medicos/nuevo', 'Registrar médico'],
      ['/admin/pacientes', 'Pacientes'],
      ['/admin/pacientes/nuevo', 'Registrar paciente'],
    ];
    for (const [url, titulo] of permitidas) {
      it(`PERMITIDO: ${url}`, async () => {
        expect(await ir(url)).toBe(url);
        expect(textoPagina()).toContain(titulo);
      });
    }

    it('PERMITIDO: /admin redirige a /admin/citas', async () => {
      expect(await ir('/admin')).toBe('/admin/citas');
    });

    it('DENEGADO: /paciente/mis-citas → /acceso-denegado (Guard 2)', async () => {
      expect(await ir('/paciente/mis-citas')).toBe('/acceso-denegado');
    });
  });
});
