import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from 'src/app/components/interface/login';
import { Util } from 'src/app/components/interface/servicos/util';
import { HeaderService } from 'src/app/components/service/header.service';
import { LoginService } from 'src/app/components/service/login.service';

@Component({
  selector: 'app-trocaSenha',
  templateUrl: './trocaSenha.component.html',
  styleUrls: ['./trocaSenha.component.css']
})
export class TrocaSenhaComponent implements OnInit {

  hide = true;
  login: Login = new Login();
  loginBanco: Login = new Login();
  senha1!: string;
  senha2!: string;

  constructor(private route: Router,
    private loginServer: LoginService,
    private router: ActivatedRoute,
    private headerService: HeaderService) {   
      headerService.headerData = {
        title: 'Trocar de Senha',
        icon: 'key',
        routerUrl: 'inicio',
      }
    }

  ngOnInit(): void {
    this.buscaUsuarioViaToken();
  }

  voltar(){
    this.route.navigate(['inicio'])
  }

  alterar(){
    this.validarSenhaComBanco();
  }

  alterarCadastro(){
    this.loginBanco.password = Util.encode(this.login.password!, 480000);
    this.loginBanco.usuario.email = Util.encode(this.login.usuario.email!, 480000);
    this.loginServer.cadastrarLogin(this.loginBanco).subscribe(
      ()=> {
        this.loginServer.message("Senha alterada com sucesso")
        this.route.navigate(['acesso/login'])
      },
      error => console.log(error)
     );
  }

  validarSenha(res: any){
    if(res.form.value.senha1 === res.form.value.senha2){
      this.login.password = res.form.value.senha1
    }else{
      this.loginServer.message("Senha não confere", true)
    }
  }

  validarSenhaComBanco(){
    this.loginServer.validarSenhaComBanco(this.loginBanco.password!, this.senha1!).subscribe(res =>{
      if(!res){
        this.alterarCadastro()
      }else{
        this.loginServer.message("Senha já está cadastrada, inserir outra", true)
      }
    })
  }

  buscaUsuarioViaToken(){
    if(this.loginServer.logado()){
      this.loginServer.message("Você já está logado", true) 
      this.voltar() 
      return
    }
    const token = this.router.snapshot.paramMap.get('token');
    const id = Util.decode(token!);
    if(id != null && id != ""){
      this.loginServer.selecionarPorId(id).subscribe(
        res=>{
            this.loginBanco = res;
      })
    }else{
        this.loginServer.message("Tempo expirou, favor solicitar novamente", true) 
        this.voltar()
    }

  }

}
