import { Component, computed, input } from '@angular/core';
import { Medico } from '../../../core/models/models';

const ICONOS: Record<string, string> = {
  'medicina general': 'bi-heart-pulse',
  pediatría: 'bi-balloon-heart',
  cardiología: 'bi-activity',
  dermatología: 'bi-droplet-half',
  ginecología: 'bi-gender-female',
  neurología: 'bi-lightning-charge',
  odontología: 'bi-emoji-smile',
};

/** MOLÉCULA: tarjeta con la información pública de un médico. */
@Component({
  selector: 'app-tarjeta-medico',
  templateUrl: './tarjeta-medico.html',
  styleUrl: './tarjeta-medico.css',
})
export class TarjetaMedico {
  readonly medico = input.required<Medico>();

  protected readonly icono = computed(
    () => ICONOS[this.medico().especialidad.toLowerCase()] ?? 'bi-clipboard2-pulse',
  );
  protected readonly iniciales = computed(() => {
    const m = this.medico();
    return (m.nombres.charAt(0) + m.apellidos.charAt(0)).toUpperCase();
  });
}
