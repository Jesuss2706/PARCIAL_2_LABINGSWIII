import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MedicoRequest } from '../../../core/models/models';
import { MedicoService } from '../../../core/services/medico.service';
import { mensajeError } from '../../../core/utils/utils';
import { Alerta } from '../../../components/atoms/alerta/alerta';
import { FormularioMedico } from '../../../components/organisms/formulario-medico/formulario-medico';
import { PlantillaPrincipal } from '../../../components/templates/plantilla-principal/plantilla-principal';

/** PÁGINA (ADMIN): registrar médico. */
@Component({
  selector: 'app-admin-medico-nuevo',
  imports: [PlantillaPrincipal, FormularioMedico, Alerta],
  template: `
    <app-plantilla-principal titulo="Registrar médico" eyebrow="Administración" icono="bi-person-plus"
                             subtitulo="Agrega un nuevo profesional al equipo de la clínica." ancho="angosto">
      @if (error()) {
        <app-alerta tipo="danger" [cerrable]="true" (cerrar)="error.set(null)">{{ error() }}</app-alerta>
      }
      <div class="pa-card p-4 p-lg-5">
        <app-formulario-medico [cargando]="guardando()" (guardar)="registrar($event)" (cancelar)="volver()" />
      </div>
    </app-plantilla-principal>
  `,
})
export class AdminMedicoNuevo {
  private readonly medicoService = inject(MedicoService);
  private readonly router = inject(Router);

  protected readonly guardando = signal(false);
  protected readonly error = signal<string | null>(null);

  protected registrar(medico: MedicoRequest): void {
    this.guardando.set(true);
    this.error.set(null);
    this.medicoService.registrar(medico).subscribe({
      next: (m) => this.router.navigate(['/admin/medicos'], { state: { mensaje: `Médico ${m.nombreCompleto} registrado.` } }),
      error: (e) => {
        this.error.set(mensajeError(e));
        this.guardando.set(false);
      },
    });
  }

  protected volver(): void {
    this.router.navigate(['/admin/medicos']);
  }
}
