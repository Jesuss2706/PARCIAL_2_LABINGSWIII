import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_URL } from '../api.config';
import { Cita, CitaRequest } from '../models/models';

@Injectable({ providedIn: 'root' })
export class CitaService {
  private readonly http = inject(HttpClient);

  /** ADMIN */
  crear(cita: CitaRequest): Observable<Cita> {
    return this.http.post<Cita>(`${API_URL}/admin/citas`, cita);
  }

  /** ADMIN: citas de todos los pacientes. */
  listarTodas(): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${API_URL}/admin/citas`);
  }

  /** PACIENTE: solo las propias (el back saca el paciente del token). */
  misCitas(): Observable<Cita[]> {
    return this.http.get<Cita[]>(`${API_URL}/paciente/citas`);
  }
}
