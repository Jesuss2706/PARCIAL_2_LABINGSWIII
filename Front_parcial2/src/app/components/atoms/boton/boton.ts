import { Component, input } from '@angular/core';

/** ÁTOMO: botón con las variantes de la marca y estado "cargando". */
@Component({
  selector: 'app-boton',
  templateUrl: './boton.html',
  host: { '[class.d-block]': 'bloque()' },
})
export class Boton {
  readonly variante = input<'pa' | 'dark' | 'outline'>('pa');
  readonly tipo = input<'button' | 'submit'>('button');
  readonly cargando = input(false);
  readonly deshabilitado = input(false);
  readonly bloque = input(false);
  readonly pequeno = input(false);
  readonly icono = input<string | null>(null);
}
