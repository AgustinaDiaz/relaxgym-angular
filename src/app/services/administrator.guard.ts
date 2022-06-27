import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Claim } from '../models/claim';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class AdministratorGuard implements CanActivate {
  
  constructor(private router: Router,
    private alertService: AlertService) { }

  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    var token = localStorage.getItem("tokenUsuario");
    
    if (token == null)
    {
      this.alertService.info('Expiró la sesion. Debe loguearse nuevamente.',{ autoClose: true, keepAfterRouteChange: true, symbolAlert: 'info-fill' })
      this.router.navigate(['/login']);
    }

    token = token as string;

    var decodedToken = this.getDecodedAccessToken(token);
    var claims = new Claim();
    claims = JSON.parse(decodedToken);

    if(claims.role != '1')
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
  
  private getDecodedAccessToken(token: string): any {
    try {
      return atob(token.split('.')[1]);
    } catch(Error) {
      return null;
    }
  }
}
