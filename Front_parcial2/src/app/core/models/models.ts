export type Rol = 'ADMIN' | 'PACIENTE';

// ---------- Auth ----------
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  tipo: string;
  expiraEn: number;
  username: string;
  nombre: string;
  rol: Rol;
}

export interface Sesion {
  token: string;
  username: string;
  nombre: string;
  rol: Rol;
  /** Expiración del token en milisegundos (epoch). */
  expira: number;
}

// ---------- Médicos ----------
export interface Medico {
  id: number;
  cedula: string;
  nombres: string;
  apellidos: string;
  nombreCompleto: string;
  especialidad: string;
  email: string;
  telefono: string;
  consultorio: string | null;
  activo: boolean;
}

export interface MedicoRequest {
  cedula: string;
  nombres: string;
  apellidos: string;
  especialidad: string;
  email: string;
  telefono: string;
  consultorio?: string | null;
}

// ---------- Pacientes ----------
export interface Paciente {
  id: number;
  cedula: string;
  nombres: string;
  apellidos: string;
  nombreCompleto: string;
  email: string;
  telefono: string;
  fechaNacimiento: string;
  direccion: string | null;
}

export interface PacienteRequest {
  cedula: string;
  nombres: string;
  apellidos: string;
  email: string;
  telefono: string;
  fechaNacimiento: string;
  direccion?: string | null;
  password: string;
}

// ---------- Citas ----------
export type EstadoCita = 'PROGRAMADA' | 'ATENDIDA' | 'CANCELADA';

export interface Cita {
  id: number;
  fechaHora: string;
  motivo: string;
  estado: EstadoCita;
  pacienteId: number;
  pacienteCedula: string;
  pacienteNombre: string;
  medicoId: number;
  medicoNombre: string;
  especialidad: string;
  consultorio: string | null;
}

export interface CitaRequest {
  pacienteId: number;
  medicoId: number;
  fechaHora: string;
  motivo: string;
}

export interface ExisteResponse {
  existe: boolean;
}
