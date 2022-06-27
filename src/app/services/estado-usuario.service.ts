import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EstadoUsuario } from '../models/estado-usuario';

@Injectable({
  providedIn: 'root'
})
export class EstadoUsuarioService {

  private url = environment.urlBackend + '/EstadosUsuario';

  constructor(private httpClient: HttpClient) { }

  getEstadosUsuario(): Observable<Array<EstadoUsuario>>{
    return this.httpClient.get<Array<EstadoUsuario>>(this.url);
  }
}
