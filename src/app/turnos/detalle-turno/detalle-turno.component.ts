import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Turno } from 'src/app/models/turno';
import { Usuario } from 'src/app/models/usuario';
import { AlertService } from 'src/app/services/alert.service';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import { TurnoService } from 'src/app/services/turno.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-detalle-turno',
  templateUrl: './detalle-turno.component.html',
  styleUrls: ['./detalle-turno.component.scss'],
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
export class DetalleTurnoComponent implements OnInit {

  deletedTurno: Turno = new Turno();
  loading: boolean = false;
  turno: Turno = new Turno;
  alumnos: Array<Usuario> = [];
  entrenadorAsignado: Usuario = new Usuario();
  cuposDisponibles: number = 0;
  searchNombreAlumno: string = '';
  filteredAlumnos: Array<Usuario> = [];
  claims: any;

  constructor(private activatedRoute:ActivatedRoute,
              private router: Router,
              private authenticateService: AuthenticateService,
              private turnoService: TurnoService,
              private usuarioService: UsuarioService,
              private alertService: AlertService) { }

  ngOnInit(): void {
    this.loading = true;
    this.activatedRoute.data.subscribe(data => {
      this.claims = this.authenticateService.getClaimsUsuario();
      this.turno = data['turno'];
      this.entrenadorAsignado = this.turno.usuarios.filter(x => x.usuario.idRol == 2)[0].usuario;
      this.entrenadorAsignado.nombreCompleto = this.entrenadorAsignado.apellido.concat(' ', this.entrenadorAsignado.nombre);
      this.turno.usuarios = this.turno.usuarios.filter(x => x.usuario.idRol == 3);
      this.cuposDisponibles = this.turno.cantidadAlumnos - this.turno.usuarios.length;

      this.usuarioService.getUsuariosByIdRolForTurno(3, this.turno.id).subscribe(response => {
        this.alumnos = response.sort((a,b) => (a.apellido > b.apellido) ? 1 : ((b.apellido > a.apellido) ? -1 : 0));
        this.alumnos = this.alumnos.filter(x => x.idRol == 3);
        this.alumnos.forEach((alumno) => { 
          alumno.selected = false;
          alumno.nombreCompleto = alumno.apellido.concat(' ', alumno.nombre);
        });
        this.filteredAlumnos = this.alumnos;
        this.loading = false;
      },
      error => {
        this.alertService.error('Ocurrió un error al cargar los alumnos.', { autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' })
      });
    })
  }

  setCheckSelected(alumno: Usuario) {
    if(alumno.selected) {
      alumno.selected = false;
      this.alumnos.forEach(x => {
        if(x.id == alumno.id){
          x.selected = false;
        }
      })
    } else {
      alumno.selected = true;
      this.alumnos.forEach(x => {
        if(x.id == alumno.id){
          x.selected = true;
        }
      })
    }
  }

  searchAlumnos() {
    return this.filteredAlumnos = this.alumnos.filter(alumno => 
        { return (this.searchNombreAlumno.length > 0 ? alumno.nombreCompleto.toLowerCase().match(this.searchNombreAlumno.toLowerCase()) : true)});
  }

  existeUsuarioAsignado(idAlumno: number) {
    if(this.turno.usuarios.some(x => x.idUsuario == idAlumno)){
      return true;
    } else {
      return false;
    }
  }

  asignarTurnoById(idRutina: number, idAlumno: number) {
    this.loading = true;
    this.turnoService.asignarTurnoById(idRutina, idAlumno).subscribe(response => {
      this.turnoService.getTurnoById(this.turno.id).subscribe(response => {
        this.turno = response;
        this.turno.usuarios = this.turno.usuarios.filter(x => x.usuario.idRol == 3);
        this.cuposDisponibles = this.turno.cantidadAlumnos - this.turno.usuarios.length;
      });
      this.usuarioService.getUsuariosByIdRolForTurno(3, this.turno.id).subscribe(response => { 
        this.alumnos = response.sort((a,b) => (a.apellido > b.apellido) ? 1 : ((b.apellido > a.apellido) ? -1 : 0));
        this.alumnos = this.alumnos.filter(x => x.idRol == 3);
        this.alumnos.forEach((alumno) => { 
          alumno.selected = false;
          alumno.nombreCompleto = alumno.apellido.concat(' ', alumno.nombre);
        });
        this.filteredAlumnos = this.alumnos;
        this.loading = false;
      });
      this.alertService.success('Se ha asignado correctamente el turno.', { autoClose: true, keepAfterRouteChange: true, symbolAlert: 'check-circle-fill' });
    },
    error => {
      if(error.status == 400){
        this.alertService.error(error.error.detail,{ autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' })
        this.loading = false;
      }
      else{
        this.alertService.error('Ocurrió un error al asignar el turno.',{ autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' })
        this.loading = false;
      }
    });
  }

  asignarTurno(idRutina: number, alumnos: Array<Usuario>) {
    let alumnosAsignados = alumnos.filter(x => x.selected);

    if(this.cuposDisponibles < alumnosAsignados.length){
      this.alertService.error('Los alumnos seleccionados superan el cupo disponible.', { autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' });
      return;
    }

    if(alumnosAsignados.length == 0) {
      this.alertService.error('Debe seleccionar al menos 1 alumno.', { autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' });
      return;
    }

    this.loading = true;
    this.turnoService.asignarTurno(idRutina, alumnosAsignados.map(x => x.id)).subscribe(response => {
      this.turnoService.getTurnoById(this.turno.id).subscribe(response => {
        this.turno = response;
        this.turno.usuarios = this.turno.usuarios.filter(x => x.usuario.idRol == 3);
        this.cuposDisponibles = this.turno.cantidadAlumnos - this.turno.usuarios.length;
      });
      this.usuarioService.getUsuariosByIdRolForTurno(3, this.turno.id).subscribe(response => { 
        this.alumnos = response.sort((a,b) => (a.apellido > b.apellido) ? 1 : ((b.apellido > a.apellido) ? -1 : 0));
        this.alumnos = this.alumnos.filter(x => x.idRol == 3);
        this.alumnos.forEach((alumno) => { 
          alumno.selected = false;
          alumno.nombreCompleto = alumno.apellido.concat(' ', alumno.nombre);
        });
        this.filteredAlumnos = this.alumnos;
        this.loading = false;
      });
      this.alertService.success('Se han asignado correctamente los alumnos.', { autoClose: true, keepAfterRouteChange: true, symbolAlert: 'check-circle-fill' });
    },
    error => {
      this.alertService.error('Ocurrió un error al asignar los alumnos.', { autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' })
    });
  }

  desasignarAlumno(idTurno: number, idUsuario: number) {
    this.loading = true;
    this.turnoService.desasignarAlumno(idTurno, idUsuario).subscribe(response => {
      this.turnoService.getTurnoById(this.turno.id).subscribe(response => { 
        this.turno = response;
        this.turno.usuarios = this.turno.usuarios.filter(x => x.usuario.idRol == 3);
        this.cuposDisponibles = this.turno.cantidadAlumnos - this.turno.usuarios.length;
      });
      this.usuarioService.getUsuariosByIdRolForTurno(3, this.turno.id).subscribe(response => { 
        this.alumnos = response.sort((a,b) => (a.apellido > b.apellido) ? 1 : ((b.apellido > a.apellido) ? -1 : 0));
        this.alumnos = this.alumnos.filter(x => x.idRol == 3);
        this.alumnos.forEach((alumno) => { 
          alumno.selected = false;
          alumno.nombreCompleto = alumno.apellido.concat(' ', alumno.nombre);
        });
        this.filteredAlumnos = this.alumnos;
        this.loading = false;
      });
      this.alertService.success('Se ha desasignado correctamente el alumno.', { autoClose: true, keepAfterRouteChange: true, symbolAlert: 'check-circle-fill' });
    },
    error => {
      this.alertService.error('Ocurrió un error al desasignado correctamente el alumno.', { autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' })
    });
  }

  setDeleteTurno(turno:Turno) {
    this.deletedTurno = turno;
  }

  deleteTurno() {
    this.turnoService.deleteTurnoById(this.deletedTurno.id).subscribe(response => {
      this.alertService.success('Se ha eliminado el turno correctamente el turno.', { autoClose: true, keepAfterRouteChange: true, symbolAlert: 'check-circle-fill' });
      this.onBack();
    },
    error => {
      if(error.status == 400){
        this.alertService.error(error.error.detail,{ autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' })
        this.loading = false;
      }
      else{
        this.alertService.error('Ocurrió un error al eliminar el turno.',{ autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' })
        this.loading = false;
      }
    });
  }


  onBack() {
    if(this.claims.role != '1') {
      this.router.navigateByUrl("main/turnos");
      return;
    }

    this.router.navigateByUrl("main/gestion-turnos");
  }
}
