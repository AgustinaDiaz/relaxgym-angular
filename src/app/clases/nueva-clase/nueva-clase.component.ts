import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Clase } from 'src/app/models/clase';
import { AlertService } from 'src/app/services/alert.service';
import { ClaseService } from 'src/app/services/clase.service';

@Component({
  selector: 'app-nueva-clase',
  templateUrl: './nueva-clase.component.html',
  styleUrls: ['./nueva-clase.component.scss'],
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
export class NuevaClaseComponent implements OnInit {

  tooltipValidated: boolean = false;
  clase: Clase = new Clase();
  file:any

  constructor(private claseService: ClaseService,
              private alertService: AlertService,
              private router: Router) { 
    this.clase.nombre = '';
    this.clase.descripcion = '';
  }

  ngOnInit(): void {
  }

  fileChanged(e:any) {
    this.clase.imagen = e.target.files[0];
  }

  createClase(createClaseForm: NgForm)
  {
    if(!createClaseForm.invalid){
      this.claseService.createClase(this.clase)
      .subscribe(response => {
        this.alertService.success('Se ha creado correctamente la clase.', { autoClose: true, keepAfterRouteChange: true, symbolAlert: 'check-circle-fill' });
        this.onBack();
      },
      error => {
        this.alertService.error('Ocurrió un error al crear la clase.',{ autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' });
      });
    }
    else{
      this.tooltipValidated = true;
    }
  }

  onBack() {
    this.router.navigateByUrl("main/gestion-clases");
  }
}
