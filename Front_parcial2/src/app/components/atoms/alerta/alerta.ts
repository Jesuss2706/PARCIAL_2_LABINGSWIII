import { Component, computed, input, output } from '@angular/core';

/** ÁTOMO: mensaje de alerta (éxito, error, aviso, info). */
@Component({
  selector: 'app-alerta',
  templateUrl: './alerta.html',
  styleUrl: './alerta.css',
})
export class Alerta {
  readonly tipo = input<'success' | 'danger' | 'warning' | 'info'>('info');
  readonly cerrable = input(false);
  readonly cerrar = output<void>();

  protected readonly icono = computed(
    () =>
      ({
        success: 'bi-check-circle-fill',
        danger: 'bi-exclamation-octagon-fill',
        warning: 'bi-exclamation-triangle-fill',
        info: 'bi-info-circle-fill',
      })[this.tipo()],
  );
}
