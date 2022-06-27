import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    var Authorization = localStorage.getItem('tokenUsuario') ;

    if (Authorization == null)
    {
      Authorization = '';
    }

    Authorization = `Bearer ${Authorization}` as string;

    return next.handle(request.clone({ setHeaders: { Authorization } }));
  }
}
