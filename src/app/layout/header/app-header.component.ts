import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';

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
}
