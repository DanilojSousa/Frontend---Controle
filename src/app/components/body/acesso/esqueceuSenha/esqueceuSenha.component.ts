import { EnviarEmailService } from './../../../service/enviarEmail.service';
import { Login } from './../../../interface/login';
import { EnviarEmail } from './../../../interface/enviarEmail';
import { LoginService } from './../../../service/login.service';
import { Component, OnInit } from '@angular/core';
import { HeaderService } from 'src/app/components/service/header.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-esqueceuSenha',
  templateUrl: './esqueceuSenha.component.html',
  styleUrls: ['./esqueceuSenha.component.css']
})
export class EsqueceuSenhaComponent implements OnInit {

  constructor(private loginServer: LoginService,
      private emailService: EnviarEmailService,
      private route: Router, 
      private headerService: HeaderService) {   
      headerService.headerData = {
        title: 'Login',
        icon: 'key',
        routerUrl: 'inicio',
      } }

  login: Login = new Login();
  email: EnviarEmail = new EnviarEmail();

  ngOnInit(): void {

  }

  voltar(){
    this.route.navigate(['acesso/login'])
  }

  enviar(){
      this.emailService.cadastrarEnviarEmail(this.login.usuario.email!).subscribe(
        () =>{
          this.emailService.message("Email enviado com sucesso")
          this.route.navigate(['inicio'])
        },
        (error) =>{
          this.emailService.message("Não foi possivel enviar o e-mail", true)
          console.log(error)
        }
      )
  }
  

}
