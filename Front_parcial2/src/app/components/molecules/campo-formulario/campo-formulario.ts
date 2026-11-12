import { ChangeDetectorRef, Component, computed, effect, inject, input, signal } from '@angular/core';
import { AbstractControl } from '@angular/forms';

/** Mensajes por defecto para los errores más comunes. */
const MENSAJES_BASE: Record<string, string> = {
  required: 'Este campo es obligatorio.',
  email: 'Escribe un correo válido.',
  pattern: 'El formato no es válido.',
  minlength: 'Es demasiado corto.',
  maxlength: 'Es demasiado largo.',
  cedulaRegistrada: 'Esta cédula ya está registrada.',
  fechaNoFutura: 'La fecha debe ser posterior a hoy.',
  fechaNoPasada: 'La fecha debe ser anterior a hoy.',
  soloLetras: 'Solo se permiten letras.',
};

@Component({
  selector: 'app-campo-formulario',
  templateUrl: './campo-formulario.html',
  styleUrl: './campo-formulario.css',
})
export class CampoFormulario {
  readonly etiqueta = input.required<string>();
  readonly para = input.required<string>();
  readonly control = input.required<AbstractControl | null>();
  readonly mensajes = input<Record<string, string>>({});
  readonly ayuda = input<string | null>(null);
  readonly obligatorio = input(false);
  readonly mostrarValido = input(false);

  private readonly cdr = inject(ChangeDetectorRef);
  /** Cambia cada vez que el control emite un evento (para refrescar la vista). */
  private readonly version = signal(0);

  constructor() {
    effect((onCleanup) => {
      const ctrl = this.control();
      if (!ctrl) return;
      const sub = ctrl.events.subscribe(() => {
        this.version.update((v) => v + 1);
        this.cdr.markForCheck();
      });
      onCleanup(() => sub.unsubscribe());
    });
  }

  protected readonly mostrarError = computed(() => {
    this.version();
    const c = this.control();
    return !!c && c.invalid && (c.touched || c.dirty) && !c.pending;
  });

  protected readonly verificando = computed(() => {
    this.version();
    return !!this.control()?.pending;
  });

  protected readonly valido = computed(() => {
    this.version();
    const c = this.control();
    return this.mostrarValido() && !!c && c.valid && c.dirty;
  });

  protected readonly mensaje = computed(() => {
    this.version();
    const errores = this.control()?.errors;
    if (!errores) return '';
    const clave = Object.keys(errores)[0];
    return this.mensajes()[clave] ?? MENSAJES_BASE[clave] ?? 'Valor no válido.';
  });
}
