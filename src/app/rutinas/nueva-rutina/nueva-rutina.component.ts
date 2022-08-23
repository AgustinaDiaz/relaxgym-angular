import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Claim } from 'src/app/models/claim';
import { Ejercicio } from 'src/app/models/ejercicio';
import { EjercicioRutina } from 'src/app/models/ejercicio-rutina';
import { Rutina } from 'src/app/models/rutina';
import { AlertService } from 'src/app/services/alert.service';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { EjercicioService } from 'src/app/services/ejercicio.service';
import { RutinaService } from 'src/app/services/rutina.service';

@Component({
  selector: 'app-nueva-rutina',
  templateUrl: './nueva-rutina.component.html',
  styleUrls: ['./nueva-rutina.component.scss'],
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
export class NuevaRutinaComponent implements OnInit {

  tooltipValidated: boolean = false;
  rutina: Rutina = new Rutina();
  ejercicios: Array<Ejercicio> = [];
  filteredEjercicios: Array<Ejercicio> = [];
  claims: Claim = new Claim();
  searchNombreEjercicio: string = '';

  constructor(private router: Router,
              private authenticateService: AuthenticateService,
              private rutinaService: RutinaService,
              private ejercicioService: EjercicioService,
              private alertService: AlertService) { 
                this.rutina.nombre = '';
                this.rutina.descripcion = '';
                this.rutina.nivel = '';
              }

  ngOnInit(): void {
    this.claims = this.authenticateService.getClaimsUsuario();
    this.getEjercicios();
  }

  searchEjercicios() {
    console.log()
    return this.filteredEjercicios = this.ejercicios.filter(ejercicio => 
        { return (this.searchNombreEjercicio.length > 0 ? ejercicio.nombre.toLowerCase().match(this.searchNombreEjercicio.toLowerCase()) : true)});
  }

  getEjercicios() {
    this.ejercicioService.getEjercicios()
        .subscribe(response => {
          this.ejercicios = response.sort((a,b) => (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0));;
          this.ejercicios.forEach((ejercicio) => { 
            ejercicio.selected = false;
          });
          this.filteredEjercicios = this.ejercicios;
        },
        error => {
          this.alertService.error('Ocurrió un error al cargar los ejercicios.', { autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' })
        });
  }

  createRutina(createRutinaForm: NgForm, ejerciciosLista: Array<Ejercicio>)
  {
    let ejerciciosAsignados = ejerciciosLista.filter(x => x.selected);
    this.rutina.ejercicios = new Array<EjercicioRutina>();

    let anyUndefinedExists = ejerciciosAsignados.find(x => x.cantidadRepeticiones == undefined || x.series == undefined)

    if(anyUndefinedExists != null) {
      this.tooltipValidated = true;
      return;
    }

    if(!createRutinaForm.invalid && ejerciciosAsignados.length != 0) {
      ejerciciosAsignados.forEach((ejercicioAsignado) => { 
        let ejercicioAsignar = new EjercicioRutina();
        
        ejercicioAsignar.idEjercicio = ejercicioAsignado.id;
        ejercicioAsignar.cantidadRepeticiones = ejercicioAsignado.cantidadRepeticiones;
        ejercicioAsignar.series = ejercicioAsignado.series;

        this.rutina.ejercicios.push(ejercicioAsignar);
      });
      this.rutina.idUsuarioCreador = Number(this.claims.primarysid);
      this.rutinaService.createRutina(this.rutina)
        .subscribe(response => {
          this.alertService.success('Se ha creado correctamente la rutina.', { autoClose: true, keepAfterRouteChange: true, symbolAlert: 'check-circle-fill' });
          this.onBack();
        },
        error => {
          this.alertService.error('Ocurrió un error al crear la rutina.',{ autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' });
        });
    }
    else {
      this.tooltipValidated = true;
    }
  }

  setCheckSelected(ejercicio: Ejercicio) {
    if(ejercicio.selected) {
      ejercicio.selected = false;
      this.ejercicios.forEach(x => {
        if(x.id == ejercicio.id) {
          x.selected = false;
        }
      })
    } else {
      ejercicio.selected = true;
      this.ejercicios.forEach(x => {
        if(x.id == ejercicio.id) {
          x.selected = true;
        }
      })
    }
  }

  setCantidadRepeticiones(value: string, ejercicio: Ejercicio) {
    ejercicio.cantidadRepeticiones = parseInt(value);
  }
  
  setSeries(value: string, ejercicio: Ejercicio) {
    ejercicio.series = parseInt(value);
  }

  onBack() {
    this.router.navigateByUrl("main/gestion-rutinas");
  }

}
