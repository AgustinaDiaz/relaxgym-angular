import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Rutina } from '../models/rutina';
import { AlertService } from '../services/alert.service';
import { RutinaService } from '../services/rutina.service';

@Component({
  selector: 'app-rutinas',
  templateUrl: './rutinas.component.html',
  styleUrls: ['./rutinas.component.scss']
})
export class RutinasComponent implements OnInit {
  
  rutinas: Array<any> = [];
  loading: boolean = false;

  constructor(private rutinaService: RutinaService,
              private router: Router,
              private alertService: AlertService) { }

  ngOnInit(): void {
    this.getEjercicios()
  }

  getEjercicios() {
    this.loading = true;
    this.rutinaService.getRutinas()
        .subscribe(response => {
          this.rutinas = response;
          console.log(this.rutinas);
          this.loading = false;
        },
        error => {
          this.loading = false;
          this.alertService.error('Ocurrió un error al cargar las rutinas.',{ autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' })
        });
  }
}
