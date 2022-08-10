import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EstadoNotificacion } from '../models/estado-notificacion';

@Injectable({
  providedIn: 'root'
})
export class EstadoNotificacionService {

  private url = environment.urlBackend + '/EstadosNotificaciones';

  constructor(private httpClient: HttpClient) { }

  getEstadosNotificaciones(): Observable<Array<EstadoNotificacion>>{
    return this.httpClient.get<Array<EstadoNotificacion>>(this.url);
  }
}
