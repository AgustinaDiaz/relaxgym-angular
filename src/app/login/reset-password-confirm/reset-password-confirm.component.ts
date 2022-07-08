import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SolicitudCambioPassword } from 'src/app/models/solicitud-cambio-password';
import { AlertService } from 'src/app/services/alert.service';
import { ResetPasswordService } from 'src/app/services/reset-password.service';

@Component({
  selector: 'app-reset-password-confirm',
  templateUrl: './reset-password-confirm.component.html',
  styleUrls: ['./reset-password-confirm.component.scss'],
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
export class ResetPasswordConfirmComponent implements OnInit {

  tooltipValidated: boolean = false;
  solicitudCambioPassword: SolicitudCambioPassword = new SolicitudCambioPassword();
  constructor(private activatedroute:ActivatedRoute,
              private alertService: AlertService,
              private resetPasswordService: ResetPasswordService,
              private router: Router) { }

  ngOnInit(): void {
    this.activatedroute.data.subscribe(data => {
      this.solicitudCambioPassword = data['solicitud'];
    })
  }

  confirmResetPassword(confirmResetPasswordForm:NgForm){
    if(!confirmResetPasswordForm.invalid){
      this.resetPasswordService.confirmSolicitudCambioPassword(this.solicitudCambioPassword.idWeb, this.solicitudCambioPassword.usuario.claveUsuario, this.solicitudCambioPassword.nuevaClave)
      .subscribe(response => {
        this.alertService.success('Se ha confirmado correctamente la solicitud de cambio de password.', { autoClose: true, keepAfterRouteChange: true, symbolAlert: 'check-circle-fill' });
        setTimeout(() => {
          this.onBack()
        }, 2000);
      },
      error => {
        this.alertService.error('Ocurrió un error al confirmar la solicitud de cambio de password.',{ autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' })
        setTimeout(() => {
          this.onBack()
        }, 2000);
      });
    }
    else{
      this.tooltipValidated = true;
    }
  }

  onBack() {
    this.router.navigateByUrl("/login");
  }
}
