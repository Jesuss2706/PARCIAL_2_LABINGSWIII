import { Component, computed, input, signal } from '@angular/core';
import { Medico } from '../../../core/models/models';
import { Spinner } from '../../atoms/spinner/spinner';
import { TarjetaMedico } from '../../molecules/tarjeta-medico/tarjeta-medico';

/** ORGANISMO: galería pública de médicos con filtro por especialidad. */
@Component({
  selector: 'app-galeria-medicos',
  imports: [TarjetaMedico, Spinner],
  templateUrl: './galeria-medicos.html',
  styleUrl: './galeria-medicos.css',
})
export class GaleriaMedicos {
  readonly medicos = input<Medico[]>([]);
  readonly cargando = input(false);
  readonly conFiltro = input(true);
  readonly limite = input<number | null>(null);

  protected readonly filtro = signal<string | null>(null);

  protected readonly especialidades = computed(() =>
    [...new Set(this.medicos().map((m) => m.especialidad))].sort(),
  );

  protected readonly visibles = computed(() => {
    const f = this.filtro();
    const lista = f ? this.medicos().filter((m) => m.especialidad === f) : this.medicos();
    const lim = this.limite();
    return lim ? lista.slice(0, lim) : lista;
  });
}
