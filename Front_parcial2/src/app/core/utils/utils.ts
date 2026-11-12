import { HttpErrorResponse } from '@angular/common/http';

/** Convierte un error HTTP del backend en un mensaje legible. */
export function mensajeError(err: unknown): string {
  if (!(err instanceof HttpErrorResponse)) return 'Ocurrió un error inesperado.';
  if (err.status === 0) return 'No se pudo conectar con el servidor. ¿Está corriendo el backend?';

  const body = err.error as { mensaje?: string; errores?: Record<string, string> } | null;
  if (body?.errores) return Object.values(body.errores).join(' · ');
  if (body?.mensaje) return body.mensaje;
  if (err.status === 403) return 'No tienes permisos para realizar esta acción.';
  return `Error ${err.status}: no se pudo completar la operación.`;
}

const fmtFecha = new Intl.DateTimeFormat('es-CO', { day: '2-digit', month: 'short', year: 'numeric' });
const fmtHora = new Intl.DateTimeFormat('es-CO', { hour: '2-digit', minute: '2-digit', hour12: true });

/** "2026-11-18T08:00:00" -> "18 nov 2026" */
export function formatearFecha(valor: string | null | undefined): string {
  if (!valor) return '—';
  const d = new Date(valor.length === 10 ? `${valor}T00:00:00` : valor);
  return isNaN(d.getTime()) ? valor : fmtFecha.format(d);
}

/** "2026-11-18T08:00:00" -> "08:00 a. m." */
export function formatearHora(valor: string | null | undefined): string {
  if (!valor) return '—';
  const d = new Date(valor);
  return isNaN(d.getTime()) ? valor : fmtHora.format(d);
}
