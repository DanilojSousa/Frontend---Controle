import { UsuarioService } from 'src/app/components/service/usuario.service';
import { Usuario } from './../../../interface/usuario';
import { Login } from './../../../interface/login';
import { LoginService } from './../../../service/login.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/components/service/header.service';
import { Util } from 'src/app/components/interface/servicos/util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  login: Login = new Login();
  loginEncode: Login = new Login();

  constructor(private route: Router,
    private loginServer: LoginService,
    private usuarioServer: UsuarioService,
    private headerService: HeaderService) {   
      headerService.headerData = {
        title: 'Login',
        icon: 'key',
        routerUrl: 'inicio',
      }
    }

  ngOnInit(): void {
  }

  voltar(){
    this.route.navigate(['inicio'])
  }

  entrar(){
    this.loginEncode.password = Util.encode(this.login.password!, 28800000 );
    this.loginEncode.usuario.email = Util.encode(this.login.usuario.email!, 28800000 );
    this.loginServer.entrar(this.loginEncode);  
  }

  cadastreSe(){
    this.route.navigate(['acesso/cadastrar'])
  }

  esqueceuSenha(){
    this.route.navigate(['acesso/senha'])
  }
  //validar-email
  email = new FormControl('', [Validators.required, Validators.email]);
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'digite um E-mail';
    }
    return this.email.hasError('email') ? 'E-mail não é válido' : '';
  }

  validarPossueEmail(){
    if(this.usuarioServer.validarPossueEmail(this.login.usuario.email!)){
     this.usuarioServer.message("E-mail já possue cadastro", true)
    }
  }

}
