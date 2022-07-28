import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Clase } from 'src/app/models/clase';
import { Turno } from 'src/app/models/turno';
import { AlertService } from 'src/app/services/alert.service';
import { ClaseService } from 'src/app/services/clase.service';
import { TurnoService } from 'src/app/services/turno.service';

@Component({
  selector: 'app-nuevo-turno',
  templateUrl: './nuevo-turno.component.html',
  styleUrls: ['./nuevo-turno.component.scss'],
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
export class NuevoTurnoComponent implements OnInit {
  
  tooltipValidated: boolean = false;
  turno: Turno = new Turno();
  clases: Array<Clase> = [];

  constructor(private turnoService: TurnoService,
              private router: Router,
              private alertService: AlertService,
              private claseService: ClaseService) { 
    this.turno.fechaHora = new Date();
    this.turno.clase = new Clase();
    this.turno.clase.id = 0;
  }

  ngOnInit(): void {
    this.claseService.getClases()
        .subscribe(response => {
          this.clases = response
        });
  }

  createTurno(createTurnoForm: NgForm)
  {
    if(!createTurnoForm.invalid){
      this.turno.idClase = this.turno.clase.id;
      this.turnoService.createTurno(this.turno)
        .subscribe(response => {
          this.alertService.success('Se ha creado correctamente el turno.', { autoClose: true, keepAfterRouteChange: true, symbolAlert: 'check-circle-fill' });
          this.onBack();
        },
        error => {
          this.alertService.error('Ocurrió un error al crear el turno.',{ autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' });
        });
    }
    else{
      this.tooltipValidated = true;
    }
  }

  onBack() {
    this.router.navigateByUrl("main/gestion-turnos");
  }
}
