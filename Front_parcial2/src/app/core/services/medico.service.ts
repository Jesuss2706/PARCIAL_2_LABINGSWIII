import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { API_URL } from '../api.config';
import { ExisteResponse, Medico, MedicoRequest } from '../models/models';

@Injectable({ providedIn: 'root' })
export class MedicoService {
  private readonly http = inject(HttpClient);

  /** PÚBLICO */
  listarPublico(): Observable<Medico[]> {
    return this.http.get<Medico[]>(`${API_URL}/public/medicos`);
  }

  /** ADMIN */
  listar(): Observable<Medico[]> {
    return this.http.get<Medico[]>(`${API_URL}/admin/medicos`);
  }

  /** ADMIN */
  registrar(medico: MedicoRequest): Observable<Medico> {
    return this.http.post<Medico>(`${API_URL}/admin/medicos`, medico);
  }

  /** ADMIN: consulta reactiva para el validador asíncrono. */
  existeCedula(cedula: string): Observable<boolean> {
    return this.http
      .get<ExisteResponse>(`${API_URL}/admin/medicos/existe/${encodeURIComponent(cedula)}`)
      .pipe(map((r) => r.existe));
  }
}
