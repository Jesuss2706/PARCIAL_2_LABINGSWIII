import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LoginRequest } from '../../core/models/models';
import { AuthService } from '../../core/services/auth.service';
import { mensajeError } from '../../core/utils/utils';
import { Alerta } from '../../components/atoms/alerta/alerta';
import { Logo } from '../../components/atoms/logo/logo';
import { FormularioLogin } from '../../components/organisms/formulario-login/formulario-login';
import { PlantillaPrincipal } from '../../components/templates/plantilla-principal/plantilla-principal';

/** PÁGINA (pública): iniciar sesión. */
@Component({
  selector: 'app-login',
  imports: [PlantillaPrincipal, FormularioLogin, Logo, Alerta, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  protected readonly cargando = signal(false);
  protected readonly error = signal<string | null>(null);
  protected readonly expirado = this.route.snapshot.queryParamMap.has('expirado');

  protected iniciarSesion(credenciales: LoginRequest): void {
    this.cargando.set(true);
    this.error.set(null);
    this.auth.login(credenciales).subscribe({
      next: () => {
        const destino = this.route.snapshot.queryParamMap.get('returnUrl') || this.auth.inicioPorRol();
        this.router.navigateByUrl(destino);
      },
      error: (e) => {
        this.error.set(mensajeError(e));
        this.cargando.set(false);
      },
    });
  }
}
