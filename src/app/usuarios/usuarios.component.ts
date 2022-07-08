import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '@coreui/angular';
import { Usuario } from '../models/usuario';
import { AlertService } from '../services/alert.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
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
export class UsuariosComponent implements OnInit {

  deletedUsuario: Usuario = new Usuario();
  usuarios: Array<Usuario> = [];
  mostrarClave: boolean = false;
  loading: boolean = false;

  constructor(private usuarioService:UsuarioService,
              private router: Router,
              private alertService: AlertService) { }

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios()
  {
    this.loading = true;
    this.usuarioService.getUsuarios()
        .subscribe(response => {
          this.usuarios = response;
          this.loading = false;
        },
        error => {
          this.loading = false;
          this.alertService.error('Ocurrió un error al cargar los usuarios.',{ autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' })
        });
  }

  createUsuario()
  {
    this.router.navigateByUrl('main/nuevo-usuario');
  }

  updateUsuario(usuario:Usuario)
  {
    this.router.navigateByUrl(`main/modificar-usuario/${usuario.id}`, { state: { usuario: usuario } });
  }
  
  deleteUsuario()
  {
    this.usuarioService.deleteUsuarioById(this.deletedUsuario.id)
        .subscribe(response => {
          this.alertService.success('Se ha eliminado correctamente el usuario.', { autoClose: true, keepAfterRouteChange: true, symbolAlert: 'check-circle-fill' });
          this.getUsuarios();
        },
        error => {
          this.loading = false;
          this.alertService.error('Ocurrió un error al eliminar el usuario.',{ autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' })
        });
  }

  setDeleteUser(usuario:Usuario) {
    this.deletedUsuario = usuario;
  }

  showPassword()
  {
    return this.mostrarClave === true ? this.mostrarClave = false : this.mostrarClave = true 
  }
}
