import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Ejercicio } from 'src/app/models/ejercicio';
import { TipoEjercicio } from 'src/app/models/tipo-ejercicio';
import { AlertService } from 'src/app/services/alert.service';
import { EjercicioService } from 'src/app/services/ejercicio.service';
import { TipoEjercicioService } from 'src/app/services/tipo-ejercicio.service';

@Component({
  selector: 'app-nuevo-ejercicio',
  templateUrl: './nuevo-ejercicio.component.html',
  styleUrls: ['./nuevo-ejercicio.component.scss'],
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
export class NuevoEjercicioComponent implements OnInit {

  tooltipValidated: boolean = false;
  ejercicio: Ejercicio = new Ejercicio();
  tiposEjercicio: Array<TipoEjercicio> = [];

  constructor(private router: Router,
              private ejercicioService: EjercicioService,
              private tipoEjercicioService: TipoEjercicioService,
              private alertService: AlertService) { 
                this.ejercicio.nombre = '';
                this.ejercicio.descripcion = '';
                this.ejercicio.urlEjercicio = '';
                this.ejercicio.tipoEjercicio = new TipoEjercicio();
                this.ejercicio.tipoEjercicio.id = 0;
              }

  ngOnInit(): void {
    this.tipoEjercicioService.getTiposEjercicio()
      .subscribe(response => {
        this.tiposEjercicio = response;
      })
  }

  createEjercicio(createEjercicioForm: NgForm)
  {
    if(!createEjercicioForm.invalid){
      this.ejercicio.idTipoEjercicio = this.ejercicio.tipoEjercicio.id;
      this.ejercicioService.createEjercicio(this.ejercicio)
        .subscribe(response => {
          this.alertService.success('Se ha creado correctamente el ejercicio.', { autoClose: true, keepAfterRouteChange: true, symbolAlert: 'check-circle-fill' });
          this.onBack();
        },
        error => {
          this.alertService.error('Ocurrió un error al crear el ejercicio.',{ autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' });
        });
    }
    else{
      this.tooltipValidated = true;
    }
  }

  onBack() {
    this.router.navigateByUrl("main/gestion-ejercicios/0/ ");
  }

}
