import { Component, computed, input } from '@angular/core';
import { Cita } from '../../../core/models/models';
import { Columna } from '../../atoms/tabla/tabla';
import { TablaConTitulo } from '../../molecules/tabla-con-titulo/tabla-con-titulo';

/** ORGANISMO: listado de citas (admin: todas · paciente: las propias). */
@Component({
  selector: 'app-listado-citas',
  imports: [TablaConTitulo],
  template: `
    <app-tabla-con-titulo [titulo]="titulo()" [subtitulo]="subtitulo()" icono="bi-calendar2-week"
                          [columnas]="columnas()" [filas]="citas()" [cargando]="cargando()"
                          [mensajeVacio]="mensajeVacio()">
      <div acciones><ng-content /></div>
    </app-tabla-con-titulo>
  `,
})
export class ListadoCitas {
  readonly citas = input<Cita[]>([]);
  readonly cargando = input(false);
  readonly mostrarPaciente = input(true);
  readonly titulo = input('Citas médicas');
  readonly subtitulo = input<string | null>('De la más reciente a la más antigua');
  readonly mensajeVacio = input('No hay citas registradas.');

  protected readonly columnas = computed<Columna<Cita>[]>(() => [
    { campo: 'fechaHora', titulo: 'Fecha', tipo: 'fecha', destacada: true },
    { campo: 'hora', titulo: 'Hora', sinSalto: true, valor: (c) => new Date(c.fechaHora).toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' }) },
    ...(this.mostrarPaciente()
      ? [
          { campo: 'pacienteNombre', titulo: 'Paciente' },
          { campo: 'pacienteCedula', titulo: 'Cédula', ocultarEn: 'lg' as const },
        ]
      : []),
    { campo: 'medicoNombre', titulo: 'Médico', ocultarEn: 'sm' },
    { campo: 'especialidad', titulo: 'Especialidad', ocultarEn: 'md' },
    { campo: 'motivo', titulo: 'Motivo', ocultarEn: 'lg' },
    { campo: 'estado', titulo: 'Estado', tipo: 'estado' },
  ]);
}
