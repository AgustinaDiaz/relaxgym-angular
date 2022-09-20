import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Clase } from '../models/clase';
import { ClaseService } from '../services/clase.service';

@Injectable({
  providedIn: 'root'
})
export class ClaseResolver implements Resolve<Clase> {
  constructor(private service: ClaseService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Clase> {
    return this.service.getClaseById(Number(route.paramMap.get('id')));
  }
}