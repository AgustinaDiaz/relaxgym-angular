import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Claim } from 'src/app/models/claim';
import { Rutina } from 'src/app/models/rutina';
import { Turno } from 'src/app/models/turno';
import { Usuario } from 'src/app/models/usuario';
import { AuthenticateService } from 'src/app/services/authenticate.service';
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
  
  loading: boolean = false;
  usuario: Usuario = new Usuario();
  mostrarClave: boolean = false;
  turnosAlumno: Array<Turno> = [];
  rutinasAlumno: Array<Rutina> = [];
  claims: Claim = new Claim();
  
  constructor(private activatedroute: ActivatedRoute,
              private turnoService: TurnoService,
              private rutinaService: RutinaService,
              private authenticateService: AuthenticateService,
              private router: Router) { }

  ngOnInit(): void {
    this.claims = this.authenticateService.getClaimsUsuario();
    this.loading = true;
    this.activatedroute.data.subscribe(data => {
      this.usuario = data['usuario'];
      this.getTurnosRutinasByIdAlumno(this.usuario.id);
    })
  }

  getTurnosRutinasByIdAlumno(idAlumno: number)
  {
    this.turnoService.getTurnos().subscribe(response => {
      this.turnosAlumno = response;
      this.turnosAlumno = this.turnosAlumno.filter(x => x.usuarios.some(x => x.idUsuario == idAlumno));

      this.rutinaService.getRutinas()
        .subscribe(response => {
          this.rutinasAlumno = response;
          if (this.usuario.rol.id == 3) {
            this.rutinasAlumno = this.rutinasAlumno.filter(x => x.usuarios.some(x => x.idUsuario == idAlumno));
          } else {
            this.rutinasAlumno = this.rutinasAlumno.filter(x => x.idUsuarioCreador == idAlumno);
          }
          this.loading = false;
      });
    })
  }

  showPassword()
  {
    return this.mostrarClave === true ? this.mostrarClave = false : this.mostrarClave = true 
  }

  onBack() {
    this.router.navigateByUrl("main/gestion-usuarios");
  }
}