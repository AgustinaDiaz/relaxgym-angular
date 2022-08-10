import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Notificacion } from '../models/notificacion';

@Injectable({
  providedIn: 'root'
})
export class NotificacionService {

  private url = environment.urlBackend + '/Notificaciones';

  constructor(private httpClient: HttpClient) { }

  createNotificacion(notificacion: Notificacion): Observable<any>{
    return this.httpClient.post<any>(this.url, notificacion);
  }

  updateNotificacion(notificacion: Notificacion): Observable<any>{
    return this.httpClient.put<any>(`${this.url}/${notificacion.id}`, notificacion);
  }

  getNotificaciones(): Observable<Array<Notificacion>>{
    return this.httpClient.get<Array<Notificacion>>(this.url);
  }

  getNotificacionesByIdUsuario(idUsuario:number): Observable<Array<Notificacion>>{
    return this.httpClient.get<Array<Notificacion>>(`${this.url}/Usuario/${idUsuario}`);
  }
}
