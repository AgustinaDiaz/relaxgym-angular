import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Clase } from '../models/clase';
import { AlertService } from '../services/alert.service';
import { ClaseService } from '../services/clase.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  styleUrls: ['./clases.component.scss'],
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
export class ClasesComponent implements OnInit {

  deletedClase: Clase = new Clase();
  clases: Array<Clase> = [];
  filteredClases: Array<Clase> = [];
  loading: boolean = false;
  searchNombreClase: string = '';

  constructor(private claseService: ClaseService,
              private _sanitizer: DomSanitizer,
              private router: Router,
              private alertService: AlertService) { }

  ngOnInit(): void {
    this.loading = true;
    this.getClases();
  }

  searchClases() {
    if(this.searchNombreClase.length == 0) {
      return this.filteredClases = this.clases;
    }

    return this.filteredClases = this.clases.filter(clase => 
      { return (this.searchNombreClase.length > 0 ? clase.nombre.toLowerCase().match(this.searchNombreClase.toLowerCase()) : true) });
  }

  getClases() {
    this.claseService.getClases()
        .subscribe(response => {
          this.clases = response.sort((a,b) => (a.nombre > b.nombre) ? 1 : ((b.nombre > a.nombre) ? -1 : 0));
          this.filteredClases = this.clases;
          this.filteredClases.forEach(x => {
            x.imagen = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + x.imagen);
          });
          this.loading = false;
        },
        error => {
          this.alertService.error('Ocurrió un error al cargar las clases.',{ autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' })
          this.loading = false;
        });
  }

  createClase() {
    this.router.navigateByUrl('main/nueva-clase');
  }

  updateClase(clase: Clase) {
    this.router.navigateByUrl(`main/modificar-clase/${clase.id}`, { state: { clase: clase } });
  }

  deleteClase() {
    this.loading = true;
    this.claseService.deleteClaseById(this.deletedClase.id)
        .subscribe(response => {
          this.alertService.success('Se ha eliminado correctamente la clase.', { autoClose: true, keepAfterRouteChange: true, symbolAlert: 'check-circle-fill' });
          this.getClases();
        },
        error => {
          this.alertService.error('Ocurrió un error al eliminar la clase.',{ autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' })
          this.loading = false;
        });
  }

  setDeleteClase(clase: Clase) {
    this.deletedClase = clase;
  }
}
