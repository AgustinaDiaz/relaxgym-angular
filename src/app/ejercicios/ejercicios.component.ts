import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Ejercicio } from '../models/ejercicio';
import { AlertService } from '../services/alert.service';
import { EjercicioService } from '../services/ejercicio.service';


@Component({
  selector: 'app-ejercicios',
  templateUrl: './ejercicios.component.html',
  styleUrls: ['./ejercicios.component.scss'],
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
export class EjerciciosComponent implements OnInit {

  ejercicios: Array<Ejercicio> = [];
  safeSrc: Array<SafeResourceUrl> = [];
  loading: boolean = false;
  cards = new Array().fill({body: ''});
  deletedEjercicio: Ejercicio = new Ejercicio();
  
  constructor(private sanitizer: DomSanitizer,
              private ejercicioService: EjercicioService,
              private router: Router,
              private alertService: AlertService) { }

  ngOnInit(): void {
    this.getEjercicios()
  }

  getEjercicios() {
    this.loading = true;
    this.ejercicioService.getEjercicios()
        .subscribe(response => {
          response.forEach(element => {
            this.safeSrc.push(this.sanitizer.bypassSecurityTrustResourceUrl(element.urlEjercicio));
          });
          this.ejercicios = response;
          this.loading = false;
        },
        error => {
          this.loading = false;
          this.alertService.error('Ocurrió un error al cargar los ejercicios.',{ autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' })
        });
  }

  createEjercicio() {
    this.router.navigateByUrl('main/nuevo-ejercicio');
  }

  deleteEjercicio() {
    this.ejercicioService.deleteEjercicioById(this.deletedEjercicio.id)
        .subscribe(response => {
          this.alertService.success('Se ha eliminado correctamente el ejercicio.', { autoClose: true, keepAfterRouteChange: true, symbolAlert: 'check-circle-fill' });
          this.getEjercicios();
        },
        error => {
          this.loading = false;
          this.alertService.error('Ocurrió un error al eliminar el ejercicio.',{ autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' })
        });
  }

  setDeleteEjercicio(ejercicio:Ejercicio) {
    this.deletedEjercicio = ejercicio;
  }

  updateEjercicio(ejercicio: Ejercicio) {
    this.router.navigateByUrl(`main/modificar-ejercicio/${ejercicio.id}`, { state: { ejercicio: ejercicio } });
  }

}
