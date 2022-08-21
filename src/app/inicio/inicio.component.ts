import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertService } from '../services/alert.service';
import { UsuarioService } from '../services/usuario.service';
import { getStyle, hexToRgba } from '@coreui/utils/src';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../models/usuario';

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
  totalAlumnosActivos: string = '0';
  totalEntrenadoresActivos: string = '0';
  totalAdministradoresActivos: string = '0';
  totalUsuariosInactivos: string ='0';
  public mainChart: IChartProps = {};
  public trafficRadioGroup = new FormGroup({
    trafficRadio: new FormControl('Month')
  });

  constructor(private activatedroute:ActivatedRoute,
              private usuarioService: UsuarioService,
              private alertService: AlertService) { }

  ngOnInit(): void {
    this.activatedroute.data.subscribe(data => {
      this.initCharts(data['usuarios']);
    })
    this.getUsuarios();
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
  }
}
