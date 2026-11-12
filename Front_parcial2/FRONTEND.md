# Front — Clínica Piedra Azul (Segundo parcial Ing. Software III)

Angular 22 (standalone + signals) con Bootstrap 5.3, con la identidad visual de Piedra Azul.

## Ejecutar
```bash
npm install
npm start          # http://localhost:4200  (el back debe estar en http://localhost:8080)
npm test           # pruebas de rutas, guards e interceptor
```
La URL del backend está en `src/app/core/api.config.ts`.

## Atomic Design (`src/app/components`)
| Nivel | Componentes |
|---|---|
| Átomos | `tabla` (reutilizable, obligatoria), `boton`, `logo`, `alerta`, `spinner` |
| Moléculas | `tabla-con-titulo` (tabla + título, obligatoria), `campo-formulario`, `encabezado-pagina`, `tarjeta-dato`, `tarjeta-medico`, `buscador` |
| Organismos | `encabezado` (header + menú), `pie-pagina` (footer), `portada`, `formulario-login`, `formulario-medico`, `formulario-paciente`, `formulario-cita`, `listado-medicos`, `listado-pacientes`, `listado-citas`, `galeria-medicos` |
| Plantilla | `plantilla-principal` (responsive, la usan TODAS las páginas) |
| Páginas | `src/app/pages/*` — una por funcionalidad |

## Rutas
| Ruta | Acceso | Funcionalidad |
|---|---|---|
| `/login` | Público | Iniciar sesión |
| `/` y `/medicos` | Público | Listar médicos |
| `/paciente/mis-citas` | PACIENTE | Listar sus citas |
| `/admin/medicos` · `/admin/medicos/nuevo` | ADMIN | Listar / registrar médico |
| `/admin/pacientes` · `/admin/pacientes/nuevo` | ADMIN | Listar / registrar paciente |
| `/admin/citas` · `/admin/citas/nueva` | ADMIN | Listar todas / crear cita |

## Seguridad (`src/app/core`)
- `guards/auth.guard.ts` — **Guard 1**: sin sesión → `/login?returnUrl=…`
- `guards/role.guard.ts` — **Guard 2**: rol distinto a `data.roles` → `/acceso-denegado`
- `interceptors/auth.interceptor.ts` — adjunta `Authorization: Bearer <jwt>` solo a rutas privadas; ante 401 cierra sesión.
- El JWT se guarda en `localStorage` (`pa_sesion`) y se valida su expiración (`exp`).

## Formularios reactivos
Registro de médico, registro de paciente y creación de cita, con validaciones síncronas
y el validador **asíncrono** `cedulaDisponibleValidator` (`core/validators/validators.ts`),
que consulta `GET /api/admin/{medicos|pacientes}/existe/{cedula}` mientras el usuario escribe.

## Pruebas (`npm test`)
- `app.routes.spec.ts`: rutas públicas, privadas permitidas por rol y denegadas por rol (escribiendo la URL).
- `core/guards/guards.spec.ts`: Guard 1 y Guard 2.
- `core/interceptors/auth.interceptor.spec.ts`: envío del token y manejo del 401.
