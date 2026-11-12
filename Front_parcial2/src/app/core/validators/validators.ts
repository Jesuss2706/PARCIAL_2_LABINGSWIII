import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable, catchError, map, of, switchMap, take, timer } from 'rxjs';

/**
 * Validador ASÍNCRONO: consulta el backend (de forma reactiva) si la cédula
 * ya está registrada. Espera 400 ms desde la última tecla antes de consultar.
 */
export function cedulaDisponibleValidator(consultar: (cedula: string) => Observable<boolean>): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const cedula = String(control.value ?? '').trim();
    if (!/^\d{6,10}$/.test(cedula)) return of(null); // las sincrónicas ya muestran el error

    return timer(400).pipe(
      switchMap(() => consultar(cedula)),
      map((existe) => (existe ? { cedulaRegistrada: true } : null)),
      catchError(() => of(null)),
      take(1),
    );
  };
}

/** La fecha/hora debe ser posterior a este momento (citas). */
export const fechaFuturaValidator: ValidatorFn = (control) => {
  if (!control.value) return null;
  return new Date(control.value).getTime() > Date.now() ? null : { fechaNoFutura: true };
};

/** La fecha debe ser anterior a hoy (fecha de nacimiento). */
export const fechaPasadaValidator: ValidatorFn = (control) => {
  if (!control.value) return null;
  return new Date(control.value).getTime() < Date.now() ? null : { fechaNoPasada: true };
};

/** Solo letras (con tildes y ñ) y espacios. */
export const soloLetrasValidator: ValidatorFn = (control) => {
  if (!control.value) return null;
  return /^[A-Za-zÁÉÍÓÚÜÑáéíóúüñ' ]+$/.test(String(control.value).trim()) ? null : { soloLetras: true };
};
