import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Rol } from '../models/rol';

@Injectable({
  providedIn: 'root'
})
export class RolService {

  private url = environment.urlBackend + '/Roles';

  constructor(private httpClient: HttpClient) { }

  getRoles(): Observable<Array<Rol>>{
    return this.httpClient.get<Array<Rol>>(this.url);
  }
}
