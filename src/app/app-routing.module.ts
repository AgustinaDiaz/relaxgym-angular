import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { InicioResolver } from './inicio/inicio.resolver';
import { LayoutComponent } from './layout';
import { LoginComponent } from './login/login.component';
import { ResetPasswordConfirmComponent } from './login/reset-password-confirm/reset-password-confirm.component';
import { ResetPasswordResolver } from './login/reset-password-confirm/reset-password.resolver';
import { ResetPasswordMailComponent } from './login/reset-password-mail/reset-password-mail.component';
import { AdministratorGuard } from './services/administrator.guard';
import { AuthenticateGuard } from './services/authenticate.guard';
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
        path: 'gestion-usuarios',
        component: UsuariosComponent,
        canActivate: [AdministratorGuard],
        data: {
          title: 'Usuarios'
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