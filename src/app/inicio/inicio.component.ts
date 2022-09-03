import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertService } from '../services/alert.service';
import { UsuarioService } from '../services/usuario.service';
import { getStyle, hexToRgba } from '@coreui/utils/src';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../models/usuario';
import { Claim } from '../models/claim';
import { AuthenticateService } from '../services/authenticate.service';
import { RutinaService } from '../services/rutina.service';
import { Rutina } from '../models/rutina';
import { TurnoService } from '../services/turno.service';
import { ClaseService } from '../services/clase.service';

export interface IChartProps {
  data?: any;
  labels?: any;
  options?: any;
  colors?: any;
  type?: any;
  legend?: any;

  [propName: string]: any;
}

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
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
export class InicioComponent implements OnInit {

  loading: boolean = false;
  rutinasAlumno: Array<Rutina>= [];
  totalAlumnosActivos: string = '0';
  totalEntrenadoresActivos: string = '0';
  totalAdministradoresActivos: string = '0';
  totalUsuariosInactivos: string ='0';
  totalAlumnosLunes: number = 0;
  totalAlumnosMartes: number = 0;
  totalAlumnosMiercoles: number = 0;
  totalAlumnosJueves: number = 0;
  totalAlumnosViernes: number = 0;
  totalAlumnosSabado: number = 0;
  totalAlumnosDomingo: number = 0;
  public mainChart: IChartProps = {};
  claims: Claim = new Claim();
  public trafficRadioGroup = new FormGroup({
    trafficRadio: new FormControl('Month')
  });
  dataCantidadAlumnosTurnos: { labels: string[]; datasets: { label: string; backgroundColor: string; data: number[]; }[]; } | undefined;
  dataCantidadAlumnosClases: { labels: string[], datasets: { data: number[], backgroundColor: string[] }[]; } | undefined;

  constructor(private activatedroute:ActivatedRoute,
              private usuarioService: UsuarioService,
              private alertService: AlertService,
              private authenticateService: AuthenticateService,
              private rutinaService: RutinaService,
              private turnoService: TurnoService,
              private claseService: ClaseService) { }

  ngOnInit(): void {
    this.claims = this.authenticateService.getClaimsUsuario();
    this.loading = true;
    if (this.claims.role == '3') {
      this.getRutinasByIdUsuario();
    }
    if (this.claims.role == '1') {
      this.activatedroute.data.subscribe(data => {
        this.initCharts(data['usuarios']);
      })
      this.getUsuarios();
      this.getTurnos();
    }
  }

  getRutinasByIdUsuario() {
    let idUsuario = this.claims.primarysid as unknown as number;
    this.rutinaService.getRutinaByIdUsuario(idUsuario)
        .subscribe(response => {
          this.rutinasAlumno = response;
          this.loading = false;
        },
        error => {
          this.loading = false;
          this.alertService.error('Ocurrió un error al cargar las rutinas del alumno.',{ autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' })
        });
  }

  getUsuarios()
  {
    this.loading = true;
    this.usuarioService.getUsuarios()
        .subscribe(response => {
          this.totalAdministradoresActivos = response.filter(x => x.idRol == 1 && x.idEstadoUsuario == 1)?.length.toString();
          this.totalEntrenadoresActivos = response.filter(x => x.idRol == 2 && x.idEstadoUsuario == 1)?.length.toString();
          this.totalAlumnosActivos = response.filter(x => x.idRol == 3 && x.idEstadoUsuario == 1)?.length.toString();
          this.totalUsuariosInactivos = response.filter(x => x.idEstadoUsuario == 2)?.length.toString();
          this.loading = false;
        },
        error => {
          this.loading = false;
          this.alertService.error('Ocurrió un error estadisticas de los usuarios.',{ autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' })
        });
  }

  getTurnos()
  {
    this.loading = true;
    this.turnoService.getTurnos()
        .subscribe(responseTurno => {
          this.dataCantidadAlumnosTurnos = {
            labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
            datasets: [
              {
                label: 'Cantidad de Alumnos',
                backgroundColor: '#3c4b64',
                data: []
              }
            ]
          };
          responseTurno.filter(x => new Date(x.fechaHora).toLocaleDateString('es-ES', { weekday: 'long' }) == 'lunes')?.forEach(x => this.totalAlumnosLunes = this.totalAlumnosLunes + x.usuarios?.length);
          responseTurno.filter(x => new Date(x.fechaHora).toLocaleDateString('es-ES', { weekday: 'long' }) == 'martes')?.forEach(x => this.totalAlumnosMartes = this.totalAlumnosMartes + x.usuarios?.length);
          responseTurno.filter(x => new Date(x.fechaHora).toLocaleDateString('es-ES', { weekday: 'long' }) == 'miércoles')?.forEach(x => this.totalAlumnosMiercoles = this.totalAlumnosMiercoles + x.usuarios?.length);
          responseTurno.filter(x => new Date(x.fechaHora).toLocaleDateString('es-ES', { weekday: 'long' }) == 'jueves')?.forEach(x => this.totalAlumnosJueves = this.totalAlumnosJueves + x.usuarios?.length);
          responseTurno.filter(x => new Date(x.fechaHora).toLocaleDateString('es-ES', { weekday: 'long' }) == 'viernes')?.forEach(x => this.totalAlumnosViernes = this.totalAlumnosViernes + x.usuarios?.length);
          responseTurno.filter(x => new Date(x.fechaHora).toLocaleDateString('es-ES', { weekday: 'long' }) == 'sábado')?.forEach(x => this.totalAlumnosSabado = this.totalAlumnosSabado + x.usuarios?.length);
          responseTurno.filter(x => new Date(x.fechaHora).toLocaleDateString('es-ES', { weekday: 'long' }) == 'domingo')?.forEach(x => this.totalAlumnosDomingo = this.totalAlumnosDomingo + x.usuarios?.length);

          this.dataCantidadAlumnosTurnos?.datasets[0].data.push(this.totalAlumnosLunes);
          this.dataCantidadAlumnosTurnos?.datasets[0].data.push(this.totalAlumnosMartes);
          this.dataCantidadAlumnosTurnos?.datasets[0].data.push(this.totalAlumnosMiercoles);
          this.dataCantidadAlumnosTurnos?.datasets[0].data.push(this.totalAlumnosJueves);
          this.dataCantidadAlumnosTurnos?.datasets[0].data.push(this.totalAlumnosViernes);
          this.dataCantidadAlumnosTurnos?.datasets[0].data.push(this.totalAlumnosSabado);
          this.dataCantidadAlumnosTurnos?.datasets[0].data.push(this.totalAlumnosDomingo);

          this.claseService.getClases().subscribe(responseClase => {
            this.dataCantidadAlumnosClases = {
              labels: [],
              datasets: [
                {
                  backgroundColor: [],
                  data: []
                }
              ]
            };
            responseClase.forEach(clase => {
              let cantidadAlumnosPorClase = 0;
              responseTurno.filter(x => x.clase.id == clase.id)?.forEach(x => cantidadAlumnosPorClase = cantidadAlumnosPorClase + x.usuarios?.length)
              this.dataCantidadAlumnosClases?.labels.push(clase.nombre);
              this.dataCantidadAlumnosClases?.datasets[0].backgroundColor.push('#'+(0x1000000+Math.random()*0xffffff).toString(16).substr(1,6));
              this.dataCantidadAlumnosClases?.datasets[0].data.push(cantidadAlumnosPorClase);
            })
          }); 
          this.loading = false;
        },
        error => {
          this.loading = false;
          this.alertService.error('Ocurrió un error estadisticas de los usuarios.',{ autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' })
        });
  }

  initCharts(usuarios: Array<Usuario>): void {
    const brandInfo = getStyle('--cui-info') ?? '#20a8d8';
    const brandInfoBg = hexToRgba(getStyle('--cui-info'), 10) ?? '#20a8d8';

    let labels: string[] = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octube',
      'Noviembre',
      'Diciembre'
    ];

    this.mainChart['elements'] = 12;
    this.mainChart['Usuarios'] = [];

    for (let i = 0; i <= this.mainChart['elements']; i++) {
      var usuariosForMonth = usuarios.filter(x => new Date(x.fechaAlta).getMonth() == i);
      this.mainChart['Usuarios'].push(usuariosForMonth.length);
    }
    
    const colors = [
      {
        backgroundColor: brandInfoBg,
        borderColor: brandInfo,
        pointHoverBackgroundColor: brandInfo,
        borderWidth: 2,
        fill: true
      }
    ];

    const datasets = [
      {
        data: this.mainChart['Usuarios'],
        label: 'Cantidad',
        ...colors[0]
      }
    ];

    const plugins = {
      legend: {
        display: false
      },
      tooltip: {
        callbacks: {
          labelColor: function(context: any) {
            return {
              backgroundColor: context.dataset.borderColor
            };
          }
        }
      }
    };

    const options = {
      maintainAspectRatio: false,
      plugins,
      scales: {
        x: {
          grid: {
            drawOnChartArea: false
          }
        },
        y: {
          beginAtZero: true,
          max: 40,
          ticks: {
            maxTicksLimit: 5,
            stepSize: Math.ceil(10 / 5)
          }
        }
      },
      elements: {
        line: {
          tension: 0.4
        },
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3
        }
      }
    };

    this.mainChart.type = 'line';
    this.mainChart.options = options;
    this.mainChart.data = {
      datasets,
      labels
    };
    
    this.loading = false;
  }
}
