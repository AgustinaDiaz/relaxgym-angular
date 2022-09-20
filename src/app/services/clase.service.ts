import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Clase } from '../models/clase';

@Injectable({
  providedIn: 'root'
})
export class ClaseService {

  private url = environment.urlBackend + '/Clases';

  constructor(private httpClient: HttpClient) { }

  getClases(): Observable<Array<Clase>>{
    return this.httpClient.get<Array<Clase>>(this.url);
  }

  createClase(clase: Clase): Observable<any>{
    let formData: FormData = new FormData();
    formData.append('imagen', clase.imagen);
    formData.append('nombre', clase.nombre);
    formData.append('descripcion', clase.descripcion);

    return this.httpClient.post(this.url, formData);
  }

  updateClase(clase: Clase): Observable<any>{
    let formData: FormData = new FormData();
    formData.append('imagen', clase.imagen);
    formData.append('nombre', clase.nombre);
    formData.append('descripcion', clase.descripcion);

    return this.httpClient.put(`${this.url}/${clase.id}`, formData);
  }

  getClaseById(id: number): Observable<Clase>{
    return this.httpClient.get<Clase>(`${this.url}/${id}`);
  }

  deleteClaseById(id: number): Observable<any>{
    return this.httpClient.delete(`${this.url}/${id}`);
  }
}