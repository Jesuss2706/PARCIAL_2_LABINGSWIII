import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

/** ORGANISMO: portada (hero) de la página de inicio. */
@Component({
  selector: 'app-portada',
  imports: [RouterLink],
  templateUrl: './portada.html',
  styleUrl: './portada.css',
})
export class Portada {
  protected readonly auth = inject(AuthService);
}
