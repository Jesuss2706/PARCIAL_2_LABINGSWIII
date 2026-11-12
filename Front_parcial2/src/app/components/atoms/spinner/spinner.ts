import { Component, input } from '@angular/core';

/** ÁTOMO: indicador de carga. */
@Component({
  selector: 'app-spinner',
  template: `
    <div class="d-flex flex-column align-items-center justify-content-center gap-2 py-4" role="status">
      <span class="spinner-border" style="color: var(--pa-navy-500)" aria-hidden="true"></span>
      <span class="small pa-muted">{{ texto() }}</span>
    </div>
  `,
})
export class Spinner {
  readonly texto = input('Cargando…');
}
