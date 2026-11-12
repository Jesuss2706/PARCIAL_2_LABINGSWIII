import { Component, input } from '@angular/core';

/** ÁTOMO: logo de la clínica (isotipo + nombre). */
@Component({
  selector: 'app-logo',
  templateUrl: './logo.html',
  styleUrl: './logo.css',
})
export class Logo {
  readonly mostrarTexto = input(true);
  readonly tamano = input<'sm' | 'md' | 'lg'>('md');
}
