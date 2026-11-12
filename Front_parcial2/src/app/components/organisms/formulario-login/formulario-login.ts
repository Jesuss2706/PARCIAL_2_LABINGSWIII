import { Component, inject, input, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginRequest } from '../../../core/models/models';
import { Alerta } from '../../atoms/alerta/alerta';
import { Boton } from '../../atoms/boton/boton';
import { CampoFormulario } from '../../molecules/campo-formulario/campo-formulario';

/** ORGANISMO: formulario de inicio de sesión. */
@Component({
  selector: 'app-formulario-login',
  imports: [ReactiveFormsModule, CampoFormulario, Boton, Alerta],
  templateUrl: './formulario-login.html',
})
export class FormularioLogin {
  readonly cargando = input(false);
  readonly error = input<string | null>(null);
  readonly enviar = output<LoginRequest>();

  protected readonly verClave = signal(false);

  protected readonly form = inject(FormBuilder).nonNullable.group({
    username: ['', [Validators.required, Validators.maxLength(50)]],
    password: ['', [Validators.required]],
  });

  protected onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { username, password } = this.form.getRawValue();
    this.enviar.emit({ username: username.trim(), password });
  }
}
