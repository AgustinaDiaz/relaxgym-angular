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

  getRutinas(): Observable<Array<Rutina>>{
    return this.httpClient.get<Array<Rutina>>(this.url);
  }

}
