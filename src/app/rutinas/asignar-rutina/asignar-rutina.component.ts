import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Rutina } from 'src/app/models/rutina';
import { Usuario } from 'src/app/models/usuario';
import { AlertService } from 'src/app/services/alert.service';
import { RutinaService } from 'src/app/services/rutina.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-asignar-rutina',
  templateUrl: './asignar-rutina.component.html',
  styleUrls: ['./asignar-rutina.component.scss'],
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
export class AsignarRutinaComponent implements OnInit {

  rutina: Rutina = new Rutina;
  alumnos: Array<Usuario> = [];
  observacion: string = '';

  constructor(private activatedRoute:ActivatedRoute,
              private router: Router,
              private usuarioService: UsuarioService,
              private rutinaService: RutinaService,
              private alertService: AlertService) {
   }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.rutina = data['rutina'];

      this.usuarioService.getUsuariosByIdRolForRutina(3, this.rutina.id).subscribe(response => {
        this.alumnos = response;
  
        this.alumnos.forEach((alumno) => { 
          alumno.selected = false;
        });
      },
      error => {
        this.alertService.error('Ocurrió un error al cargar los alumnos.', { autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' })
      });
    })
  }

  asignarAlumnos(idRutina: number, alumnos: Array<Usuario>, observacion: string) {
    let alumnosAsignados = alumnos.filter(x => x.selected);

    if(alumnosAsignados.length != 0) {
      this.rutinaService.asignarRutina(idRutina, alumnosAsignados.map(x => x.id), observacion).subscribe(response => {
        this.observacion = ""
        this.rutinaService.getRutinaById(this.rutina.id).subscribe(response => this.rutina = response);
        this.usuarioService.getUsuariosByIdRolForRutina(3, this.rutina.id).subscribe(response => { this.alumnos = response});
        this.alertService.success('Se han asignado correctamente los alumnos.', { autoClose: true, keepAfterRouteChange: true, symbolAlert: 'check-circle-fill' });
      },
      error => {
        this.alertService.error('Ocurrió un error al asignar los alumnos.', { autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' })
      });
    } else {
      this.alertService.error('Debe seleccionar al menos 1 alumno.', { autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' })
    }
  }

  desasignarAlumno(idRutina: number, idUsuario: number) {
    this.rutinaService.desasignarAlumno(idRutina, idUsuario).subscribe(response => {
      this.rutinaService.getRutinaById(this.rutina.id).subscribe(response => this.rutina = response);
      this.usuarioService.getUsuariosByIdRolForRutina(3, this.rutina.id).subscribe(response => { this.alumnos = response});
      this.alertService.success('Se ha desasignado correctamente el alumno.', { autoClose: true, keepAfterRouteChange: true, symbolAlert: 'check-circle-fill' });
    },
    error => {
      this.alertService.error('Ocurrió un error al desasignado correctamente el alumno.', { autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' })
    });

  }

  setCheckSelected(alumno: Usuario) {
    if(alumno.selected) {
      alumno.selected = false;
    } else {
      alumno.selected = true;
    }
  }

  onBack() {
    this.router.navigateByUrl("main/gestion-rutinas");
  }
}