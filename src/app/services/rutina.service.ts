import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Rutina } from '../models/rutina';

@Injectable({
  providedIn: 'root'
})
export class RutinaService {

  private url = environment.urlBackend + '/Rutinas';

  constructor(private httpClient: HttpClient) { }

  createRutina(rutina: Rutina): Observable<any>{
    return this.httpClient.post<any>(this.url, rutina);
  }

  getRutinas(): Observable<Array<Rutina>>{
    return this.httpClient.get<Array<Rutina>>(this.url);
  }

  getRutinaById(id: number): Observable<Rutina>{
    return this.httpClient.get<Rutina>(`${this.url}/${id}`);
  }

  deleteRutinaById(id: number): Observable<any>{
    return this.httpClient.delete<any>(`${this.url}/${id}`);
  }

  asignarRutina(idRutina: number, idUsuarios: Array<number>, observacion: string): Observable<any>{
    return this.httpClient.post<any>(`${this.url}/Asignar`, { idRutina: idRutina, idUsuarios: idUsuarios, observacion: observacion });
  }

  desasignarAlumno(idRutina: number, idUsuario: number): Observable<any>{
    return this.httpClient.post<any>(`${this.url}/Desasignar/${idRutina}/Alumno/${idUsuario}`, {});
  }
}
