import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Turno } from 'src/app/models/turno';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-detalle-turno',
  templateUrl: './detalle-turno.component.html',
  styleUrls: ['./detalle-turno.component.scss'],
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
export class DetalleTurnoComponent implements OnInit {

  turno: Turno = new Turno;

  constructor(private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.turno = data['turno'];
      console.log(this.turno);
    })
  }

  desasignarTurno(idTurno: number, idUsuario: number) {
    // this.rutinaService.desasignarAlumno(idRutina, idUsuario).subscribe(response => {
    //   this.rutinaService.getRutinaById(this.rutina.id).subscribe(response => this.rutina = response);
    //   this.usuarioService.getUsuariosByIdRolForRutina(3, this.rutina.id).subscribe(response => { this.alumnos = response});
    //   this.alertService.success('Se ha desasignado correctamente el alumno.', { autoClose: true, keepAfterRouteChange: true, symbolAlert: 'check-circle-fill' });
    // },
    // error => {
    //   this.alertService.error('Ocurrió un error al desasignado correctamente el alumno.', { autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' })
    // });
  }

}
