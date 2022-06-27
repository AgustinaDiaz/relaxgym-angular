import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioResolver implements Resolve<Usuario> {
  constructor(private service: UsuarioService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Usuario> {
    return this.service.getUsuarioById(Number(route.paramMap.get('id')));
  }
}