import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { PacienteRequest } from '../../../core/models/models';
import { PacienteService } from '../../../core/services/paciente.service';
import { mensajeError } from '../../../core/utils/utils';
import { Alerta } from '../../../components/atoms/alerta/alerta';
import { FormularioPaciente } from '../../../components/organisms/formulario-paciente/formulario-paciente';
import { PlantillaPrincipal } from '../../../components/templates/plantilla-principal/plantilla-principal';

/** PÁGINA (ADMIN): registrar paciente. */
@Component({
  selector: 'app-admin-paciente-nuevo',
  imports: [PlantillaPrincipal, FormularioPaciente, Alerta],
  template: `
    <app-plantilla-principal titulo="Registrar paciente" eyebrow="Administración" icono="bi-person-plus"
                             subtitulo="El paciente podrá iniciar sesión con su cédula y la contraseña asignada." ancho="angosto">
      @if (error()) {
        <app-alerta tipo="danger" [cerrable]="true" (cerrar)="error.set(null)">{{ error() }}</app-alerta>
      }
      <div class="pa-card p-4 p-lg-5">
        <app-formulario-paciente [cargando]="guardando()" (guardar)="registrar($event)" (cancelar)="volver()" />
      </div>
    </app-plantilla-principal>
  `,
})
export class AdminPacienteNuevo {
  private readonly pacienteService = inject(PacienteService);
  private readonly router = inject(Router);

  protected readonly guardando = signal(false);
  protected readonly error = signal<string | null>(null);

  protected registrar(paciente: PacienteRequest): void {
    this.guardando.set(true);
    this.error.set(null);
    this.pacienteService.registrar(paciente).subscribe({
      next: (p) =>
        this.router.navigate(['/admin/pacientes'], { state: { mensaje: `Paciente ${p.nombreCompleto} registrado.` } }),
      error: (e) => {
        this.error.set(mensajeError(e));
        this.guardando.set(false);
      },
    });
  }

  protected volver(): void {
    this.router.navigate(['/admin/pacientes']);
  }
}
