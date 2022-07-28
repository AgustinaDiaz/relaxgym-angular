import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Notificacion } from '../models/notificacion';
import { AlertService } from '../services/alert.service';
import { NotificacionService } from '../services/notificacion.service';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss'],
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
export class NotificacionesComponent implements OnInit {

  notificaciones: Array<Notificacion> = [];
  mostrarClave: boolean = false;
  loading: boolean = false;

  constructor(private notificacionService: NotificacionService,
              private router:Router,
              private alertService: AlertService) { }

  ngOnInit(): void {
  }

  createNotificacion() {
    this.router.navigateByUrl('main/nueva-notificacion');
  }

  getNotificaciones() {
    this.loading = true;
    this.notificacionService.getNotificaciones()
        .subscribe(response => {
          this.notificaciones = response;
          this.loading = false;
        },
        error => {
          this.loading = false;
          this.alertService.error('Ocurrió un error al cargar las notificaciones.',{ autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' })
        });
  }
}
