import { Component, input } from '@angular/core';
import { Paciente } from '../../../core/models/models';
import { Columna } from '../../atoms/tabla/tabla';
import { TablaConTitulo } from '../../molecules/tabla-con-titulo/tabla-con-titulo';

/** ORGANISMO: listado de pacientes (usa la molécula tabla + título). */
@Component({
  selector: 'app-listado-pacientes',
  imports: [TablaConTitulo],
  template: `
    <app-tabla-con-titulo titulo="Pacientes" subtitulo="Ordenados por apellido" icono="bi-people"
                          [columnas]="columnas" [filas]="pacientes()" [cargando]="cargando()"
                          mensajeVacio="Aún no hay pacientes registrados.">
      <div acciones><ng-content /></div>
    </app-tabla-con-titulo>
  `,
})
export class ListadoPacientes {
  readonly pacientes = input<Paciente[]>([]);
  readonly cargando = input(false);

  protected readonly columnas: Columna<Paciente>[] = [
    { campo: 'nombreCompleto', titulo: 'Paciente', destacada: true },
    { campo: 'cedula', titulo: 'Cédula' },
    { campo: 'fechaNacimiento', titulo: 'Nacimiento', tipo: 'fecha', ocultarEn: 'lg' },
    { campo: 'email', titulo: 'Correo', ocultarEn: 'md' },
    { campo: 'telefono', titulo: 'Teléfono', ocultarEn: 'sm' },
    { campo: 'direccion', titulo: 'Dirección', ocultarEn: 'lg' },
  ];
}
