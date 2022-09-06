import { Component } from '@angular/core';
import { INavData } from '@coreui/angular';
import { Claim } from '../models/claim';
import { AuthenticateService } from '../services/authenticate.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './layout.component.html',
})
export class LayoutComponent {

  public navItems: INavData[] = [];

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor(private authenticateService:AuthenticateService) {
    this.navItems.push({ name: 'Inicio', url: 'home', iconComponent: { name: 'cilHome' }});

    let claims = this.authenticateService.getClaimsUsuario();

    if(claims.role == '3') {
      this.navItems.push({ name: 'Ejercicios', url: 'ejercicios/0/ ', iconComponent: { name: 'cilWeightlifitng' }});
      this.navItems.push({ name: 'Mis Rutinas', url: 'rutinas', iconComponent: { name: 'cilClipboard' }});
      this.navItems.push({ name: 'Mis Turnos', url: 'turnos', iconComponent: { name: 'cilCalendarCheck' }});
    }

    if(claims.role == '2') {
      this.navItems.push({ name: 'Gestion de Ejercicios', url: 'ejercicios/0/ ', iconComponent: { name: 'cilWeightlifitng' }});
      this.navItems.push({ name: 'Mis Rutinas', url: 'rutinas', iconComponent: { name: 'cilClipboard' }});
      this.navItems.push({ name: 'Mis Turnos', url: 'turnos', iconComponent: { name: 'cilCalendarCheck' }});
    }

    if(claims.role == '1') {
      this.navItems.push({ name: 'Gestion de Clases', url: 'gestion-clases', iconComponent: { name: 'cilColumns' }});
      this.navItems.push({ name: 'Gestion de Ejercicios', url: 'gestion-ejercicios/0/ ', iconComponent: { name: 'cilWeightlifitng' }});
      this.navItems.push({ name: 'Gestion de Rutinas', url: 'gestion-rutinas', iconComponent: { name: 'cilClipboard' }});
      this.navItems.push({ name: 'Gestion de Turnos', url: 'gestion-turnos', iconComponent: { name: 'cilCalendarCheck' }});
      this.navItems.push({ name: 'Gestion de Usuarios', url: 'gestion-usuarios', iconComponent: { name: 'cil-contact' }});
      this.navItems.push({ name: 'Gestion de Notificaciones', url: 'gestion-notificaciones', iconComponent: { name: 'cil-bell' }});
    }
  }
}