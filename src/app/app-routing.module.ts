import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EjercicioResolver } from './ejercicios/ejercicio.resolver';
import { EjerciciosComponent } from './ejercicios/ejercicios.component';
import { ModificarEjercicioComponent } from './ejercicios/modificar-ejercicio/modificar-ejercicio.component';
import { NuevoEjercicioComponent } from './ejercicios/nuevo-ejercicio/nuevo-ejercicio.component';
import { InicioComponent } from './inicio/inicio.component';
import { InicioResolver } from './inicio/inicio.resolver';
import { LayoutComponent } from './layout';
import { LoginComponent } from './login/login.component';
import { ResetPasswordConfirmComponent } from './login/reset-password-confirm/reset-password-confirm.component';
import { ResetPasswordResolver } from './login/reset-password-confirm/reset-password.resolver';
import { ResetPasswordMailComponent } from './login/reset-password-mail/reset-password-mail.component';
import { DetalleNotificacionesComponent } from './notificaciones/detalle-notificaciones/detalle-notificaciones.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { NuevaNotificacionComponent } from './notificaciones/nueva-notificacion/nueva-notificacion.component';
import { AsignarRutinaComponent } from './rutinas/asignar-rutina/asignar-rutina.component';
import { NuevaRutinaComponent } from './rutinas/nueva-rutina/nueva-rutina.component';
import { RutinaResolver } from './rutinas/rutina.resolver';
import { RutinasComponent } from './rutinas/rutinas.component';
import { AdministratorGuard } from './services/administrator.guard';
import { AuthenticateGuard } from './services/authenticate.guard';
import { DetalleTurnoComponent } from './turnos/detalle-turno/detalle-turno.component';
import { NuevoTurnoComponent } from './turnos/nuevo-turno/nuevo-turno.component';
import { TurnoResolver } from './turnos/turno.resolver';
import { TurnosComponent } from './turnos/turnos.component';
import { DetalleUsuarioComponent } from './usuarios/detalle-usuario/detalle-usuario.component';
import { ModificarUsuarioComponent } from './usuarios/modificar-usuario/modificar-usuario.component';
import { NuevoUsuarioComponent } from './usuarios/nuevo-usuario/nuevo-usuario.component';
import { UsuarioResolver } from './usuarios/usuario.resolver';
import { UsuariosComponent } from './usuarios/usuarios.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'reset-password-mail',
    component: ResetPasswordMailComponent,
    data: {
      title: 'Reset Password Mail Page'
    }
  },
  {
    path: 'reset-password-confirm/:id',
    component: ResetPasswordConfirmComponent,
    data: {
      title: 'Confirm Reset Password Mail Page'
    },
    resolve: {
      solicitud: ResetPasswordResolver
    }
  },
  { path: '', redirectTo: 'main', pathMatch: 'full' },
  {
    path: 'main',
    component: LayoutComponent,
    canActivate: [AuthenticateGuard],
    data: {
      title: ''
    },
    children:[
      {
        path: 'home',
        component: InicioComponent,
        canActivate: [AuthenticateGuard],
        data: {
          title: 'Inicio'
        },
        resolve: {
          usuarios: InicioResolver
        }
      },
      {
        path: 'gestion-rutinas',
        component: RutinasComponent,
        canActivate: [AdministratorGuard],
        data: {
          title: 'Rutinas'
        }
      },
      {
        path: 'nueva-rutina', 
        component: NuevaRutinaComponent,
        canActivate: [AdministratorGuard],
        data: {
          title: 'Rutinas/Nueva'
        }
      }, 
      {
        path: 'asignar-rutina/:id',
        component: AsignarRutinaComponent,
        canActivate: [AdministratorGuard],
        data: {
          title: 'Rutinas/Asignar'
        },
        resolve: {
          rutina: RutinaResolver
        }
      },
      {
        path: 'gestion-usuarios',
        component: UsuariosComponent,
        canActivate: [AdministratorGuard],
        data: {
          title: 'Usuarios'
        }
      },
      {
        path: 'gestion-turnos',
        component: TurnosComponent,
        canActivate: [AdministratorGuard],
        data: {
          title: 'Turnos'
        }
      },
      {
        path: 'nuevo-turno', 
        component: NuevoTurnoComponent,
        canActivate: [AdministratorGuard],
        data: {
          title: 'Turnos/Nuevo'
        }
      }, 
      {
        path: 'detalle-turno/:id',
        component: DetalleTurnoComponent,
        canActivate: [AdministratorGuard],
        data: {
          title: 'Turnos/Detalle'
        },
        resolve: {
          turno: TurnoResolver
        }
      },
      {
        path: 'gestion-notificaciones',
        component: NotificacionesComponent,
        canActivate: [AdministratorGuard],
        data: {
          title: 'Notificaciones'
        }
      },
      {
        path: 'nueva-notificacion', 
        component: NuevaNotificacionComponent,
        canActivate: [AdministratorGuard],
        data: {
          title: 'Notificaciones/Nuevo'
        }
      },
      {
        path: 'detalle-notificaciones/:id', 
        component: DetalleNotificacionesComponent,
        canActivate: [AdministratorGuard],
        data: {
          title: 'Notificaciones/Detalle'
        },
        resolve: {
          usuario: UsuarioResolver
        }
      },
      {
        path: 'nuevo-usuario', 
        component: NuevoUsuarioComponent,
        canActivate: [AdministratorGuard],
        data: {
          title: 'Usuarios/Nuevo'
        }
      }, 
      {
        path: 'modificar-usuario/:id', 
        component: ModificarUsuarioComponent,
        canActivate: [AdministratorGuard],
        data: {
          title: 'Usuarios/Modificar'
        },
        resolve: {
          usuario: UsuarioResolver
        }
      }, 
      {
        path: 'detalle-usuario/:id', 
        component: DetalleUsuarioComponent,
        canActivate: [AuthenticateGuard],
        data: {
          title: 'Perfil'
        },
        resolve: {
          usuario: UsuarioResolver
        }
      },
      {
        path: 'gestion-ejercicios',
        component: EjerciciosComponent,
        canActivate: [AdministratorGuard],
        data: {
          title: 'Ejercicios'
        }
      },
      {
        path: 'nuevo-ejercicio', 
        component: NuevoEjercicioComponent,
        canActivate: [AdministratorGuard],
        data: {
          title: 'Ejercicios/Nuevo'
        }
      },  
      {
        path: 'modificar-ejercicio/:id', 
        component: ModificarEjercicioComponent,
        canActivate: [AuthenticateGuard],
        data: {
          title: 'Ejercicios/Modificar'
        },
        resolve: {
          ejercicio: EjercicioResolver
        }
      }
    ]
  },
  { path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'top',
      anchorScrolling: 'enabled',
      initialNavigation: 'enabledBlocking'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}