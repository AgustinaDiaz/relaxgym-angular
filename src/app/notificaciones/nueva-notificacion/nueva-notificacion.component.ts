import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EstadoNotificacion } from 'src/app/models/estado-notificacion';
import { Notificacion } from 'src/app/models/notificacion';
import { TipoNotificacion } from 'src/app/models/tipo-notificacion';
import { Usuario } from 'src/app/models/usuario';
import { AlertService } from 'src/app/services/alert.service';
import { EstadoNotificacionService } from 'src/app/services/estado-notificacion.service';
import { NotificacionService } from 'src/app/services/notificacion.service';
import { TipoNotificacionService } from 'src/app/services/tipo-notificacion.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-nueva-notificacion',
  templateUrl: './nueva-notificacion.component.html',
  styleUrls: ['./nueva-notificacion.component.scss'],
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
export class NuevaNotificacionComponent implements OnInit {

  usuarios: Array<Usuario> = [];
  allChecked: boolean = false;
  tooltipValidated: boolean = false;
  notificacion: Notificacion = new Notificacion();
  tiposNotificaciones: Array<TipoNotificacion> = [];
  
  constructor(private router: Router,
              private tipoNotificacionService: TipoNotificacionService,
              private notificacionService: NotificacionService,
              private estadoNotificacionService: EstadoNotificacionService,
              private usuarioService: UsuarioService,
              private alertService: AlertService) {
                this.notificacion.titulo = '';
                this.notificacion.descripcion = '';
                this.notificacion.tipoNotificacion = new TipoNotificacion();
                this.notificacion.tipoNotificacion.id = 0;
                this.notificacion.estadoNotificacion = new EstadoNotificacion();
                this.notificacion.estadoNotificacion.id = 0;
               }

  ngOnInit(): void {
    this.usuarioService.getUsuarios().subscribe(response => {
      this.usuarios = response.sort((a,b) => (a.apellido > b.apellido) ? 1 : ((b.apellido > a.apellido) ? -1 : 0));;

      this.usuarios.forEach((usuario) => { 
        usuario.selected = false;
      });
    },
    error => {
      this.alertService.error('Ocurrió un error al cargar los alumnos.', { autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' })
    });

    this.tipoNotificacionService.getTiposNotificaciones().subscribe(response => {
      this.tiposNotificaciones = response;
    },
    error => {
      this.alertService.error('Ocurrió un error al cargar los tipos de notificaciones.', { autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' })
    });
  }

  createNotificacion(createNotificacionForm: NgForm, usuarios: Array<Usuario>)
  {
    if(!createNotificacionForm.invalid){
      let usuariosSeleccionados = usuarios.filter(x => x.selected);
      this.notificacion.idUsuarios = usuariosSeleccionados.map(x => x.id);
      this.notificacion.idTipoNotificacion = this.notificacion.tipoNotificacion.id;

      this.notificacionService.createNotificacion(this.notificacion)
        .subscribe(response => {
          this.alertService.success('Se ha creado correctamente la/s notificacion/es.', { autoClose: true, keepAfterRouteChange: true, symbolAlert: 'check-circle-fill' });
          this.onBack();
        },
        error => {
          this.alertService.error('Ocurrió un error al crear la/s notificacion/es.',{ autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' });
        });
    }
    else{
      this.tooltipValidated = true;
    }
  }

  setCheckSelected(usuario: Usuario) {
    if(usuario.selected) {
      usuario.selected = false;
    } else {
      usuario.selected = true;
    }
  }

  setAllCheckSelected() {
    if(this.allChecked) {
      this.allChecked = false;
      this.usuarios.map(x => x.selected = false);
    } else {
      this.allChecked = true;
      this.usuarios.map(x => x.selected = true);
    }
  }

  onBack() {
    this.router.navigateByUrl("main/gestion-notificaciones");
  }
}
