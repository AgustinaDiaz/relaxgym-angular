import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Rutina } from '../models/rutina';
import { RutinaService } from '../services/rutina.service';

@Injectable({
  providedIn: 'root'
})
export class RutinaResolver implements Resolve<Rutina> {
  constructor(private service: RutinaService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Rutina> {
    return this.service.getRutinaById(Number(route.paramMap.get('id')));
  }
}
