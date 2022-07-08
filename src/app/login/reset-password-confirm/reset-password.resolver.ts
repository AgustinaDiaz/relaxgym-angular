import { Injectable } from '@angular/core';
import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { SolicitudCambioPassword } from 'src/app/models/solicitud-cambio-password';
import { ResetPasswordService } from 'src/app/services/reset-password.service';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordResolver implements Resolve<SolicitudCambioPassword> {
  constructor(private service: ResetPasswordService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<SolicitudCambioPassword> {
    return this.service.getSolicitudCambioPasswordById(route.paramMap.get('id') as string);
  }
}
