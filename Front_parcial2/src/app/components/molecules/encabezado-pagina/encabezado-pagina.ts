import { Component, input } from '@angular/core';

/** MOLÉCULA: eyebrow + título + subtítulo de una página interna. */
@Component({
  selector: 'app-encabezado-pagina',
  templateUrl: './encabezado-pagina.html',
  styleUrl: './encabezado-pagina.css',
})
export class EncabezadoPagina {
  readonly eyebrow = input<string | null>(null);
  readonly titulo = input.required<string>();
  readonly subtitulo = input<string | null>(null);
  readonly icono = input<string | null>(null);
}
