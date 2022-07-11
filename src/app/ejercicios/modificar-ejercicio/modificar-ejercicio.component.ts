import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ejercicio } from 'src/app/models/ejercicio';
import { TipoEjercicio } from 'src/app/models/tipo-ejercicio';
import { AlertService } from 'src/app/services/alert.service';
import { EjercicioService } from 'src/app/services/ejercicio.service';
import { TipoEjercicioService } from 'src/app/services/tipo-ejercicio.service';

@Component({
  selector: 'app-modificar-ejercicio',
  templateUrl: './modificar-ejercicio.component.html',
  styleUrls: ['./modificar-ejercicio.component.scss'],
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
export class ModificarEjercicioComponent implements OnInit {

  tooltipValidated: boolean = true;
  ejercicio: Ejercicio = new Ejercicio();
  tiposEjercicio: Array<TipoEjercicio> = [];

  constructor(private activatedroute:ActivatedRoute,
              private router: Router,
              private ejercicioService:EjercicioService,
              private tipoEjercicioService: TipoEjercicioService,
              private alertService: AlertService) { }

  ngOnInit(): void {
    this.activatedroute.data.subscribe(data => {
      this.ejercicio = data['ejercicio'];
    })

    this.tipoEjercicioService.getTiposEjercicio()
      .subscribe(response => {
        this.tiposEjercicio = response;
      })
  }

  updateEjercicioById(modificarEjercicioForm: NgForm)
  {
    if(!modificarEjercicioForm.invalid){
      this.ejercicio.idTipoEjercicio = this.ejercicio.tipoEjercicio.id;
      this.ejercicioService.updateEjercicioById(this.ejercicio)
        .subscribe(response => {
          this.alertService.success('Se ha modificado correctamente el ejercicio.', { autoClose: true, keepAfterRouteChange: true, symbolAlert: 'check-circle-fill' });
          this.onBack();
        },
        error => {
          this.alertService.error('Ocurrió un error al modificar el ejercicio.',{ autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' });
        });
    }
  }

  onBack() {
    this.router.navigateByUrl("main/gestion-ejercicios");
  }
}