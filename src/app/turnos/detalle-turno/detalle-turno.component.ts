import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Turno } from 'src/app/models/turno';
import { Usuario } from 'src/app/models/usuario';
import { AlertService } from 'src/app/services/alert.service';
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

  turno: Turno = new Turno;
  alumnos: Array<Usuario> = [];
  entrenadorAsignado: Usuario = new Usuario();
  cuposDisponibles: number = 0;
  searchNombreAlumno: string = '';
  filteredAlumnos: Array<Usuario> = [];

  constructor(private activatedRoute:ActivatedRoute,
              private router: Router,
              private turnoService: TurnoService,
              private usuarioService: UsuarioService,
              private alertService: AlertService) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.turno = data['turno'];
      this.cuposDisponibles = this.turno.cantidadAlumnos - this.turno.usuarios.length;
      this.entrenadorAsignado = this.turno.usuarios.filter(x => x.usuario.idRol == 2)[0].usuario;
      this.entrenadorAsignado.nombreCompleto = this.entrenadorAsignado.apellido.concat(' ', this.entrenadorAsignado.nombre);
      this.turno.usuarios = this.turno.usuarios.filter(x => x.usuario.idRol == 3);

      this.usuarioService.getUsuariosByIdRolForTurno(3, this.turno.id).subscribe(response => {
        this.alumnos = response.sort((a,b) => (a.apellido > b.apellido) ? 1 : ((b.apellido > a.apellido) ? -1 : 0));
        this.alumnos = this.alumnos.filter(x => x.idRol == 3);
        this.alumnos.forEach((alumno) => { 
          alumno.selected = false;
          alumno.nombreCompleto = alumno.apellido.concat(' ', alumno.nombre);
        });
        this.filteredAlumnos = this.alumnos;
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
      });
      this.alertService.success('Se han asignado correctamente los alumnos.', { autoClose: true, keepAfterRouteChange: true, symbolAlert: 'check-circle-fill' });
    },
    error => {
      this.alertService.error('Ocurrió un error al asignar los alumnos.', { autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' })
    });
  }

  desasignarAlumno(idTurno: number, idUsuario: number) {
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
      });
      this.alertService.success('Se ha desasignado correctamente el alumno.', { autoClose: true, keepAfterRouteChange: true, symbolAlert: 'check-circle-fill' });
    },
    error => {
      this.alertService.error('Ocurrió un error al desasignado correctamente el alumno.', { autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' })
    });
  }

  onBack() {
    this.router.navigateByUrl("main/gestion-turnos");
  }
}
