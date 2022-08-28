import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '@coreui/angular';
import { Rol } from '../models/rol';
import { Usuario } from '../models/usuario';
import { AlertService } from '../services/alert.service';
import { RolService } from '../services/rol.service';
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
  roles: Array<Rol> = [];
  filteredUsuarios: Array<Usuario> = [];
  mostrarClave: boolean = false;
  loading: boolean = false;
  searchRolUsuario: number = 0;
  searchNombreUsuario: string = '';
  searchApellidoUsuario: string = '';

  constructor(private usuarioService:UsuarioService,
              private rolService: RolService,
              private router: Router,
              private alertService: AlertService) { }

  ngOnInit(): void {
    this.getUsuarios();
    this.getRoles();
  }

  searchUsuarios() {
    if(this.searchNombreUsuario.length == 0 && 
       this.searchApellidoUsuario.length == 0 &&
       (this.searchRolUsuario == 0)) {
      return this.filteredUsuarios = this.usuarios;
    }

    return this.filteredUsuarios = this.usuarios.filter(usuario => 
      { return (this.searchNombreUsuario.length > 0 ? usuario.nombre.toLowerCase().match(this.searchNombreUsuario.toLowerCase()) : true) &&
        (this.searchApellidoUsuario.length > 0 ? usuario.apellido.toLowerCase().match(this.searchApellidoUsuario.toLowerCase()) : true) &&
        ((!(this.searchRolUsuario == 0)) ? usuario.rol.id == this.searchRolUsuario : true)});
  }

  getRoles(){
    this.rolService.getRoles()
    .subscribe(response => {
      this.roles = response;
    });
  }

  getUsuarios() {
    this.loading = true;
    this.usuarioService.getUsuarios()
        .subscribe(response => {
          this.usuarios = response.sort((a,b) => (a.apellido > b.apellido) ? 1 : ((b.apellido > a.apellido) ? -1 : 0));
          this.filteredUsuarios = this.usuarios;
          this.loading = false;
        },
        error => {
          this.loading = false;
          this.alertService.error('Ocurrió un error al cargar los usuarios.',{ autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' })
        });
  }

  createUsuario() {
    this.router.navigateByUrl('main/nuevo-usuario');
  }

  updateUsuario(usuario:Usuario) {
    this.router.navigateByUrl(`main/modificar-usuario/${usuario.id}`, { state: { usuario: usuario } });
  }

  historialUsuario(usuario:Usuario) {
    this.router.navigateByUrl(`main/historial-usuario/${usuario.id}`, { state: { usuario: usuario } });
  }
  
  deleteUsuario() {
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

  showPassword() {
    return this.mostrarClave === true ? this.mostrarClave = false : this.mostrarClave = true 
  }
}
