import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { PlantillaPrincipal } from '../../components/templates/plantilla-principal/plantilla-principal';

/** PÁGINA: se muestra cuando el Guard 2 bloquea una ruta por rol. */
@Component({
  selector: 'app-acceso-denegado',
  imports: [PlantillaPrincipal, RouterLink],
  template: `
    <app-plantilla-principal ancho="angosto">
      <div class="pa-card p-5 text-center">
        <span class="pa-state-icon mb-3"><i class="bi bi-shield-lock"></i></span>
        <p class="pa-eyebrow mb-2">Error 403</p>
        <h1 class="pa-display mb-3" style="font-size: 2rem">Acceso denegado</h1>
        <p class="pa-lead mx-auto mb-4">Tu rol no tiene permiso para ver esta página.</p>
        <a class="btn btn-pa-dark" [routerLink]="auth.inicioPorRol()">Volver a mi panel</a>
      </div>
    </app-plantilla-principal>
  `,
  styles: `
    .pa-state-icon { display: inline-grid; place-items: center; width: 4rem; height: 4rem; border-radius: 999px;
      background: #f6e3e3; color: #8a2f2f; font-size: 1.7rem; }
  `,
})
export class AccesoDenegado {
  protected readonly auth = inject(AuthService);
}
