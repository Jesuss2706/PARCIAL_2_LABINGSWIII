import { Component, computed, inject, signal } from '@angular/core';
import { Cita } from '../../core/models/models';
import { AuthService } from '../../core/services/auth.service';
import { CitaService } from '../../core/services/cita.service';
import { formatearFecha, formatearHora, mensajeError } from '../../core/utils/utils';
import { Alerta } from '../../components/atoms/alerta/alerta';
import { TarjetaDato } from '../../components/molecules/tarjeta-dato/tarjeta-dato';
import { ListadoCitas } from '../../components/organisms/listado-citas/listado-citas';
import { PlantillaPrincipal } from '../../components/templates/plantilla-principal/plantilla-principal';

/** PÁGINA (PACIENTE): listar sus citas médicas. */
@Component({
  selector: 'app-mis-citas',
  imports: [PlantillaPrincipal, ListadoCitas, TarjetaDato, Alerta],
  templateUrl: './mis-citas.html',
  styleUrl: './mis-citas.css',
})
export class MisCitas {
  private readonly citaService = inject(CitaService);
  protected readonly auth = inject(AuthService);

  protected readonly citas = signal<Cita[]>([]);
  protected readonly cargando = signal(true);
  protected readonly error = signal<string | null>(null);

  protected readonly proximas = computed(() =>
    this.citas()
      .filter((c) => c.estado === 'PROGRAMADA' && new Date(c.fechaHora).getTime() > Date.now())
      .sort((a, b) => a.fechaHora.localeCompare(b.fechaHora)),
  );
  protected readonly siguiente = computed(() => this.proximas()[0] ?? null);
  protected readonly atendidas = computed(() => this.citas().filter((c) => c.estado === 'ATENDIDA').length);

  protected readonly fecha = formatearFecha;
  protected readonly hora = formatearHora;

  constructor() {
    this.citaService.misCitas().subscribe({
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
