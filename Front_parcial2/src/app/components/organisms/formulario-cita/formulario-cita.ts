import { Component, computed, inject, input, output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CitaRequest, Medico, Paciente } from '../../../core/models/models';
import { fechaFuturaValidator } from '../../../core/validators/validators';
import { Boton } from '../../atoms/boton/boton';
import { CampoFormulario } from '../../molecules/campo-formulario/campo-formulario';

/** ORGANISMO: formulario reactivo para crear una cita médica. */
@Component({
  selector: 'app-formulario-cita',
  imports: [ReactiveFormsModule, CampoFormulario, Boton],
  templateUrl: './formulario-cita.html',
  styleUrl: './formulario-cita.css',
})
export class FormularioCita {
  readonly pacientes = input<Paciente[]>([]);
  readonly medicos = input<Medico[]>([]);
  readonly cargando = input(false);
  readonly guardar = output<CitaRequest>();
  readonly cancelar = output<void>();

  /** Mínimo para el input datetime-local: ahora, en hora local. */
  protected readonly minimo = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16);

  protected readonly form = inject(FormBuilder).group({
    pacienteId: [null as number | null, [Validators.required]],
    medicoId: [null as number | null, [Validators.required]],
    fechaHora: ['', [Validators.required, fechaFuturaValidator]],
    motivo: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(255)]],
  });

  private readonly valores = toSignal(this.form.valueChanges, { initialValue: this.form.value });

  /** Resumen en vivo de la cita que se está creando. */
  protected readonly pacienteSel = computed(() => this.pacientes().find((p) => p.id === Number(this.valores().pacienteId)));
  protected readonly medicoSel = computed(() => this.medicos().find((m) => m.id === Number(this.valores().medicoId)));
  protected readonly largoMotivo = computed(() => (this.valores().motivo ?? '').length);

  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const v = this.form.getRawValue();
    this.guardar.emit({
      pacienteId: Number(v.pacienteId),
      medicoId: Number(v.medicoId),
      fechaHora: v.fechaHora!.length === 16 ? `${v.fechaHora}:00` : v.fechaHora!,
      motivo: v.motivo!.trim(),
    });
  }

  reiniciar(): void {
    this.form.reset();
  }
}
