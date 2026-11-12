import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { PacienteRequest } from '../../core/models/models';
import { AuthService } from '../../core/services/auth.service';
import { mensajeError } from '../../core/utils/utils';
import { Alerta } from '../../components/atoms/alerta/alerta';
import { FormularioPaciente } from '../../components/organisms/formulario-paciente/formulario-paciente';
import { PlantillaPrincipal } from '../../components/templates/plantilla-principal/plantilla-principal';

/** PÁGINA (pública): un paciente crea su propia cuenta. */
@Component({
  selector: 'app-registro',
  imports: [PlantillaPrincipal, FormularioPaciente, Alerta, RouterLink],
  templateUrl: './registro.html',
})
export class Registro {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly guardando = signal(false);
  protected readonly error = signal<string | null>(null);

  protected registrar(datos: PacienteRequest): void {
    this.guardando.set(true);
    this.error.set(null);

    // 1. Crea la cuenta  2. Inicia sesión automáticamente  3. Lo lleva a "Mis citas"
    this.auth
      .registrar(datos)
      .pipe(switchMap(() => this.auth.login({ username: datos.cedula, password: datos.password })))
      .subscribe({
        next: () => this.router.navigate(['/paciente/mis-citas']),
        error: (e) => {
          this.error.set(mensajeError(e));
          this.guardando.set(false);
        },
      });
  }

  protected cancelar(): void {
    this.router.navigate(['/login']);
  }
}
