import { Component } from '@angular/core';
import { INavData } from '@coreui/angular';
import { Claim } from '../models/claim';

@Component({
  selector: 'app-dashboard',
  templateUrl: './layout.component.html',
})
export class LayoutComponent {

  public navItems: INavData[] = [];

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  constructor() {
    this.navItems.push({ name: 'Inicio', url: 'home', iconComponent: { name: 'cil-home' }});
    
    var token = localStorage.getItem("tokenUsuario") as string;
    var decodedToken = this.getDecodedAccessToken(token);
    var claims = new Claim();
    claims = JSON.parse(decodedToken);

    if(claims.role == '1' || claims.role == '2') {
      this.navItems.push({ name: 'Gestion de Ejercicios', url: 'gestion-ejercicios', iconComponent: { name: 'cilWeightlifitng' }});
      this.navItems.push({ name: 'Gestion de Rutinas', url: 'gestion-rutinas', iconComponent: { name: 'cilClipboard' }});
    }

    if(claims.role == '1') {
      this.navItems.push({ name: 'Gestion de Usuarios', url: 'gestion-usuarios', iconComponent: { name: 'cil-contact' }});
      this.navItems.push({ name: 'Gestion de Notificaciones', url: 'gestion-notificaciones', iconComponent: { name: 'cil-bell' }});
    }

    if(claims.role == '3') {
      this.navItems.push({ name: 'Rutinas', url: 'rutinas', iconComponent: { name: 'cilFeaturedPlaylist' }});
      this.navItems.push({ name: 'Mis Turnos', url: 'turnos', iconComponent: { name: 'cilCalendarCheck' }});
    }
  }

  private getDecodedAccessToken(token: string): any {
    try {
      return atob(token.split('.')[1]);
    } catch(Error) {
      return null;
    }
  }
}