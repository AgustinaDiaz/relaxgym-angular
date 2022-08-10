import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { Claim } from 'src/app/models/claim';
import { Notificacion } from 'src/app/models/notificacion';
import { AlertService } from 'src/app/services/alert.service';
import { NotificacionService } from 'src/app/services/notificacion.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
})
export class AppHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  notificaciones: Array<Notificacion> = new Array<Notificacion>();
  claims: any;
  totalNotificaciones: number = 0;

  constructor(private router: Router,
              private classToggler: ClassToggleService,
              private notificacionesService: NotificacionService,
              private alertService: AlertService) {
    super();
    this.claims = this.getClaimsFromToken();
    this.notificacionesService.getNotificacionesByIdUsuario(this.claims.primarysid)
        .subscribe(response => {
          this.totalNotificaciones = response.filter(x => x.estadoNotificacion.id === 1).length;
          this.notificaciones = response;
        },
        error => {
          this.alertService.error('Ocurrió un error al cargar las notificaciones.',{ autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' });
        });
  }

  logout()
  {
    localStorage.removeItem('tokenUsuario');
  }

  getClaimsFromToken(){
    var token = localStorage.getItem("tokenUsuario") as string;
    var decodedToken = this.getDecodedAccessToken(token);
    var claims = new Claim();
    return claims = JSON.parse(decodedToken);
  }

  private getDecodedAccessToken(token: string): any {
    try {
      return atob(token.split('.')[1]);
    } catch(Error) {
      return null;
    }
  }
}
