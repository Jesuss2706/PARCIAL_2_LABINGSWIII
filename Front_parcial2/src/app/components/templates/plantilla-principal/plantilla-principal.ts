import { Component, input } from '@angular/core';
import { EncabezadoPagina } from '../../molecules/encabezado-pagina/encabezado-pagina';
import { Encabezado } from '../../organisms/encabezado/encabezado';
import { PiePagina } from '../../organisms/pie-pagina/pie-pagina';

/**
 * PLANTILLA: estructura común de TODAS las páginas.
 * Header + menú · encabezado de página (opcional) · contenido · footer.
 * Es responsive: se adapta a móvil, tableta y escritorio.
 */
@Component({
  selector: 'app-plantilla-principal',
  imports: [Encabezado, EncabezadoPagina, PiePagina],
  templateUrl: './plantilla-principal.html',
  styleUrl: './plantilla-principal.css',
})
export class PlantillaPrincipal {
  readonly titulo = input<string | null>(null);
  readonly eyebrow = input<string | null>(null);
  readonly subtitulo = input<string | null>(null);
  readonly icono = input<string | null>(null);
  /** 'completo' = sin contenedor (secciones a todo el ancho), 'normal' o 'angosto'. */
  readonly ancho = input<'completo' | 'normal' | 'angosto'>('normal');
}
