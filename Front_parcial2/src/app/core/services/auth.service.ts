import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, map, tap } from 'rxjs';
import { API_URL } from '../api.config';
import { ExisteResponse, LoginRequest, LoginResponse, Paciente, PacienteRequest, Rol, Sesion } from '../models/models';

const STORAGE_KEY = 'pa_sesion';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);

  private readonly sesion = signal<Sesion | null>(this.leerSesion());

  /** Nombre y rol del usuario logueado (o null). */
  readonly nombre = computed(() => (this.isAuthenticated() ? this.sesion()!.nombre : null));
  readonly rol = computed<Rol | null>(() => (this.isAuthenticated() ? this.sesion()!.rol : null));

  login(credenciales: LoginRequest): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${API_URL}/auth/login`, credenciales)
      .pipe(tap((res) => this.guardarSesion(res)));
  }

  /** PÚBLICO: un paciente crea su propia cuenta. */
  registrar(datos: PacienteRequest): Observable<Paciente> {
    return this.http.post<Paciente>(`${API_URL}/auth/registro`, datos);
  }

  /** PÚBLICO: ¿la cédula ya tiene cuenta? (validador asíncrono del registro). */
  existeCedula(cedula: string): Observable<boolean> {
    return this.http
      .get<ExisteResponse>(`${API_URL}/auth/existe/${encodeURIComponent(cedula)}`)
      .pipe(map((r) => r.existe));
  }

  logout(): void {
    this.sesion.set(null);
    if (typeof localStorage !== 'undefined') localStorage.removeItem(STORAGE_KEY);
  }

  /** true si hay token y no ha expirado. */
  isAuthenticated(): boolean {
    const s = this.sesion();
    return !!s && s.expira > Date.now();
  }

  hasRole(...roles: Rol[]): boolean {
    const s = this.sesion();
    return this.isAuthenticated() && !!s && roles.includes(s.rol);
  }

  token(): string | null {
    return this.isAuthenticated() ? this.sesion()!.token : null;
  }

  /** Página de inicio según el rol. */
  inicioPorRol(): string {
    if (this.hasRole('ADMIN')) return '/admin/citas';
    if (this.hasRole('PACIENTE')) return '/paciente/mis-citas';
    return '/';
  }

  // ---------------------------------------------------------------------------

  private guardarSesion(res: LoginResponse): void {
    const sesion: Sesion = {
      token: res.token,
      username: res.username,
      nombre: res.nombre,
      rol: res.rol,
      expira: this.leerExpiracion(res.token) ?? Date.now() + res.expiraEn,
    };
    this.sesion.set(sesion);
    if (typeof localStorage !== 'undefined') localStorage.setItem(STORAGE_KEY, JSON.stringify(sesion));
  }

  private leerSesion(): Sesion | null {
    if (typeof localStorage === 'undefined') return null;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Sesion) : null;
    } catch {
      return null;
    }
  }

  /** Lee el campo "exp" del payload del JWT. */
  private leerExpiracion(token: string): number | null {
    try {
      const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      const { exp } = JSON.parse(atob(payload));
      return typeof exp === 'number' ? exp * 1000 : null;
    } catch {
      return null;
    }
  }
}
