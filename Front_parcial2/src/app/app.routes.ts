import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

export const routes: Routes = [
  // ---------- PÚBLICAS ----------
  {
    path: '',
    title: 'Clínica Piedra Azul',
    loadComponent: () => import('./pages/inicio/inicio').then((m) => m.Inicio),
  },
  {
    path: 'login',
    title: 'Iniciar sesión · Piedra Azul',
    loadComponent: () => import('./pages/login/login').then((m) => m.Login),
  },
  {
    path: 'registro',
    title: 'Crear cuenta · Piedra Azul',
    loadComponent: () => import('./pages/registro/registro').then((m) => m.Registro),
  },
  {
    path: 'medicos',
    title: 'Nuestros médicos · Piedra Azul',
    loadComponent: () => import('./pages/medicos/medicos').then((m) => m.Medicos),
  },

  // ---------- PACIENTE ----------
  {
    path: 'paciente',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['PACIENTE'] },
    children: [
      { path: '', redirectTo: 'mis-citas', pathMatch: 'full' },
      {
        path: 'mis-citas',
        title: 'Mis citas · Piedra Azul',
        loadComponent: () => import('./pages/mis-citas/mis-citas').then((m) => m.MisCitas),
      },
    ],
  },

  // ---------- ADMINISTRADOR ----------
  {
    path: 'admin',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ADMIN'] },
    children: [
      { path: '', redirectTo: 'citas', pathMatch: 'full' },
      {
        path: 'citas',
        title: 'Citas · Administración',
        loadComponent: () => import('./pages/admin/admin-citas/admin-citas').then((m) => m.AdminCitas),
      },
      {
        path: 'citas/nueva',
        title: 'Nueva cita · Administración',
        loadComponent: () => import('./pages/admin/admin-cita-nueva/admin-cita-nueva').then((m) => m.AdminCitaNueva),
      },
      {
        path: 'medicos',
        title: 'Médicos · Administración',
        loadComponent: () => import('./pages/admin/admin-medicos/admin-medicos').then((m) => m.AdminMedicos),
      },
      {
        path: 'medicos/nuevo',
        title: 'Registrar médico · Administración',
        loadComponent: () =>
          import('./pages/admin/admin-medico-nuevo/admin-medico-nuevo').then((m) => m.AdminMedicoNuevo),
      },
      {
        path: 'pacientes',
        title: 'Pacientes · Administración',
        loadComponent: () => import('./pages/admin/admin-pacientes/admin-pacientes').then((m) => m.AdminPacientes),
      },
      {
        path: 'pacientes/nuevo',
        title: 'Registrar paciente · Administración',
        loadComponent: () =>
          import('./pages/admin/admin-paciente-nuevo/admin-paciente-nuevo').then((m) => m.AdminPacienteNuevo),
      },
    ],
  },

  // ---------- OTRAS ----------
  {
    path: 'acceso-denegado',
    title: 'Acceso denegado · Piedra Azul',
    loadComponent: () => import('./pages/acceso-denegado/acceso-denegado').then((m) => m.AccesoDenegado),
  },
  {
    path: '**',
    title: 'Página no encontrada · Piedra Azul',
    loadComponent: () => import('./pages/no-encontrado/no-encontrado').then((m) => m.NoEncontrado),
  },
];
