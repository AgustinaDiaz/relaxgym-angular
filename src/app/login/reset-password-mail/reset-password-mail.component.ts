import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { ResetPasswordService } from 'src/app/services/reset-password.service';

@Component({
  selector: 'app-reset-password-mail',
  templateUrl: './reset-password-mail.component.html',
  styleUrls: ['./reset-password-mail.component.scss'],
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
export class ResetPasswordMailComponent implements OnInit {

  tooltipValidated: boolean = false;
  resetEmailSend: string = "";

  constructor(private alertService: AlertService,
              private router: Router,
              private resetPasswordService: ResetPasswordService) { }

  ngOnInit(): void {
  }
  
  sendResetPasswordMail(resetPasswordMailForm:NgForm){
    if(!resetPasswordMailForm.invalid){
      this.resetPasswordService.createSolicitudCambioPassword(this.resetEmailSend)
      .subscribe(response => {
        this.alertService.success('Se ha enviado el correo de restablecimiento de password correctamente. Por favor revise la bandeja de entrada de su correo electronico', { autoClose: true, keepAfterRouteChange: true, symbolAlert: 'check-circle-fill' });
        setTimeout(() => {
          this.onBack()
        }, 4000);
      },
      error => {
        this.alertService.error('Ocurrió un error enviar el el correo de restablecimiento de password.',{ autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' })
        setTimeout(() => {
          this.onBack()
        }, 4000);
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
