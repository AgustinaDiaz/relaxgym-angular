import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Turno } from '../models/turno';

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

  getTurnosByIdUsuario(idUsuario: number): Observable<Array<Turno>>{
    return this.httpClient.get<Array<Turno>>(`${this.url}/Alumno/${idUsuario}`);
  }

  getTurnoById(id: number): Observable<Turno>{
    return this.httpClient.get<Turno>(`${this.url}/${id}`);
  }

  asignarTurno(idTurno: number, idUsuarios: Array<number>): Observable<Turno>{
    return this.httpClient.post<any>(`${this.url}/Asignar`, { idTurno: idTurno, idUsuarios: idUsuarios });
  }

  asignarTurnoById(idTurno: number, idUsuario: number): Observable<Turno>{
    let idUsuarios = new Array<number>(idUsuario).map(Number);
    return this.httpClient.post<any>(`${this.url}/Asignar`, { idTurno: idTurno, idUsuarios:  idUsuarios });
  }

  desasignarAlumno(idTurno: number, idUsuario: number): Observable<Turno>{
    return this.httpClient.post<any>(`${this.url}/Desasignar/${idTurno}/Alumno/${idUsuario}`, {});
  }

  updateTurnoById(turno:Turno): Observable<any>{
    return this.httpClient.put<Turno>(`${this.url}/${turno.id}`, turno);
  }
}