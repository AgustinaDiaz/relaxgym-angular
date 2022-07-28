import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Turno } from 'src/app/models/turno';
import { AlertService } from 'src/app/services/alert.service';
import { TurnoService } from 'src/app/services/turno.service';

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
  cuposDisponibles: number = 0;

  constructor(private activatedRoute:ActivatedRoute,
              private router: Router,
              private turnoService: TurnoService,
              private alertService: AlertService) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.turno = data['turno'];

      this.cuposDisponibles = this.turno.cantidadAlumnos - this.turno.usuarios.length;
    })
  }

  desasignarTurno(idTurno: number, idUsuario: number) {
    this.turnoService.desasignarAlumno(idTurno, idUsuario).subscribe(response => {
      this.turnoService.getTurnoById(this.turno.id).subscribe(response => { 
        this.turno = response;
        this.cuposDisponibles = this.turno.cantidadAlumnos - this.turno.usuarios.length;
      });
      this.alertService.success('Se ha desasignado correctamente el alumno.', { autoClose: true, keepAfterRouteChange: true, symbolAlert: 'check-circle-fill' });
    },
    error => {
      this.alertService.error('Ocurrió un error al desasignado correctamente el alumno.', { autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' })
    });
  }

  onBack() {
    this.router.navigateByUrl("main/gestion-turnos");
  }
}
