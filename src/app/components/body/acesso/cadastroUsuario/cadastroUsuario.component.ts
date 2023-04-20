import { LoginService } from './../../../service/login.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/components/interface/login';
import { Situacao } from 'src/app/components/interface/situacao';
import { Usuario } from 'src/app/components/interface/usuario';
import { BuscarCepService } from 'src/app/components/service/buscar-cep.service';
import { HeaderService } from 'src/app/components/service/header.service';
import { SituacaoService } from 'src/app/components/service/situacao.service';
import { UsuarioService } from 'src/app/components/service/usuario.service';
import { RoleService } from 'src/app/components/service/role.service';
import { Util } from 'src/app/components/interface/servicos/util';

@Component({
  selector: 'app-cadastroUsuario',
  templateUrl: './cadastroUsuario.component.html',
  styleUrls: ['./cadastroUsuario.component.css']
})
export class CadastroUsuarioComponent implements OnInit {

  constructor(private route: Router, 
    private server: UsuarioService,
    private situacao: SituacaoService,
    private loginServer: LoginService,
    private role: RoleService,
    private buscarCep: BuscarCepService,
    private headerService: HeaderService) { 
      
        headerService.headerData = {
          title: 'Cadastra-se',
          icon: 'person',
          routerUrl: 'acesso/login',
        }
    }

    usuario: Usuario = new Usuario();
    login: Login = new Login();
    loginEncode: Login = new Login();
    listaSituacao: Situacao[] = [];
    validaEmail: boolean = false;
    validaCPF: boolean = false;

    hide = true;
    senha1!: string
    senha2!: string
    nome!: string
    sobreNome!: string

  ngOnInit(): void {
 
  }

  salvar(): void{
    if(this.validaEmail){
      this.server.message("E-mail já possue cadastro", true)
      return;
    }
    if(this.validaCPF){
      this.server.message("CPF já possue cadastro", true)
      return
    }
    this.usuario.cpf = this.usuario.cpf!.replace(/[^0-9]/g,'');
    this.usuario.fone = this.usuario.fone!.replace(/[^0-9]/g,'');
    this.usuario.nome = this.nome.concat(this.sobreNome);
    this.role.selecionarPorId('3').subscribe(res =>{
    this.usuario.role = res;
   })
   this.situacao.selecionarPorId('1').subscribe(res => {
    this.usuario.situacao = res;
  })
  if(this.login.password!= undefined){
    
    this.server.cadastrar(this.usuario).subscribe(res =>{
      this.login.usuario = res;
      this.login.apelido = this.nome;
      this.login.password = this.senha1;
    })
    this.loginEncode = this.login;
    this.loginEncode.usuario.email = Util.encode(this.loginEncode.usuario.email!, 28800000 )
    this.loginEncode.password = Util.encode(this.loginEncode.password!, 28800000 )
    this.loginServer.cadastrarLogin(this.loginEncode).subscribe(()=>{
      this.loginServer.message("Cadastro efetuado com sucesso");
      this.voltar();
    })
  }else{
    this.server.message('Favor validar a senha...', true)
  }
}

  voltar(): void{
    this.route.navigate(['acesso/login'])
  }

  validarSenha(res: any){
    if(res.form.value.senha1 === res.form.value.senha2){
      this.login.password = res.form.value.senha1
    }else{
      this.server.message("Senha não confere", true)
    }
  }

  consultaCep(valor: any){
    this.buscarCep.buscar(valor.form.value.cep).subscribe(res =>{
      this.carregarCep(res);
    })
  }

  carregarCep(res: any){
    this.usuario.cep = res.cep;
    this.usuario.endereco = res.logradouro;
    this.usuario.cidade = res.localidade;
    this.usuario.bairro = res.bairro;
    this.usuario.uf = res.uf;
    this.usuario.numero = res.number;
  }

  limpar(){
    this.usuario.bairro = '';
    this.usuario.cep = '';
    this.usuario.cidade = '';
    this.usuario.fone = '';
    this.usuario.cnpj = '';
    this.usuario.cpf = '';
    this.usuario.email = '';
    this.usuario.endereco = '';
    this.usuario.nome = '';
    this.usuario.numero = '';    
  }


  //validação E-mail
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
  matcher = new ErrorStateMatcher();
  //-------------------------

  validarPossueEmail(res: any): boolean{
    this.server.validarPossueEmail(res.form.value.email!).subscribe(
      res=>{
        console.log(res)
          if(res){
            this.server.message("E-mail já possue cadastro", true)
            this.validaEmail = true;
          }else{
            this.validaEmail = false;
          }
      })
      return this.validaEmail;
  }

  validarPossueCpf(res: any): boolean{
    this.server.validarPossueCpf(res.form.value.cpf).subscribe(
      res=>{
        if(res){
          this.server.message("CPF já possue cadastro", true)
          this.validaCPF = true;
        }else{
          this.validaEmail = false;
        }
      })
      return this.validaCPF;
  }

  

}
