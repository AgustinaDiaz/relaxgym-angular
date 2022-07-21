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

  getTurnos(): Observable<Array<Turno>>{
    return this.httpClient.get<Array<Turno>>(this.url);
  }

  getTurnoById(id: number): Observable<Turno>{
    return this.httpClient.get<Turno>(`${this.url}/${id}`);
  }
}
