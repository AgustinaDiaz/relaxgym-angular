import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { LayoutComponent } from './layout';
import { LoginComponent } from './login/login.component';
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