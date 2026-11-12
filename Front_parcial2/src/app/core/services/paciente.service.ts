import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { API_URL } from '../api.config';
import { ExisteResponse, Paciente, PacienteRequest } from '../models/models';

@Injectable({ providedIn: 'root' })
export class PacienteService {
  private readonly http = inject(HttpClient);

  /** ADMIN */
  listar(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${API_URL}/admin/pacientes`);
  }

  /** ADMIN */
  registrar(paciente: PacienteRequest): Observable<Paciente> {
    return this.http.post<Paciente>(`${API_URL}/admin/pacientes`, paciente);
  }

  /** ADMIN: consulta reactiva para el validador asíncrono. */
  existeCedula(cedula: string): Observable<boolean> {
    return this.http
      .get<ExisteResponse>(`${API_URL}/admin/pacientes/existe/${encodeURIComponent(cedula)}`)
      .pipe(map((r) => r.existe));
  }
}
