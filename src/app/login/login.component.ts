import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Login } from '../models/login';
import { AlertService } from '../services/alert.service';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  tooltipValidated: boolean = false;
  loginData: Login = new Login();
  loading: boolean = false;

  constructor(private router: Router,
              private usuarioService: UsuarioService,
              private alertService: AlertService) { }

  ngOnInit(): void {
  }

  login(loginForm:NgForm)
  {
    if(!loginForm.invalid){
      this.loading = true;
      this.usuarioService.login(this.loginData.usuario, this.loginData.password)
        .subscribe(
          data => {
            localStorage.setItem('tokenUsuario', data.token)
            this.loading = false;
            this.router.navigateByUrl("/");
          },
          errorResponse => {
            if(errorResponse.status == 400){
              this.alertService.error(errorResponse.error.detail,{ autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' })
              this.loading = false;
            }
            else{
              this.alertService.error('Ocurrió un error al loguearse.',{ autoClose: true, keepAfterRouteChange: true, symbolAlert: 'exclamation-triangle-fill' })
              this.loading = false;
            }
            
          }
        );
    }
    else
    {
      this.tooltipValidated = true;
    }
  }

}
