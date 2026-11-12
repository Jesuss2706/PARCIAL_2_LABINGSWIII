import { Component, inject, signal } from '@angular/core';
import { Medico } from '../../core/models/models';
import { MedicoService } from '../../core/services/medico.service';
import { mensajeError } from '../../core/utils/utils';
import { Alerta } from '../../components/atoms/alerta/alerta';
import { GaleriaMedicos } from '../../components/organisms/galeria-medicos/galeria-medicos';
import { ListadoMedicos } from '../../components/organisms/listado-medicos/listado-medicos';
import { PlantillaPrincipal } from '../../components/templates/plantilla-principal/plantilla-principal';

/** PÁGINA (pública): listar médicos. */
@Component({
  selector: 'app-medicos',
  imports: [PlantillaPrincipal, GaleriaMedicos, ListadoMedicos, Alerta],
  templateUrl: './medicos.html',
})
export class Medicos {
  private readonly medicoService = inject(MedicoService);

  protected readonly medicos = signal<Medico[]>([]);
  protected readonly cargando = signal(true);
  protected readonly error = signal<string | null>(null);
  protected readonly vista = signal<'tarjetas' | 'tabla'>('tarjetas');

  constructor() {
    this.medicoService.listarPublico().subscribe({
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
