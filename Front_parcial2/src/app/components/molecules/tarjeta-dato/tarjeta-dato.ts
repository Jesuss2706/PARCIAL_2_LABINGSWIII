import { Component, input } from '@angular/core';

/** MOLÉCULA: ícono + valor + etiqueta (métricas). */
@Component({
  selector: 'app-tarjeta-dato',
  template: `
    <div class="pa-card pa-card-hover pa-metric h-100">
      <span class="pa-metric-icon"><i class="bi" [class]="icono()" aria-hidden="true"></i></span>
      <div>
        <p class="pa-metric-value mb-0">{{ valor() }}</p>
        <p class="pa-metric-label mb-0">{{ etiqueta() }}</p>
      </div>
    </div>
  `,
  styles: `
    .pa-metric { display: flex; align-items: center; gap: .9rem; padding: 1rem 1.1rem; }
    .pa-metric-icon {
      display: inline-grid; place-items: center; flex: none;
      width: 2.6rem; height: 2.6rem; border-radius: .75rem;
      background: var(--pa-gold-100); color: var(--pa-gold-600); font-size: 1.1rem;
    }
    .pa-metric-value { font-family: "Newsreader", Georgia, serif; font-size: 1.7rem; line-height: 1; color: var(--pa-navy-900); }
    .pa-metric-label { font-size: .78rem; color: var(--pa-muted); }
  `,
})
export class TarjetaDato {
  readonly icono = input.required<string>();
  readonly valor = input.required<string | number>();
  readonly etiqueta = input.required<string>();
}
