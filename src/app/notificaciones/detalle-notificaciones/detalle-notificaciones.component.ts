import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Notificacion } from 'src/app/models/notificacion';
import { Usuario } from 'src/app/models/usuario';
import { AlertService } from 'src/app/services/alert.service';
import { NotificacionService } from 'src/app/services/notificacion.service';

@Component({
  selector: 'app-detalle-notificaciones',
  templateUrl: './detalle-notificaciones.component.html',
  styleUrls: ['./detalle-notificaciones.component.scss'],
  animations: [
    trigger('inOut', [
      transition('void => *', [ 
        style({ opacity: 0 }),          
        animate('500ms',
          style({ opacity: 1 }) 
        )
      ]),
      transition('* => void', [
        animate('500ms', 
          style({ opacity: 0 })
        ) 
      ])
    ]) 
  ]
})
export class DetalleNotificacionesComponent implements OnInit {

  usuario: Usuario = new Usuario();
  notificaciones: Array<Notificacion> = [];

  constructor(private notificacionesService: NotificacionService,
              private alertService: AlertService,
              private activatedroute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedroute.data.subscribe(data => {
      this.usuario = data['usuario'];
      this.notificacionesService.getNotificacionesByIdUsuario(this.usuario.id)
        .subscribe(response => {
          this.notificaciones = response;
        },
        error => {
          this.alertService.error('Ocurrió un error al cargar las notificaciones.',{ autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' });
        });
    })
  }

  marcarComoLeida(notificacion: Notificacion) {
    notificacion.idTipoNotificacion = notificacion.tipoNotificacion.id;
    notificacion.idEstadoNotificacion = 2;
    this.notificacionesService.updateNotificacion(notificacion)
        .subscribe(response => {
          this.notificacionesService.getNotificacionesByIdUsuario(this.usuario.id)
          .subscribe(response => {
            this.notificaciones = response;
          },
          error => {
            this.alertService.error('Ocurrió un error al cargar las notificaciones.',{ autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' });
          });
        },
        error => {
          this.alertService.error('Ocurrió un error al actualizar la notificacion.',{ autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' });
        });
  }
}
