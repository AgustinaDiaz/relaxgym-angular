import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { TokenUsuario } from '../models/token-usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url = environment.urlBackend + '/Usuarios';

  constructor(private httpClient: HttpClient) { }

  login(usuario:string, password:string): Observable<TokenUsuario>{
    return this.httpClient.post<TokenUsuario>(`${this.url}/Login`, { nombreUsuario: usuario, claveUsuario: password});
  }

  createUsuario(usuario:Usuario): Observable<any>{
    return this.httpClient.post(this.url, usuario);
  }

  getUsuarios(): Observable<Array<Usuario>>{
    return this.httpClient.get<Array<Usuario>>(this.url);
  }

  getUsuarioById(id: number): Observable<Usuario>{
    return this.httpClient.get<Usuario>(`${this.url}/${id}`);
  }

  getUsuariosByIdRol(idRol: number): Observable<Array<Usuario>>{
    return this.httpClient.get<Array<Usuario>>(`${this.url}/Rol/${idRol}`);
  }

  getUsuariosByIdRolForRutina(idRol: number, idRutina: number): Observable<Array<Usuario>>{
    return this.httpClient.get<Array<Usuario>>(`${this.url}/Rol/${idRol}/Rutina/${idRutina}`);
  }

  getUsuariosByIdRolForTurno(idRol: number, idTurno: number): Observable<Array<Usuario>>{
    return this.httpClient.get<Array<Usuario>>(`${this.url}/Rol/${idRol}/Turno/${idTurno}`);
  }

  updateUsuarioById(usuario:Usuario): Observable<any>{
    return this.httpClient.put<Usuario>(`${this.url}/${usuario.id}`, usuario);
  }

  deleteUsuarioById(id: number): Observable<any>{
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}
