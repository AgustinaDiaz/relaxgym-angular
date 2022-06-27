import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { NgForm } from '@angular/forms';
import { EstadoUsuarioService } from 'src/app/services/estado-usuario.service';
import { EstadoUsuario } from 'src/app/models/estado-usuario';
import { Rol } from 'src/app/models/rol';
import { RolService } from 'src/app/services/rol.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-modificar-usuario',
  templateUrl: './modificar-usuario.component.html',
  styleUrls: ['./modificar-usuario.component.scss']
})
export class ModificarUsuarioComponent implements OnInit {

  tooltipValidated: boolean = true;
  usuario: Usuario = new Usuario();
  estadosUsuario: Array<EstadoUsuario> = [];
  roles: Array<Rol> = [];

  constructor(private activatedroute:ActivatedRoute,
              private router: Router,
              private usuarioService:UsuarioService,
              private estadoUsuarioService: EstadoUsuarioService,
              private rolService: RolService,
              private alertService: AlertService) { }

  ngOnInit(): void {
    this.activatedroute.data.subscribe(data => {
      this.usuario = data['usuario'];
    })

    this.rolService.getRoles()
      .subscribe(response => {
        this.roles = response;
      })

    this.estadoUsuarioService.getEstadosUsuario()
      .subscribe(response => {
        this.estadosUsuario = response;
      })
  }

  updateUsuarioById(modificarUsuarioForm: NgForm)
  {
    if(!modificarUsuarioForm.invalid){
      this.usuario.idRol = this.usuario.rol.id;
      this.usuario.idEstadoUsuario = this.usuario.estadoUsuario.id;
      this.usuarioService.updateUsuarioById(this.usuario)
        .subscribe(response => {
          this.alertService.success('Se ha modificado correctamente el usuario.', { autoClose: true, keepAfterRouteChange: true, symbolAlert: 'check-circle-fill' });
          this.onBack();
        },
        error => {
          this.alertService.error('Ocurrió un error al modificar el usuario.',{ autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' });
        });
    }
  }

  onBack() {
    this.router.navigateByUrl("main/gestion-usuarios");
  }
}
