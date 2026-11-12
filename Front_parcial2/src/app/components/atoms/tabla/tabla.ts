import { Component, computed, input } from '@angular/core';
import { formatearFecha, formatearHora } from '../../../core/utils/utils';

export type TipoColumna = 'texto' | 'fecha' | 'hora' | 'fecha-hora' | 'estado';

export interface Columna<T = any> {
  /** Propiedad del objeto a mostrar. */
  campo: string;
  titulo: string;
  tipo?: TipoColumna;
  /** Oculta la columna en pantallas pequeñas (responsive). */
  ocultarEn?: 'sm' | 'md' | 'lg';
  /** Para calcular el texto de la celda a partir de la fila. */
  valor?: (fila: T) => string;
  /** Resalta la celda (negrita). */
  destacada?: boolean;
  /** Evita que el texto se parta en varias líneas. */
  sinSalto?: boolean;
}

/**
 * ÁTOMO: tabla reutilizable.
 * Recibe la configuración de columnas y las filas; se encarga del formato,
 * del estado "cargando", del mensaje vacío y de la animación de las filas.
 */
@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.html',
  styleUrl: './tabla.css',
})
export class Tabla<T extends object = any> {
  readonly columnas = input.required<Columna<T>[]>();
  readonly filas = input<T[]>([]);
  readonly cargando = input(false);
  readonly mensajeVacio = input('No hay registros para mostrar.');
  readonly campoId = input('id');

  protected readonly skeleton = computed(() => Array.from({ length: 4 }, (_, i) => i));

  protected id(fila: T, i: number): unknown {
    return (fila as Record<string, unknown>)[this.campoId()] ?? i;
  }

  protected celda(fila: T, col: Columna<T>): string {
    if (col.valor) return col.valor(fila);
    const v = (fila as Record<string, unknown>)[col.campo];
    if (v === null || v === undefined || v === '') return '—';
    const texto = String(v);
    switch (col.tipo) {
      case 'fecha':
        return formatearFecha(texto);
      case 'hora':
        return formatearHora(texto);
      case 'fecha-hora':
        return `${formatearFecha(texto)} · ${formatearHora(texto)}`;
      case 'estado':
        return texto.charAt(0) + texto.slice(1).toLowerCase();
      default:
        return texto;
    }
  }

  protected claseEstado(fila: T, col: Columna<T>): string {
    const v = String((fila as Record<string, unknown>)[col.campo] ?? '').toLowerCase();
    return `pa-badge pa-badge-${v}`;
  }

  protected claseResponsive(col: Columna<T>): string {
    return col.ocultarEn ? `d-none d-${col.ocultarEn}-table-cell` : '';
  }
}
