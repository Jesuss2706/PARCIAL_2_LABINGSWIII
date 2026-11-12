import { Component, input, model } from '@angular/core';

/** MOLÉCULA: campo de búsqueda con ícono (filtra listados). */
@Component({
  selector: 'app-buscador',
  template: `
    <div class="pa-search">
      <i class="bi bi-search pa-search-icon" aria-hidden="true"></i>
      <input class="form-control form-control-sm" type="search" [placeholder]="placeholder()"
             [attr.aria-label]="placeholder()" [value]="texto()" (input)="texto.set($any($event.target).value)">
    </div>
  `,
  styles: `
    .pa-search { position: relative; min-width: 15rem; }
    .pa-search .form-control { padding-left: 2.1rem; border-radius: 999px; }
    .pa-search-icon { position: absolute; left: .85rem; top: 50%; transform: translateY(-50%); color: var(--pa-muted); font-size: .8rem; }
  `,
})
export class Buscador {
  readonly texto = model('');
  readonly placeholder = input('Buscar…');
}
