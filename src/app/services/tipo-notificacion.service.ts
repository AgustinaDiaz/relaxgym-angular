import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TipoNotificacion } from '../models/tipo-notificacion';

@Injectable({
  providedIn: 'root'
})
export class TipoNotificacionService {

  private url = environment.urlBackend + '/TiposNotificaciones';

  constructor(private httpClient: HttpClient) { }

  getTiposNotificaciones(): Observable<Array<TipoNotificacion>>{
    return this.httpClient.get<Array<TipoNotificacion>>(this.url);
  }
}
