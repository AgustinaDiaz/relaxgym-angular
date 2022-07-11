import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Ejercicio } from '../models/ejercicio';
import { EjercicioService } from '../services/ejercicio.service';

@Injectable({
  providedIn: 'root'
})
export class EjercicioResolver implements Resolve<Ejercicio> {
  constructor(private service: EjercicioService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Ejercicio> {
    return this.service.getEjercicioById(Number(route.paramMap.get('id')));
  }
}