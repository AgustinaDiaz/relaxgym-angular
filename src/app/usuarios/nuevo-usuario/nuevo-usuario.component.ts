import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EstadoUsuario } from 'src/app/models/estado-usuario';
import { Rol } from 'src/app/models/rol';
import { Usuario } from 'src/app/models/usuario';
import { AlertService } from 'src/app/services/alert.service';
import { EstadoUsuarioService } from 'src/app/services/estado-usuario.service';
import { RolService } from 'src/app/services/rol.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-nuevo-usuario',
  templateUrl: './nuevo-usuario.component.html',
  styleUrls: ['./nuevo-usuario.component.scss']
})
export class NuevoUsuarioComponent implements OnInit {

  tooltipValidated: boolean = false;
  usuario: Usuario = new Usuario();
  estadosUsuario: Array<EstadoUsuario> = [];
  roles: Array<Rol> = [];

  constructor(private router: Router,
              private usuarioService: UsuarioService,
              private estadoUsuarioService: EstadoUsuarioService,
              private rolService: RolService,
              private alertService: AlertService) { 
                this.usuario.nombre = '';
                this.usuario.apellido = '';
                this.usuario.email = '';
                this.usuario.nombreUsuario = '';
                this.usuario.claveUsuario = '';
                this.usuario.rol = new Rol();
                this.usuario.rol.id = 0;
                this.usuario.estadoUsuario = new EstadoUsuario();
                this.usuario.estadoUsuario.id = 0;
              }

  ngOnInit(): void {
    this.rolService.getRoles()
      .subscribe(response => {
        this.roles = response;
      })

    this.estadoUsuarioService.getEstadosUsuario()
      .subscribe(response => {
        this.estadosUsuario = response;
      })
  }

  createUsuario(createUsuarioForm: NgForm)
  {
    if(!createUsuarioForm.invalid){
      this.usuario.idRol = this.usuario.rol.id;
      this.usuario.idEstadoUsuario = this.usuario.estadoUsuario.id;
      this.usuarioService.createUsuario(this.usuario)
        .subscribe(response => {
          this.alertService.success('Se ha creado correctamente el usuario.', { autoClose: true, keepAfterRouteChange: true, symbolAlert: 'check-circle-fill' });
          this.onBack();
        },
        error => {
          this.alertService.error('Ocurrió un error al crear el usuario.',{ autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' });
        });
    }
    else{
      this.tooltipValidated = true;
    }
  }

  onBack() {
    this.router.navigateByUrl("main/gestion-usuarios");
  }

}
