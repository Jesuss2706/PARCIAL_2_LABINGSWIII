import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Cita } from '../../../core/models/models';
import { CitaService } from '../../../core/services/cita.service';
import { mensajeError } from '../../../core/utils/utils';
import { Alerta } from '../../../components/atoms/alerta/alerta';
import { Buscador } from '../../../components/molecules/buscador/buscador';
import { TarjetaDato } from '../../../components/molecules/tarjeta-dato/tarjeta-dato';
import { ListadoCitas } from '../../../components/organisms/listado-citas/listado-citas';
import { PlantillaPrincipal } from '../../../components/templates/plantilla-principal/plantilla-principal';

/** PÁGINA (ADMIN): listar las citas de todos los pacientes. */
@Component({
  selector: 'app-admin-citas',
  imports: [PlantillaPrincipal, ListadoCitas, TarjetaDato, Buscador, Alerta, RouterLink],
  templateUrl: './admin-citas.html',
})
export class AdminCitas {
  private readonly citaService = inject(CitaService);

  protected readonly citas = signal<Cita[]>([]);
  protected readonly cargando = signal(true);
  protected readonly error = signal<string | null>(null);
  protected readonly exito = signal<string | null>(history.state?.mensaje ?? null);
  protected readonly busqueda = signal('');

  protected readonly filtradas = computed(() => {
    const q = this.busqueda().trim().toLowerCase();
    if (!q) return this.citas();
    return this.citas().filter((c) =>
      [c.pacienteNombre, c.pacienteCedula, c.medicoNombre, c.especialidad, c.motivo].some((v) =>
        v?.toLowerCase().includes(q),
      ),
    );
  });

  protected readonly proximas = computed(
    () => this.citas().filter((c) => c.estado === 'PROGRAMADA' && new Date(c.fechaHora).getTime() > Date.now()).length,
  );
  protected readonly pacientesConCita = computed(() => new Set(this.citas().map((c) => c.pacienteId)).size);
  protected readonly medicosConCita = computed(() => new Set(this.citas().map((c) => c.medicoId)).size);

  constructor() {
    this.citaService.listarTodas().subscribe({
      next: (c) => {
        this.citas.set(c);
        this.cargando.set(false);
      },
      error: (e) => {
        this.error.set(mensajeError(e));
        this.cargando.set(false);
      },
    });
  }
}
