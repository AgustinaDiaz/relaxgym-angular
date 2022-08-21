import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Claim } from '../models/claim';
import { Ejercicio } from '../models/ejercicio';
import { TipoEjercicio } from '../models/tipo-ejercicio';
import { AlertService } from '../services/alert.service';
import { AuthenticateService } from '../services/authenticate.service';
import { EjercicioService } from '../services/ejercicio.service';
import { TipoEjercicioService } from '../services/tipo-ejercicio.service';


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
  filteredEjercicios: Array<Ejercicio> = [];
  safeSrc: Array<SafeResourceUrl> = [];
  loading: boolean = false;
  cards = new Array().fill({body: ''});
  deletedEjercicio: Ejercicio = new Ejercicio();
  tiposEjercicios: Array<TipoEjercicio> = []; 
  claims: Claim = new Claim();
  searchTipoEjercicio: number = 0;
  searchNombreEjercicio: string = '';
  
  constructor(private sanitizer: DomSanitizer,
              private ejercicioService: EjercicioService,
              private tipoEjercicioService: TipoEjercicioService,
              private router: Router,
              private alertService: AlertService,
              private authenticateService:AuthenticateService,
              private activatedroute: ActivatedRoute) {
                
               }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe( paramMap => {
      this.searchNombreEjercicio = paramMap.get('nombreEjercicio') as string;
      if(this.searchNombreEjercicio == ' ') {
        this.searchNombreEjercicio = '';
      }
      this.searchTipoEjercicio = paramMap.get('tipoEjercicio') as unknown as number;
      if(this.searchTipoEjercicio == 0) {
        this.searchTipoEjercicio == 0
      }
      this.claims = this.authenticateService.getClaimsUsuario();
      this.getTipoEjercicios();
    })
  }

  searchEjercicios() {
    if(this.searchNombreEjercicio.length == 0 && 
       (this.searchTipoEjercicio == 0)) {
      return this.filteredEjercicios = this.ejercicios;
    }
    return this.filteredEjercicios = this.ejercicios.filter(ejercicio => 
        { return (this.searchNombreEjercicio.length > 0 ? ejercicio.nombre.toLowerCase().match(this.searchNombreEjercicio.toLowerCase()) : true) &&
                 ((!(this.searchTipoEjercicio == 0)) ? ejercicio.tipoEjercicio.id == this.searchTipoEjercicio : true)});
  }

  getTipoEjercicios() {
    this.tipoEjercicioService.getTiposEjercicio()
    .subscribe(response => {
      this.tiposEjercicios = response;
      this.getEjercicios()
    })
  }

  getEjercicios() {
    this.loading = true;
    this.ejercicioService.getEjercicios()
        .subscribe(response => {
          response.forEach(element => {
            this.safeSrc.push(this.sanitizer.bypassSecurityTrustResourceUrl(element.urlEjercicio));
          });
          this.ejercicios = response;
          this.filteredEjercicios = response;
          this.loading = false;
          this.searchEjercicios();
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
