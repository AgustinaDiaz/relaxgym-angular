import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Turno } from '../models/turno';
import { TurnoService } from '../services/turno.service';

@Injectable({
  providedIn: 'root'
})
export class TurnoResolver implements Resolve<Turno> {
  constructor(private service: TurnoService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Turno> {
    return this.service.getTurnoById(Number(route.paramMap.get('id')));
  }
}
