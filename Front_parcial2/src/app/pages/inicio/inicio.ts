import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Medico } from '../../core/models/models';
import { MedicoService } from '../../core/services/medico.service';
import { GaleriaMedicos } from '../../components/organisms/galeria-medicos/galeria-medicos';
import { Portada } from '../../components/organisms/portada/portada';
import { PlantillaPrincipal } from '../../components/templates/plantilla-principal/plantilla-principal';

/** PÁGINA (pública): inicio. */
@Component({
  selector: 'app-inicio',
  imports: [PlantillaPrincipal, Portada, GaleriaMedicos, RouterLink],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css',
})
export class Inicio {
  private readonly medicoService = inject(MedicoService);

  protected readonly medicos = signal<Medico[]>([]);
  protected readonly cargando = signal(true);

  protected readonly servicios = [
    { icono: 'bi-heart-pulse', titulo: 'Medicina general', texto: 'Consulta, control y prevención para toda la familia.' },
    { icono: 'bi-activity', titulo: 'Especialistas', texto: 'Cardiología, pediatría, dermatología, ginecología y más.' },
    { icono: 'bi-clipboard2-pulse', titulo: 'Seguimiento', texto: 'Tu historial de citas siempre disponible en línea.' },
    { icono: 'bi-hospital', titulo: 'Urgencias 24/7', texto: 'Atención inmediata cuando más lo necesitas.' },
  ];

  constructor() {
    this.medicoService.listarPublico().subscribe({
      next: (m) => {
        this.medicos.set(m);
        this.cargando.set(false);
      },
      error: () => this.cargando.set(false),
    });
  }
}
