import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {  CalendarOptions, FullCalendarComponent } from '@fullcalendar/angular';
import esLocale from '@fullcalendar/core/locales/es';
import { Turno } from '../models/turno';
import { AlertService } from '../services/alert.service';
import { TurnoService } from '../services/turno.service';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.scss'],
  animations: [
    trigger('inOut', [
      transition('void => *', [ 
        style({ opacity: 0 }),          
        animate('500ms',
          style({ opacity: 1 }) 
        )
      ]),
      transition('* => void', [
        animate('500ms', 
          style({ opacity: 0 })
        ) 
      ])
    ]) 
  ]
})
export class TurnosComponent implements OnInit {

  @ViewChild('calendar')
  calendarComponent!: FullCalendarComponent;

  calendarOptions: CalendarOptions = {
    initialView: 'timeGridWeek',
    locale: esLocale,
    height: 650,
    eventClick: this.handleTurnoEventClick.bind(this),
    events: []
  };

  turnos: Array<Turno> = new Array<Turno>();

  constructor(private router: Router,
              private turnoService: TurnoService,
              private alertService: AlertService) { }

  ngOnInit(): void {
    this.turnoService.getTurnos()
        .subscribe(response => {
          this.turnos = response;
          this.turnos.forEach(turno => {
            this.calendarComponent.getApi().addEvent({ title: turno.clase.nombre, date: turno.fechaHora, turno: turno });
          });
        },
        error => {
          this.alertService.error('Ocurrió un error al cargar los turnos.',{ autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' })
        });
  }

  handleTurnoEventClick(turnoEvent: any) {
    this.router.navigateByUrl(`main/detalle-turno/${turnoEvent.event._def.extendedProps.turno.id}`, { state: { turno: turnoEvent.event._def.extendedProps.turno } });
  }

}
