import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import { Claim } from 'src/app/models/claim';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
})
export class AppHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(private router: Router,
              private classToggler: ClassToggleService) {
    super();
  }

  logout()
  {
    localStorage.removeItem('tokenUsuario');
    this.router.navigateByUrl("/login");
  }

  detalleUsuario()
  {
    var token = localStorage.getItem("tokenUsuario") as string;
    var decodedToken = this.getDecodedAccessToken(token);
    var claims = new Claim();
    claims = JSON.parse(decodedToken);
    this.router.navigateByUrl(`main/detalle-usuario/${claims.primarysid}`);
  }

  private getDecodedAccessToken(token: string): any {
    try {
      return atob(token.split('.')[1]);
    } catch(Error) {
      return null;
    }
  }
}
