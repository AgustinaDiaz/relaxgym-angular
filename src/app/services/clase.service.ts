import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
}