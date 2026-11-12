import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Logo } from '../../atoms/logo/logo';

/** ORGANISMO: footer de la clínica. */
@Component({
  selector: 'app-pie-pagina',
  imports: [RouterLink, Logo],
  templateUrl: './pie-pagina.html',
  styleUrl: './pie-pagina.css',
})
export class PiePagina {
  protected readonly anio = new Date().getFullYear();
}
