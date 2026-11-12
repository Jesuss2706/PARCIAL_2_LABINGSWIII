import { Component, input } from '@angular/core';
import { Columna, Tabla } from '../../atoms/tabla/tabla';

/**
 * MOLÉCULA: combina el átomo tabla con un título (y subtítulo / contador).
 * Las acciones del encabezado se proyectan con el atributo [acciones].
 */
@Component({
  selector: 'app-tabla-con-titulo',
  imports: [Tabla],
  templateUrl: './tabla-con-titulo.html',
  styleUrl: './tabla-con-titulo.css',
})
export class TablaConTitulo {
  readonly titulo = input.required<string>();
  readonly subtitulo = input<string | null>(null);
  readonly icono = input('bi-table');
  readonly columnas = input.required<Columna[]>();
  readonly filas = input<any[]>([]);
  readonly cargando = input(false);
  readonly mensajeVacio = input('No hay registros para mostrar.');
}
