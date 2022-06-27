import { Component } from '@angular/core';
import { FooterComponent } from '@coreui/angular';

@Component({
  selector: 'app-footer',
  templateUrl: './app-footer.component.html',
  styleUrls: ['./app-footer.component.scss'],
})
export class AppFooterComponent extends FooterComponent {
  constructor() {
    super();
  }
}