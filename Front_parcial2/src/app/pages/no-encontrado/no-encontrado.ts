import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PlantillaPrincipal } from '../../components/templates/plantilla-principal/plantilla-principal';

/** PÁGINA: ruta inexistente. */
@Component({
  selector: 'app-no-encontrado',
  imports: [PlantillaPrincipal, RouterLink],
  template: `
    <app-plantilla-principal ancho="angosto">
      <div class="pa-card p-5 text-center">
        <span class="pa-state-icon mb-3"><i class="bi bi-signpost-split"></i></span>
        <p class="pa-eyebrow mb-2">Error 404</p>
        <h1 class="pa-display mb-3" style="font-size: 2rem">Página no encontrada</h1>
        <p class="pa-lead mx-auto mb-4">La dirección que buscas no existe o fue movida.</p>
        <a class="btn btn-pa" routerLink="/">Ir al inicio</a>
      </div>
    </app-plantilla-principal>
  `,
  styles: `
    .pa-state-icon { display: inline-grid; place-items: center; width: 4rem; height: 4rem; border-radius: 999px;
      background: var(--pa-gold-100); color: var(--pa-gold-600); font-size: 1.7rem; }
  `,
})
export class NoEncontrado {}
