import { Component, inject, input, output, signal } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { PacienteRequest } from '../../../core/models/models';
import { AuthService } from '../../../core/services/auth.service';
import { PacienteService } from '../../../core/services/paciente.service';
import { cedulaDisponibleValidator, fechaPasadaValidator, soloLetrasValidator } from '../../../core/validators/validators';
import { Boton } from '../../atoms/boton/boton';
import { CampoFormulario } from '../../molecules/campo-formulario/campo-formulario';

/** Validador de grupo: la confirmación debe coincidir con la contraseña. */
function clavesIguales(group: AbstractControl): ValidationErrors | null {
  const clave = group.get('password')?.value;
  const confirmar = group.get('confirmar');
  if (!confirmar) return null;
  const errores = { ...(confirmar.errors ?? {}) };
  if (confirmar.value && clave !== confirmar.value) {
    errores['noCoincide'] = true;
  } else {
    delete errores['noCoincide'];
  }
  confirmar.setErrors(Object.keys(errores).length ? errores : null, { emitEvent: false });
  return null;
}

/** ORGANISMO: formulario reactivo de registro de paciente. */
@Component({
  selector: 'app-formulario-paciente',
  imports: [ReactiveFormsModule, CampoFormulario, Boton],
  templateUrl: './formulario-paciente.html',
})
export class FormularioPaciente {
  readonly cargando = input(false);
  /** true = registro público (usa el endpoint público para validar la cédula). */
  readonly publico = input(false);
  readonly textoBoton = input('Registrar paciente');
  readonly guardar = output<PacienteRequest>();
  readonly cancelar = output<void>();

  private readonly pacienteService = inject(PacienteService);
  private readonly authService = inject(AuthService);
  protected readonly hoy = new Date().toISOString().slice(0, 10);
  protected readonly verClave = signal(false);

  protected readonly form = inject(FormBuilder).nonNullable.group(
    {
      cedula: [
        '',
        {
          validators: [Validators.required, Validators.pattern(/^\d{6,10}$/)],
          // Consumo REACTIVO del servicio: ¿la cédula ya está registrada?
          asyncValidators: [
            cedulaDisponibleValidator((c) =>
              this.publico() ? this.authService.existeCedula(c) : this.pacienteService.existeCedula(c),
            ),
          ],
        },
      ],
      nombres: ['', [Validators.required, Validators.maxLength(60), soloLetrasValidator]],
      apellidos: ['', [Validators.required, Validators.maxLength(60), soloLetrasValidator]],
      fechaNacimiento: ['', [Validators.required, fechaPasadaValidator]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(120)]],
      telefono: ['', [Validators.required, Validators.pattern(/^\d{7,10}$/)]],
      direccion: ['', [Validators.maxLength(150)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmar: ['', [Validators.required]],
    },
    { validators: clavesIguales },
  );

  protected onSubmit(): void {
    if (this.form.invalid || this.form.pending) {
      this.form.markAllAsTouched();
      return;
    }
    const { confirmar, ...datos } = this.form.getRawValue();
    this.guardar.emit({ ...datos, direccion: datos.direccion || null });
  }

  reiniciar(): void {
    this.form.reset();
  }
}
