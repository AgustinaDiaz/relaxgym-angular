import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Turno } from '../models/turno';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class TurnoService {

  private url = environment.urlBackend + '/Turnos';

  constructor(private httpClient: HttpClient) { }

  createTurno(turno:Turno): Observable<any>{
    return this.httpClient.post(this.url, turno);
  }

  getTurnos(): Observable<Array<Turno>>{
    return this.httpClient.get<Array<Turno>>(this.url);
  }

  getTurnoById(id: number): Observable<Turno>{
    return this.httpClient.get<Turno>(`${this.url}/${id}`);
  }

  desasignarAlumno(idTurno: number, idUsuario: number): Observable<Turno>{
    return this.httpClient.post<any>(`${this.url}/Desasignar/${idTurno}/Alumno/${idUsuario}`, {});
  }

  updateTurnoById(turno:Turno): Observable<any>{
    return this.httpClient.put<Turno>(`${this.url}/${turno.id}`, turno);
  }
}