import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateGuard implements CanActivate {

  constructor(private router: Router,
              private alertService: AlertService) { }

  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    var token = localStorage.getItem("tokenUsuario");
    
    if (token == null)
    {
      this.router.navigate(['/login']);
      this.alertService.info('Expiró la sesion. Debe loguearse nuevamente.',{ autoClose: true, keepAfterRouteChange: true, symbolAlert: 'info-fill' })
    }

    token = token as string;

    var isTokenExpired = this.tokenExpired(token);

    if(isTokenExpired)
    {
      this.router.navigate(['/login']);
      this.alertService.info('Expiró la sesion. Debe loguearse nuevamente.', { autoClose: true, keepAfterRouteChange: true, symbolAlert: 'info-fill' })
    }
    
    return true;
  }

  private tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }
}
