import { Component, input } from '@angular/core';
import { Medico } from '../../../core/models/models';
import { Columna } from '../../atoms/tabla/tabla';
import { TablaConTitulo } from '../../molecules/tabla-con-titulo/tabla-con-titulo';

/** ORGANISMO: listado de médicos (usa la molécula tabla + título). */
@Component({
  selector: 'app-listado-medicos',
  imports: [TablaConTitulo],
  template: `
    <app-tabla-con-titulo [titulo]="titulo()" [subtitulo]="subtitulo()" icono="bi-person-badge"
                          [columnas]="columnas" [filas]="medicos()" [cargando]="cargando()"
                          mensajeVacio="Aún no hay médicos registrados.">
      <div acciones><ng-content /></div>
    </app-tabla-con-titulo>
  `,
})
export class ListadoMedicos {
  readonly medicos = input<Medico[]>([]);
  readonly cargando = input(false);
  readonly titulo = input('Médicos');
  readonly subtitulo = input<string | null>('Ordenados por apellido');

  protected readonly columnas: Columna<Medico>[] = [
    { campo: 'nombreCompleto', titulo: 'Médico', destacada: true },
    { campo: 'cedula', titulo: 'Cédula', ocultarEn: 'md' },
    { campo: 'especialidad', titulo: 'Especialidad' },
    { campo: 'email', titulo: 'Correo', ocultarEn: 'lg' },
    { campo: 'telefono', titulo: 'Teléfono', ocultarEn: 'lg' },
    { campo: 'consultorio', titulo: 'Consultorio', ocultarEn: 'sm' },
  ];
}
