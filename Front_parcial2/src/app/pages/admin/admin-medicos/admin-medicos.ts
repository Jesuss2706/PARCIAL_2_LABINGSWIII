import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Medico } from '../../../core/models/models';
import { MedicoService } from '../../../core/services/medico.service';
import { mensajeError } from '../../../core/utils/utils';
import { Alerta } from '../../../components/atoms/alerta/alerta';
import { Buscador } from '../../../components/molecules/buscador/buscador';
import { ListadoMedicos } from '../../../components/organisms/listado-medicos/listado-medicos';
import { PlantillaPrincipal } from '../../../components/templates/plantilla-principal/plantilla-principal';

/** PÁGINA (ADMIN): listar médicos. */
@Component({
  selector: 'app-admin-medicos',
  imports: [PlantillaPrincipal, ListadoMedicos, Buscador, Alerta, RouterLink],
  template: `
    <app-plantilla-principal titulo="Médicos" eyebrow="Administración" icono="bi-person-badge"
                             subtitulo="Profesionales registrados en la clínica.">
      @if (exito()) {
        <app-alerta tipo="success" [cerrable]="true" (cerrar)="exito.set(null)">{{ exito() }}</app-alerta>
      }
      @if (error()) {
        <app-alerta tipo="danger">{{ error() }}</app-alerta>
      }
      <app-listado-medicos [medicos]="filtrados()" [cargando]="cargando()">
        <div class="d-flex flex-column flex-sm-row gap-2">
          <app-buscador placeholder="Buscar por nombre, cédula…" [(texto)]="busqueda" />
          <a class="btn btn-pa btn-sm text-nowrap" routerLink="/admin/medicos/nuevo">
            <i class="bi bi-plus-lg me-1"></i>Registrar médico
          </a>
        </div>
      </app-listado-medicos>
    </app-plantilla-principal>
  `,
})
export class AdminMedicos {
  protected readonly medicos = signal<Medico[]>([]);
  protected readonly cargando = signal(true);
  protected readonly error = signal<string | null>(null);
  protected readonly exito = signal<string | null>(history.state?.mensaje ?? null);
  protected readonly busqueda = signal('');

  protected readonly filtrados = computed(() => {
    const q = this.busqueda().trim().toLowerCase();
    return q
      ? this.medicos().filter((m) =>
          [m.nombreCompleto, m.cedula, m.especialidad, m.email].some((v) => v?.toLowerCase().includes(q)),
        )
      : this.medicos();
  });

  constructor() {
    inject(MedicoService)
      .listar()
      .subscribe({
        next: (m) => {
          this.medicos.set(m);
          this.cargando.set(false);
        },
        error: (e) => {
          this.error.set(mensajeError(e));
          this.cargando.set(false);
        },
      });
  }
}
