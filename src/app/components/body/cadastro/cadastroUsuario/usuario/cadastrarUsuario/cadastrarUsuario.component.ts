
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { Situacao } from 'src/app/components/interface/situacao';
import { Usuario } from 'src/app/components/interface/usuario';
import { BuscarCepService } from 'src/app/components/service/buscar-cep.service';
import { HeaderService } from 'src/app/components/service/header.service';
import { SituacaoService } from 'src/app/components/service/situacao.service';
import { UsuarioService } from 'src/app/components/service/usuario.service';
import { RoleService } from 'src/app/components/service/role.service';
import { Role } from 'src/app/components/interface/role';
import { BuscarCnpjService } from 'src/app/components/service/buscar-cnpj.service';
import { Observable, Subscription, concatMap, map, of } from 'rxjs';

@Component({
  selector: 'app-cadastrarUsuario',
  templateUrl: './cadastrarUsuario.component.html',
  styleUrls: ['./cadastrarUsuario.component.css']
})
export class CadastrarUsuarioComponent implements OnInit {
  
  constructor(private route: Router, 
    private server: UsuarioService,
    private situacao: SituacaoService,
    private roleServer: RoleService,
    private buscarCep: BuscarCepService,
    private buscarCnpj: BuscarCnpjService,
    private headerService: HeaderService) { 
      
        headerService.headerData = {
          title: 'Cadastrar Usuario',
          icon: 'person',
          routerUrl: 'cadastro/usuario',
        }
    }

    usuario: Usuario = new Usuario();
    listaSituacao: Situacao[] = [];
    listaRole: Role[] = [];
    validaEmail: boolean = false;

  ngOnInit(): void {
    this.selecionarSituacao();
    this.selecionarNivelAcesso();
    this.usuario.cliente = true;
  }

  salvar(): void{
    this.server.validarPossueEmail(this.usuario.email!).subscribe(
      res=>{
        if(!res){
          this.cadastroFornecedor();
        }else{
          this.server.message("E-mail já possue cadastro", true)
        }
      });
  }

  metodoSalva(){
    this.server.cadastrar(this.usuario).subscribe(() =>{
      this.server.message("Cadastro efetuado com sucesso");
      this.route.navigate(['cadastro/usuario']);
    })
  }
  cadastroFornecedor(){
    if(this.usuario.fornecedor){
      this.roleServer.selecionarPorId("3").subscribe(
        res => {
          this.usuario.role = res
          this.metodoSalva()
      })
    }else{
      this.metodoSalva()
    }
  }

  selecionarSituacao(){
    this.situacao.selecionarTodos().subscribe(res => {
      this.listaSituacao = res;
    })
  }

  selecionarNivelAcesso(){
    this.roleServer.selecionarTodos().subscribe(res => {
      this.listaRole = res;
    })
  }

  voltar(): void{
    this.route.navigate(['cadastro/usuario'])
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

  consultaCnpj(valor: any){
    const cnpj: String = valor.form.value.cnpj.replace('.','').replace('/','').replace('-','');
    if(cnpj.length === 14){
      this.buscarCnpj.buscar(cnpj.toString()).subscribe(res =>{
        this.carregaCnpj(res)      
      })
   }else{
    this.server.message("Cnpj Incorreto", true)
   }
  }

  carregaCnpj(valor: any){
    if(valor.status.text === "Ativa"){
      this.usuario.nome = valor.company.name
      this.usuario.endereco = valor.address.street
      this.usuario.bairro = valor.address.district
      this.usuario.cep = valor.address.zip
      this.usuario.cidade = valor.address.city
      this.usuario.fone = valor.phones[0].area + valor.phones[0].number
      this.usuario.uf = valor.address.state
      this.usuario.numero = valor.address.number
      this.usuario.email = valor.emails[0].address
    }else{
      this.server.message("Cnpj Não está Ativo", true)
    }
  }

  tipoCliente(){
    this.usuario.fornecedor = false;
    this.usuario.funcionario = false;
    this.limpar()
  }

  tipoFuncionario(){
    this.usuario.fornecedor = false;
    this.usuario.cliente = false;
    this.limpar()
  }

  tipoFornecedor(){
    this.usuario.cliente = false;
    this.usuario.funcionario = false;
    this.limpar()
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

 validarPossueEmail(){
    this.server.validarPossueEmail(this.usuario.email!).subscribe(
    res=>{
      if(res){
        this.server.message("E-mail já possue cadastro", true)
      }
    })
  }

  //-------------------------
}
