import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Paciente } from '../../../core/models/models';
import { PacienteService } from '../../../core/services/paciente.service';
import { mensajeError } from '../../../core/utils/utils';
import { Alerta } from '../../../components/atoms/alerta/alerta';
import { Buscador } from '../../../components/molecules/buscador/buscador';
import { ListadoPacientes } from '../../../components/organisms/listado-pacientes/listado-pacientes';
import { PlantillaPrincipal } from '../../../components/templates/plantilla-principal/plantilla-principal';

/** PÁGINA (ADMIN): listar pacientes. */
@Component({
  selector: 'app-admin-pacientes',
  imports: [PlantillaPrincipal, ListadoPacientes, Buscador, Alerta, RouterLink],
  template: `
    <app-plantilla-principal titulo="Pacientes" eyebrow="Administración" icono="bi-people"
                             subtitulo="Pacientes registrados y con acceso al portal.">
      @if (exito()) {
        <app-alerta tipo="success" [cerrable]="true" (cerrar)="exito.set(null)">{{ exito() }}</app-alerta>
      }
      @if (error()) {
        <app-alerta tipo="danger">{{ error() }}</app-alerta>
      }
      <app-listado-pacientes [pacientes]="filtrados()" [cargando]="cargando()">
        <div class="d-flex flex-column flex-sm-row gap-2">
          <app-buscador placeholder="Buscar por nombre, cédula…" [(texto)]="busqueda" />
          <a class="btn btn-pa btn-sm text-nowrap" routerLink="/admin/pacientes/nuevo">
            <i class="bi bi-plus-lg me-1"></i>Registrar paciente
          </a>
        </div>
      </app-listado-pacientes>
    </app-plantilla-principal>
  `,
})
export class AdminPacientes {
  protected readonly pacientes = signal<Paciente[]>([]);
  protected readonly cargando = signal(true);
  protected readonly error = signal<string | null>(null);
  protected readonly exito = signal<string | null>(history.state?.mensaje ?? null);
  protected readonly busqueda = signal('');

  protected readonly filtrados = computed(() => {
    const q = this.busqueda().trim().toLowerCase();
    return q
      ? this.pacientes().filter((p) =>
          [p.nombreCompleto, p.cedula, p.email, p.telefono].some((v) => v?.toLowerCase().includes(q)),
        )
      : this.pacientes();
  });

  constructor() {
    inject(PacienteService)
      .listar()
      .subscribe({
        next: (p) => {
          this.pacientes.set(p);
          this.cargando.set(false);
        },
        error: (e) => {
          this.error.set(mensajeError(e));
          this.cargando.set(false);
        },
      });
  }
}
