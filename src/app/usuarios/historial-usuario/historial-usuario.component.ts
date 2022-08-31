import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Rutina } from 'src/app/models/rutina';
import { Turno } from 'src/app/models/turno';
import { Usuario } from 'src/app/models/usuario';
import { RutinaService } from 'src/app/services/rutina.service';
import { TurnoService } from 'src/app/services/turno.service';

@Component({
  selector: 'app-historial-usuario',
  templateUrl: './historial-usuario.component.html',
  styleUrls: ['./historial-usuario.component.scss'],
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
export class HistorialUsuarioComponent implements OnInit {

  usuario: Usuario = new Usuario();
  mostrarClave: boolean = false;
  turnosAlumno: Array<Turno> = [];
  rutinasAlumno: Array<Rutina> = [];
  
  constructor(private activatedroute: ActivatedRoute,
              private turnoService: TurnoService,
              private rutinaService: RutinaService) { }

  ngOnInit(): void {
    this.activatedroute.data.subscribe(data => {
      this.usuario = data['usuario'];
      this.getTurnosByIdAlumno(this.usuario.id);
      this.getRutinasByIdAlumno(this.usuario.id);
    })
  }

  getTurnosByIdAlumno(idAlumno: number)
  {
    this.turnoService.getTurnos().subscribe(response => {
      this.turnosAlumno = response;
      this.turnosAlumno = this.turnosAlumno.filter(x => x.usuarios.some(x => x.idUsuario == idAlumno));
    })
  }

  getRutinasByIdAlumno(idAlumno: number)
  {
    this.rutinaService.getRutinaByIdUsuario(idAlumno).subscribe(response => {
      this.rutinasAlumno = response
    })
  }

  showPassword()
  {
    return this.mostrarClave === true ? this.mostrarClave = false : this.mostrarClave = true 
  }
}