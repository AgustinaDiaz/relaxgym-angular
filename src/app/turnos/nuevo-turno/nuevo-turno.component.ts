import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { forkJoin } from 'rxjs';
import { Clase } from 'src/app/models/clase';
import { Turno } from 'src/app/models/turno';
import { Usuario } from 'src/app/models/usuario';
import { AlertService } from 'src/app/services/alert.service';
import { ClaseService } from 'src/app/services/clase.service';
import { TurnoService } from 'src/app/services/turno.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Constantes } from 'src/app/shared/feriados.constants';

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
  
  loading: boolean = false;
  tooltipValidated: boolean = false;
  turno: Turno = new Turno();
  clases: Array<Clase> = [];
  entrenadores: Array<Usuario> = [];
  filteredEntrenadores: Array<Usuario> = [];
  selectedDate: any;
  searchNombreEntrenador: string = '';
  idEntrenadorSelected: number = 0;
  checkAllDays: boolean = false;

  constructor(private turnoService: TurnoService,
              private router: Router,
              private alertService: AlertService,
              private claseService: ClaseService,
              private usuarioService: UsuarioService) { 
    moment.locale('es');
    this.turno.clase = new Clase();
    this.turno.clase.id = 0;
  }

  ngOnInit(): void {
    this.loading = true;
    this.claseService.getClases()
        .subscribe(response => {
          this.clases = response
          this.usuarioService.getUsuariosByIdRol(2).subscribe(response => {
            this.entrenadores = response.sort((a,b) => (a.apellido > b.apellido) ? 1 : ((b.apellido > a.apellido) ? -1 : 0));
            this.entrenadores.forEach((entrenador) => { 
              entrenador.selected = false;
              entrenador.nombreCompleto = entrenador.apellido.concat(' ', entrenador.nombre);
            });
            this.filteredEntrenadores = this.entrenadores;
            this.loading = false;
          },
          error => {
            this.alertService.error('Ocurrió un error al cargar los entrenadores.', { autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' })
          });          
        });
  }

  searchEntrenadores() {
    return this.filteredEntrenadores = this.entrenadores.filter(entrenador => 
        { return (this.searchNombreEntrenador.length > 0 ? entrenador.nombreCompleto.toLowerCase().match(this.searchNombreEntrenador.toLowerCase()) : true)});
  }

  createTurno(createTurnoForm: NgForm)
  {
    if(this.idEntrenadorSelected == 0) {
      this.alertService.error('Debe seleccionar un entrenador a cargo.', { autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' });
      return;
    }
    
    let esFeriado = Constantes.Feriados.some(feriado => new Date(this.selectedDate).getFullYear() == new Date(feriado.fecha).getFullYear() &&
                                                        new Date(this.selectedDate).getMonth() == new Date(feriado.fecha).getMonth() &&
                                                        new Date(this.selectedDate).getDay() == new Date(feriado.fecha).getDay());

    if(esFeriado) {
      this.alertService.error('No es posible crear el turno un dia feriado.', { autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' });
      return;
    }

    if(!createTurnoForm.invalid) {
      this.turno.idClase = this.turno.clase.id;
      this.turno.fechaHora = this.selectedDate;
      this.turno.idEntrenadorAsignado = this.idEntrenadorSelected;
      if(this.checkAllDays == true) {
        let turnos = [];
        let fechaArray = new Date(this.turno.fechaHora);
        
        while(fechaArray < new Date(2022,12,1)) {
          let esFeriado = Constantes.Feriados.some(feriado => fechaArray.getFullYear() == feriado.fecha.getFullYear() &&
                                                              fechaArray.getMonth() == feriado.fecha.getMonth() &&
                                                              fechaArray.getDay() == feriado.fecha.getDay());

          if(!esFeriado){
            let turno = new Turno();
            turno.idClase = this.turno.idClase
            turno.clase = this.turno.clase
            turno.cantidadAlumnos = this.turno.cantidadAlumnos;
            turno.observacion = this.turno.observacion;
            turno.fechaHora = this.turno.fechaHora;
            turno.idEntrenadorAsignado = this.turno.idEntrenadorAsignado;
            turno.usuarios = this.turno.usuarios;
            turno.fechaHora = new Date(fechaArray);
            turnos.push(turno);
          } else {
          }
          
          fechaArray.setDate(fechaArray.getDate() + 7);
        }

        const httpCalls = turnos.map((turno) => this.turnoService.createTurno(turno));
        let turnosComplete = forkJoin(httpCalls);

        turnosComplete.subscribe(response => {
          this.alertService.success('Se ha creado correctamente el turno.', { autoClose: true, keepAfterRouteChange: true, symbolAlert: 'check-circle-fill' });
          this.onBack();
        });
      } else {
        this.turnoService.createTurno(this.turno)
        .subscribe(response => {
          this.alertService.success('Se ha creado correctamente el turno.', { autoClose: true, keepAfterRouteChange: true, symbolAlert: 'check-circle-fill' });
          this.onBack();
          return;
        },
        error => {
          this.alertService.error('Ocurrió un error al crear el turno.',{ autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' });
        });
      }
    } else {
      this.tooltipValidated = true;
    }
  }

  setCheckSelected(entrenador: Usuario) {
    if(entrenador.selected) {
      entrenador.selected = false;
      this.entrenadores.forEach(x => {
        if(x.id == entrenador.id) {
          x.selected = false;
        }
      })
      this.idEntrenadorSelected = 0;
    } else {
      entrenador.selected = true;
      this.entrenadores.forEach(x => {
        if(x.id == entrenador.id) {
          x.selected = true;
        }
      })
      this.idEntrenadorSelected = entrenador.id;
    }
  }

  setCheckAllDaysSelected(){
    if(this.checkAllDays){
      this.checkAllDays = false;
    } else {
      this.checkAllDays = true;
    }
  }

  onBack() {
    this.router.navigateByUrl("main/gestion-turnos");
  }
}
