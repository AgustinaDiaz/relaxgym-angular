import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ejercicio } from '../models/ejercicio';

@Injectable({
  providedIn: 'root'
})
export class EjercicioService {

  private url = environment.urlBackend + '/Ejercicios';

  constructor(private httpClient: HttpClient) { }

  createEjercicio(ejercicio:Ejercicio): Observable<any>{
    console.log(ejercicio);
    return this.httpClient.post(this.url, ejercicio);
  }

  getEjercicios(): Observable<Array<Ejercicio>>{
    return this.httpClient.get<Array<Ejercicio>>(this.url);
  }

  getEjercicioById(id: number): Observable<Ejercicio>{
    return this.httpClient.get<Ejercicio>(`${this.url}/${id}`);
  }

  updateEjercicioById(ejercicio:Ejercicio): Observable<any>{
    return this.httpClient.put<Ejercicio>(`${this.url}/${ejercicio.id}`, ejercicio);
  }

  deleteEjercicioById(id: number): Observable<any>{
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}
