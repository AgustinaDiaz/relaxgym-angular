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

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';

import { AutocompleteLibModule } from 'angular-ng-autocomplete';


import {
  AccordionModule,
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
  WidgetModule,
  UtilitiesModule
  
} from '@coreui/angular';

import { ChartjsModule } from '@coreui/angular-chartjs';
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
import { DetalleUsuarioComponent } from './usuarios/detalle-usuario/detalle-usuario.component';
import { ResetPasswordConfirmComponent } from './login/reset-password-confirm/reset-password-confirm.component';
import { ResetPasswordMailComponent } from './login/reset-password-mail/reset-password-mail.component';
import { RutinasComponent } from './rutinas/rutinas.component';
import { EjerciciosComponent } from './ejercicios/ejercicios.component';
import { ModificarEjercicioComponent } from './ejercicios/modificar-ejercicio/modificar-ejercicio.component';
import { NuevoEjercicioComponent } from './ejercicios/nuevo-ejercicio/nuevo-ejercicio.component';
import { AsignarRutinaComponent } from './rutinas/asignar-rutina/asignar-rutina.component';
import { NuevaRutinaComponent } from './rutinas/nueva-rutina/nueva-rutina.component';
import { TurnosComponent } from './turnos/turnos.component';
import { NotificacionesComponent } from './notificaciones/notificaciones.component';
import { DetalleTurnoComponent } from './turnos/detalle-turno/detalle-turno.component';
import { NuevoTurnoComponent } from './turnos/nuevo-turno/nuevo-turno.component';
import { NuevaNotificacionComponent } from './notificaciones/nueva-notificacion/nueva-notificacion.component';
import { DetalleNotificacionesComponent } from './notificaciones/detalle-notificaciones/detalle-notificaciones.component';
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import { HistorialUsuarioComponent } from './usuarios/historial-usuario/historial-usuario.component';


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
};

FullCalendarModule.registerPlugins([
  dayGridPlugin,
  timeGridPlugin,
  listPlugin,
  interactionPlugin,
  bootstrap5Plugin
]);

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
    NuevoUsuarioComponent,
    DetalleUsuarioComponent,
    ResetPasswordMailComponent,
    ResetPasswordConfirmComponent,
    RutinasComponent,
    EjerciciosComponent,
    ModificarEjercicioComponent,
    NuevoEjercicioComponent,
    AsignarRutinaComponent,
    NuevaRutinaComponent,
    TurnosComponent,
    NotificacionesComponent,
    DetalleTurnoComponent,
    NuevoTurnoComponent,
    NuevaNotificacionComponent,
    DetalleNotificacionesComponent,
    HistorialUsuarioComponent
  ],
  imports: [
    AccordionModule,
    AlertModule,
    AutocompleteLibModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AvatarModule,
    BreadcrumbModule,
    FooterModule,
    DropdownModule,
    GridModule,
    FullCalendarModule,
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
    DlDateTimeDateModule,
    DlDateTimePickerModule,
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
    WidgetModule,
    HttpClientModule,
    ChartjsModule
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
