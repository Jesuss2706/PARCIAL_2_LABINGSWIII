import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router, provideRouter } from '@angular/router';
import { API_URL } from '../api.config';
import { iniciarSesionComo } from '../testing/sesion-prueba';
import { authInterceptor } from './auth.interceptor';

describe('authInterceptor', () => {
  let http: HttpClient;
  let backend: HttpTestingController;

  function configurar() {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    http = TestBed.inject(HttpClient);
    backend = TestBed.inject(HttpTestingController);
  }

  beforeEach(() => localStorage.clear());

  it('adjunta el JWT en rutas PRIVADAS del backend', () => {
    const sesion = iniciarSesionComo('ADMIN');
    configurar();
    http.get(`${API_URL}/admin/medicos`).subscribe();
    const req = backend.expectOne(`${API_URL}/admin/medicos`);
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${sesion.token}`);
    req.flush([]);
  });

  it('NO adjunta el JWT en rutas públicas', () => {
    iniciarSesionComo('ADMIN');
    configurar();
    http.get(`${API_URL}/public/medicos`).subscribe();
    const req = backend.expectOne(`${API_URL}/public/medicos`);
    expect(req.request.headers.has('Authorization')).toBe(false);
    req.flush([]);
  });

  it('NO adjunta el JWT en el login', () => {
    iniciarSesionComo('ADMIN');
    configurar();
    http.post(`${API_URL}/auth/login`, {}).subscribe();
    const req = backend.expectOne(`${API_URL}/auth/login`);
    expect(req.request.headers.has('Authorization')).toBe(false);
    req.flush({});
  });

  it('si el backend responde 401 cierra la sesión y manda a /login', () => {
    iniciarSesionComo('PACIENTE');
    configurar();
    const navegar = vi.spyOn(TestBed.inject(Router), 'navigate').mockResolvedValue(true);
    http.get(`${API_URL}/paciente/citas`).subscribe({ error: () => undefined });
    backend.expectOne(`${API_URL}/paciente/citas`).flush({}, { status: 401, statusText: 'Unauthorized' });
    expect(localStorage.getItem('pa_sesion')).toBeNull();
    expect(navegar).toHaveBeenCalledWith(['/login'], { queryParams: { expirado: '1' } });
  });
});
