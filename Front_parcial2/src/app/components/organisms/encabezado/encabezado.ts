import { Component, HostListener, computed, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Logo } from '../../atoms/logo/logo';

interface ItemMenu {
  texto: string;
  ruta: string;
  icono: string;
}

/** ORGANISMO: header con logo, menú según el rol y menú de usuario. */
@Component({
  selector: 'app-encabezado',
  imports: [RouterLink, RouterLinkActive, Logo],
  templateUrl: './encabezado.html',
  styleUrl: './encabezado.css',
})
export class Encabezado {
  protected readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  protected readonly menuAbierto = signal(false);
  protected readonly usuarioAbierto = signal(false);

  protected readonly items = computed<ItemMenu[]>(() => {
    const rol = this.auth.rol();
    if (rol === 'ADMIN') {
      return [
        { texto: 'Citas', ruta: '/admin/citas', icono: 'bi-calendar2-week' },
        { texto: 'Médicos', ruta: '/admin/medicos', icono: 'bi-person-badge' },
        { texto: 'Pacientes', ruta: '/admin/pacientes', icono: 'bi-people' },
      ];
    }
    const publicos: ItemMenu[] = [
      { texto: 'Inicio', ruta: '/', icono: 'bi-house' },
      { texto: 'Nuestros médicos', ruta: '/medicos', icono: 'bi-heart-pulse' },
    ];
    return rol === 'PACIENTE'
      ? [...publicos, { texto: 'Mis citas', ruta: '/paciente/mis-citas', icono: 'bi-calendar-check' }]
      : publicos;
  });

  protected readonly iniciales = computed(() =>
    (this.auth.nombre() ?? '?')
      .split(' ')
      .slice(0, 2)
      .map((p) => p.charAt(0))
      .join('')
      .toUpperCase(),
  );

  protected alternarMenu(): void {
    this.menuAbierto.update((v) => !v);
  }

  protected cerrarMenus(): void {
    this.menuAbierto.set(false);
    this.usuarioAbierto.set(false);
  }

  protected cerrarSesion(): void {
    this.auth.logout();
    this.cerrarMenus();
    this.router.navigate(['/login']);
  }

  @HostListener('document:keydown.escape')
  protected alPresionarEscape(): void {
    this.cerrarMenus();
  }
}
