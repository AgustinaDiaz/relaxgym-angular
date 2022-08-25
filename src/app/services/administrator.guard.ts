import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Claim } from '../models/claim';
import { AlertService } from './alert.service';
import { AuthenticateService } from './authenticate.service';

@Injectable({
  providedIn: 'root'
})
export class AdministratorGuard implements CanActivate {
  
  constructor(private router: Router,
              private alertService: AlertService,
              private authenticateService: AuthenticateService) { }

  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    var token = localStorage.getItem("tokenUsuario");
    
    if (token == null)
    {
      this.alertService.info('Expiró la sesion. Debe loguearse nuevamente.',{ autoClose: true, keepAfterRouteChange: true, symbolAlert: 'info-fill' })
      this.router.navigate(['/login']);
    }

    token = token as string;

    var claims = this.authenticateService.getClaimsUsuario();

    if(claims.role != '1' && claims.role != '2')
    {
      this.alertService.info('Acceso no permitido.', { autoClose: true, keepAfterRouteChange: true, symbolAlert: 'info-fill' })
      this.router.navigate(['/login']);
    }

    var isTokenExpired = this.tokenExpired(token);

    if(isTokenExpired)
    {
      this.alertService.info('Expiró la sesion. Debe loguearse nuevamente.', { autoClose: true, keepAfterRouteChange: true, symbolAlert: 'info-fill' })
      this.router.navigate(['/login']);
    }
    
    return true;
  }

  private tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }
}
