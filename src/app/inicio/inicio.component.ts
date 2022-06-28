import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AlertService } from '../services/alert.service';
import { UsuarioService } from '../services/usuario.service';
import { DashboardChartsData } from './dashboard-charts-data';

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
  public chart: Array<IChartProps> = [];
  public trafficRadioGroup = new FormGroup({
    trafficRadio: new FormControl('Month')
  });

  constructor(private usuarioService: UsuarioService,
              private alertService: AlertService,
              private chartsData: DashboardChartsData) { }

  ngOnInit(): void {
    this.getUsuarios();
    this.initCharts();
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

  initCharts(): void {
    this.mainChart = this.chartsData.mainChart;
  }

  setTrafficPeriod(value: string): void {
    this.trafficRadioGroup.setValue({ trafficRadio: value });
    this.chartsData.initMainChart(value);
    this.initCharts();
  }
}
