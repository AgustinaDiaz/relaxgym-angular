import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Ejercicio } from 'src/app/models/ejercicio';
import { EjercicioRutina } from 'src/app/models/ejercicio-rutina';
import { Rutina } from 'src/app/models/rutina';
import { AlertService } from 'src/app/services/alert.service';
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

  constructor(private router: Router,
              private rutinaService: RutinaService,
              private ejercicioService: EjercicioService,
              private alertService: AlertService) { 
                this.rutina.nombre = '';
                this.rutina.descripcion = '';
                this.rutina.nivel = '';
              }

  ngOnInit(): void {
    this.getEjercicios();
  }

  getEjercicios() {
    this.ejercicioService.getEjercicios()
        .subscribe(response => {
          this.ejercicios = response;
          this.ejercicios.forEach((ejercicio) => { 
            ejercicio.selected = false;
          });
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

      this.rutinaService.createRutina(this.rutina)
        .subscribe(response => {
          this.alertService.success('Se ha creado correctamente la rutina.', { autoClose: true, keepAfterRouteChange: true, symbolAlert: 'check-circle-fill' });
          this.onBack();
        },
        error => {
          this.alertService.error('Ocurrió un error al crear el usuario.',{ autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' });
        });
    }
    else {
      this.tooltipValidated = true;
    }
  }

  setCheckSelected(ejercicio: Ejercicio) {
    if(ejercicio.selected) {
      ejercicio.selected = false;
    } else {
      ejercicio.selected = true;
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
