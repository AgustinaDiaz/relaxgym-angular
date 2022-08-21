import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Claim } from '../models/claim';
import { Rutina } from '../models/rutina';
import { Usuario } from '../models/usuario';
import { AlertService } from '../services/alert.service';
import { AuthenticateService } from '../services/authenticate.service';
import { RutinaService } from '../services/rutina.service';
import { UsuarioService } from '../services/usuario.service';

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
  
  rutinas: Array<Rutina> = [];
  filteredRutinas: Array<Rutina> = [];
  alumnos: Array<Usuario> = [];
  entrenadoresAdmin: Array<Usuario> = []
  loading: boolean = false;
  deletedRutina: Rutina = new Rutina();
  claims: Claim = new Claim();
  keyword: string = 'nombreCompleto';
  searchAlumno: number = 0;
  searchEntrenador: number = 0;

  constructor(private rutinaService: RutinaService,
              private usuarioService: UsuarioService,
              private router: Router,
              private alertService: AlertService,
              private authenticateService:AuthenticateService) { }

  ngOnInit(): void {
    this.claims = this.authenticateService.getClaimsUsuario();
    if(this.claims.role == '1' || this.claims.role == '2') {
      this.getRutinas();
      this.getEntrenadores();
      this.getAlumnos();
    } else {
      this.getRutinasByIdUsuario()
    }
  }

  searchRutinas() {
    if(this.searchAlumno == 0 && 
       this.searchEntrenador == 0) {
      return this.filteredRutinas = this.rutinas;
    }
    return this.filteredRutinas = this.rutinas.filter(rutina => 
        { return ((!(this.searchAlumno == 0)) ? rutina.usuarios.some(x => x.idUsuario == this.searchAlumno) : true) &&
                 ((!(this.searchEntrenador == 0)) ? rutina.idUsuarioCreador == this.searchEntrenador : true) });
  }

  getEntrenadores(){
    this.usuarioService.getUsuarios().subscribe(usuarios => {
      this.entrenadoresAdmin = usuarios.sort((a,b) => (a.apellido > b.apellido) ? 1 : ((b.apellido > a.apellido) ? -1 : 0));
      this.entrenadoresAdmin = this.entrenadoresAdmin.filter(x => x.rol.id == 1 || x.rol.id == 2)
      this.entrenadoresAdmin.forEach(x => x.nombreCompleto = x.apellido.concat(' ', x.nombre));
    },
    error => {
      this.alertService.error('Ocurrió un error al cargar los entrenadores/administradores.', { autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' })
    });
  }

  getAlumnos(){
    this.usuarioService.getUsuariosByIdRol(3).subscribe(response => {
      this.alumnos = response.sort((a,b) => (a.apellido > b.apellido) ? 1 : ((b.apellido > a.apellido) ? -1 : 0));
      this.alumnos.forEach(x => x.nombreCompleto = x.apellido.concat(' ', x.nombre))
    },
    error => {
      this.alertService.error('Ocurrió un error al cargar los alumnos.', { autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' })
    });
  }

  getRutinasByIdUsuario() {
    this.loading = true;
    let idUsuario = this.claims.primarysid as unknown as number;
    this.rutinaService.getRutinaByIdUsuario(idUsuario)
        .subscribe(response => {
          this.rutinas = response;
          this.loading = false;
        },
        error => {
          this.loading = false;
          this.alertService.error('Ocurrió un error al cargar las rutinas.',{ autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' })
        });
  }

  getRutinas() {
    this.loading = true;
    this.rutinaService.getRutinas()
        .subscribe(response => {
          this.rutinas = response;
          this.filteredRutinas = this.rutinas;
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

  selectEventEntrenadores(item: any) {
    this.searchEntrenador = item.id;
  }

  selectEventAlumnos(item: any) {
    this.searchAlumno = item.id;
  }

  deleteEventSearchAlumno() { 
    this.searchAlumno = 0;
  }

  deleteEventSearchEntrenador() { 
    this.searchEntrenador = 0;
  }
}
