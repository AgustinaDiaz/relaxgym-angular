import { Injectable } from '@angular/core';
import { Claim } from '../models/claim';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor() { }

  getClaimsUsuario() {
    var token = localStorage.getItem("tokenUsuario") as string;
    var decodedToken = this.getDecodedAccessToken(token);
    return JSON.parse(decodedToken);
  }

  private getDecodedAccessToken(token: string): any {
    try {
      return atob(token.split('.')[1]);
    } catch(Error) {
      return null;
    }
  }
}
