import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TipoEjercicio } from '../models/tipo-ejercicio';

@Injectable({
  providedIn: 'root'
})
export class TipoEjercicioService {

  private url = environment.urlBackend + '/TiposEjercicio';

  constructor(private httpClient: HttpClient) { }

  getTiposEjercicio(): Observable<Array<TipoEjercicio>>{
    return this.httpClient.get<Array<TipoEjercicio>>(this.url);
  }
}
