import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MedicoRequest } from '../../../core/models/models';
import { MedicoService } from '../../../core/services/medico.service';
import { cedulaDisponibleValidator, soloLetrasValidator } from '../../../core/validators/validators';
import { Boton } from '../../atoms/boton/boton';
import { CampoFormulario } from '../../molecules/campo-formulario/campo-formulario';

export const ESPECIALIDADES = [
  'Medicina General',
  'Pediatría',
  'Cardiología',
  'Dermatología',
  'Ginecología',
  'Neurología',
  'Odontología',
];

/** ORGANISMO: formulario reactivo de registro de médico. */
@Component({
  selector: 'app-formulario-medico',
  imports: [ReactiveFormsModule, CampoFormulario, Boton],
  templateUrl: './formulario-medico.html',
})
export class FormularioMedico {
  readonly cargando = input(false);
  readonly guardar = output<MedicoRequest>();
  readonly cancelar = output<void>();

  private readonly medicoService = inject(MedicoService);
  protected readonly especialidades = ESPECIALIDADES;

  protected readonly form = inject(FormBuilder).nonNullable.group({
    cedula: [
      '',
      {
        validators: [Validators.required, Validators.pattern(/^\d{6,10}$/)],
        // Consumo REACTIVO del servicio: ¿la cédula ya está registrada?
        asyncValidators: [cedulaDisponibleValidator((c) => this.medicoService.existeCedula(c))],
      },
    ],
    nombres: ['', [Validators.required, Validators.maxLength(60), soloLetrasValidator]],
    apellidos: ['', [Validators.required, Validators.maxLength(60), soloLetrasValidator]],
    especialidad: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(120)]],
    telefono: ['', [Validators.required, Validators.pattern(/^\d{7,10}$/)]],
    consultorio: ['', [Validators.maxLength(20)]],
  });

  protected onSubmit(): void {
    if (this.form.invalid || this.form.pending) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();
    this.guardar.emit({ ...v, consultorio: v.consultorio || null });
  }

  /** La página lo llama si quiere limpiar el formulario. */
  reiniciar(): void {
    this.form.reset();
  }
}
