import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Rutina } from '../models/rutina';
import { AlertService } from '../services/alert.service';
import { RutinaService } from '../services/rutina.service';

@Component({
  selector: 'app-rutinas',
  templateUrl: './rutinas.component.html',
  styleUrls: ['./rutinas.component.scss'],
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
export class RutinasComponent implements OnInit {
  
  rutinas: Array<any> = [];
  loading: boolean = false;
  deletedRutina: Rutina = new Rutina();

  constructor(private rutinaService: RutinaService,
              private router: Router,
              private alertService: AlertService) { }

  ngOnInit(): void {
    this.getRutinas()
  }

  getRutinas() {
    this.loading = true;
    this.rutinaService.getRutinas()
        .subscribe(response => {
          this.rutinas = response;
          this.loading = false;
        },
        error => {
          this.loading = false;
          this.alertService.error('Ocurrió un error al cargar las rutinas.',{ autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' })
        });
  }

  createRutina() {
    this.router.navigateByUrl('main/nueva-rutina');
  }

  asignarRutina(rutina:Rutina) {
    this.router.navigateByUrl(`main/asignar-rutina/${rutina.id}`, { state: { rutina: rutina } });
  }

  deleteRutina() {
    this.rutinaService.deleteRutinaById(this.deletedRutina.id)
        .subscribe(response => {
          this.alertService.success('Se ha eliminado correctamente la rutina.', { autoClose: true, keepAfterRouteChange: true, symbolAlert: 'check-circle-fill' });
          this.getRutinas();
        },
        error => {
          if(error.status == 400){
            this.alertService.error(error.error.detail, { autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' })
          } else {
            this.alertService.error('Ocurrió un error al eliminar la rutina.', { autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' })
          }
          this.loading = false;
          
        });
  }

  setDeleteRutina(rutina:Rutina) {
    this.deletedRutina = rutina;
  }
}
