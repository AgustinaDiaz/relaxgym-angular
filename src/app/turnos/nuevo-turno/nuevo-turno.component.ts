import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Clase } from 'src/app/models/clase';
import { Turno } from 'src/app/models/turno';
import { Usuario } from 'src/app/models/usuario';
import { AlertService } from 'src/app/services/alert.service';
import { ClaseService } from 'src/app/services/clase.service';
import { TurnoService } from 'src/app/services/turno.service';
import { UsuarioService } from 'src/app/services/usuario.service';

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
  entrenadores: Array<Usuario> = [];
  filteredEntrenadores: Array<Usuario> = [];
  selectedDate: any;
  searchNombreEntrenador: string = '';
  idEntrenadorSelected: number = 0;

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

    if(!createTurnoForm.invalid){
      this.turno.idClase = this.turno.clase.id;
      this.turno.fechaHora = this.selectedDate;
      this.turno.idEntrenadorAsignado = this.idEntrenadorSelected;
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

  onBack() {
    this.router.navigateByUrl("main/gestion-turnos");
  }
}
