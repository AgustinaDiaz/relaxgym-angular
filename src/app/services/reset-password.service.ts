import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SolicitudCambioPassword } from '../models/solicitud-cambio-password';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  private url = environment.urlBackend + '/SolicitudCambioPassword';

  constructor(private httpClient: HttpClient) { }

  createSolicitudCambioPassword(emailUsuario:string): Observable<any>{
    return this.httpClient.post<any>(`${this.url}/${emailUsuario}`, {});
  }

  getSolicitudCambioPasswordById(idWebSolicitud:string): Observable<SolicitudCambioPassword>{
    return this.httpClient.get<SolicitudCambioPassword>(`${this.url}/${idWebSolicitud}`);
  }

  confirmSolicitudCambioPassword(idWebSolicitud:string, antiguaClave:string, nuevaClave:string): Observable<SolicitudCambioPassword>{
    let params = new HttpParams();
    params = params.set('antiguaClave', antiguaClave);
    params= params.set('nuevaClave', nuevaClave);
    
    return this.httpClient.post<SolicitudCambioPassword>(`${this.url}/Confirmar/${idWebSolicitud}`, { }, { params: params } );
  }
}
