import { NgModule } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from '@coreui/angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import {
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule,
} from 'ngx-perfect-scrollbar';


import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

import { LoginComponent } from './login/login.component';

import {
  AlertModule,
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  ModalModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,
  TooltipModule,
  SpinnerModule,
  UtilitiesModule
  
} from '@coreui/angular';

import { IconModule, IconSetService } from '@coreui/icons-angular';
import { LayoutComponent } from './layout/layout.component';
import { AppFooterComponent } from './layout/footer/app-footer.component';
import { AppHeaderComponent } from './layout/header/app-header.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { InicioComponent } from './inicio/inicio.component';
import { ModificarUsuarioComponent } from './usuarios/modificar-usuario/modificar-usuario.component';
import { HeaderInterceptor } from './services/header.interceptor';
import { AlertComponent } from './alert/alert.component';
import { NuevoUsuarioComponent } from './usuarios/nuevo-usuario/nuevo-usuario.component';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    AppFooterComponent,
    AppHeaderComponent,
    UsuariosComponent,
    InicioComponent,
    ModificarUsuarioComponent,
    AlertComponent,
    NuevoUsuarioComponent
  ],
  imports: [
    AlertModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AvatarModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    GridModule,
    HeaderModule,
    SidebarModule,
    IconModule,
    PerfectScrollbarModule,
    ModalModule,
    NavModule,
    ButtonModule,
    FormModule,
    UtilitiesModule,
    ButtonGroupModule,
    ReactiveFormsModule,
    FormsModule,
    SidebarModule,
    SharedModule,
    TabsModule,
    ListGroupModule,
    ProgressModule,
    BadgeModule,
    ListGroupModule,
    CardModule,
    TableModule,
    TooltipModule,
    SpinnerModule,
    HttpClientModule
  ],
  
  providers: [
    { provide: HTTP_INTERCEPTORS, 
      useClass: HeaderInterceptor, 
      multi: true },
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG,
    },
    IconSetService,
    Title
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
