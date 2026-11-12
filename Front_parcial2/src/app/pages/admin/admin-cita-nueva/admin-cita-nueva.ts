import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin } from 'rxjs';
import { CitaRequest, Medico, Paciente } from '../../../core/models/models';
import { CitaService } from '../../../core/services/cita.service';
import { MedicoService } from '../../../core/services/medico.service';
import { PacienteService } from '../../../core/services/paciente.service';
import { mensajeError } from '../../../core/utils/utils';
import { Alerta } from '../../../components/atoms/alerta/alerta';
import { Spinner } from '../../../components/atoms/spinner/spinner';
import { FormularioCita } from '../../../components/organisms/formulario-cita/formulario-cita';
import { PlantillaPrincipal } from '../../../components/templates/plantilla-principal/plantilla-principal';

/** PÁGINA (ADMIN): crear cita médica. */
@Component({
  selector: 'app-admin-cita-nueva',
  imports: [PlantillaPrincipal, FormularioCita, Alerta, Spinner],
  template: `
    <app-plantilla-principal titulo="Nueva cita" eyebrow="Administración" icono="bi-calendar-plus"
                             subtitulo="Asigna una cita a un paciente con el médico y la hora que necesite.">
      @if (error()) {
        <app-alerta tipo="danger" [cerrable]="true" (cerrar)="error.set(null)">{{ error() }}</app-alerta>
      }
      <div class="pa-card p-4 p-lg-5">
        @if (cargandoDatos()) {
          <app-spinner texto="Cargando pacientes y médicos…" />
        } @else {
          <app-formulario-cita [pacientes]="pacientes()" [medicos]="medicos()" [cargando]="guardando()"
                               (guardar)="crear($event)" (cancelar)="volver()" />
        }
      </div>
    </app-plantilla-principal>
  `,
})
export class AdminCitaNueva {
  private readonly citaService = inject(CitaService);
  private readonly router = inject(Router);

  protected readonly pacientes = signal<Paciente[]>([]);
  protected readonly medicos = signal<Medico[]>([]);
  protected readonly cargandoDatos = signal(true);
  protected readonly guardando = signal(false);
  protected readonly error = signal<string | null>(null);

  constructor() {
    forkJoin({
      pacientes: inject(PacienteService).listar(),
      medicos: inject(MedicoService).listar(),
    }).subscribe({
      next: ({ pacientes, medicos }) => {
        this.pacientes.set(pacientes);
        this.medicos.set(medicos);
        this.cargandoDatos.set(false);
      },
      error: (e) => {
        this.error.set(mensajeError(e));
        this.cargandoDatos.set(false);
      },
    });
  }

  protected crear(cita: CitaRequest): void {
    this.guardando.set(true);
    this.error.set(null);
    this.citaService.crear(cita).subscribe({
      next: (c) =>
        this.router.navigate(['/admin/citas'], {
          state: { mensaje: `Cita creada para ${c.pacienteNombre} con ${c.medicoNombre}.` },
        }),
      error: (e) => {
        this.error.set(mensajeError(e));
        this.guardando.set(false);
      },
    });
  }

  protected volver(): void {
    this.router.navigate(['/admin/citas']);
  }
}
