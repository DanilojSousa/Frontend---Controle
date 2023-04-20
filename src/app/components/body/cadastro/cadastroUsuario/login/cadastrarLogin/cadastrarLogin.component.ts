import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, distinctUntilChanged, map, startWith } from 'rxjs';
import { Login } from 'src/app/components/interface/login';
import { Usuario } from 'src/app/components/interface/usuario';
import { HeaderService } from 'src/app/components/service/header.service';
import { LoginService } from 'src/app/components/service/login.service';
import { UsuarioService } from 'src/app/components/service/usuario.service';

@Component({
  selector: 'app-cadastrarLogin',
  templateUrl: './cadastrarLogin.component.html',
  styleUrls: ['./cadastrarLogin.component.css']
})
export class CadastrarLoginComponent implements OnInit {

  constructor(private routerUsuario: UsuarioService,
       private loginServer: LoginService,
       private route: Router,
       private headerService: HeaderService) { 
        headerService.headerData = {
          title: 'Cadastrar Login',
          icon: 'key',
          routerUrl: 'cadastro/login',
        }
    }
    login: Login = new Login();
    myControl = new FormControl<string | Usuario>('');
    listaUsuario: Usuario[] = [];
    listaUsuarioFiltrado!: Observable<Usuario[]>;

    hide = true;
    senha1!: string
    senha2!: string  
        

    ngOnInit(): void {
      this.pesquisaFiltrada();
    }

    //pesquisa
    displayFn(usuario: Usuario): string {
      return usuario && usuario.nome ? usuario.nome : '';
    }

    pesquisaFiltrada(){
      this.listaUsuarioFiltrado = this.myControl.valueChanges.pipe(
        startWith(''),
        distinctUntilChanged(),
        map(value => {
          const name = typeof value === 'string' ? value : value?.nome;
          return name ? this._filter(name as string): this.listaUsuario;
        }));
    }

    private _filter(nome: string): Usuario[] {
      const filterValue = nome.toLowerCase();
      this.routerUsuario.pesquisaTodos(filterValue).subscribe(res =>{
        this.listaUsuario = []; 
        this.listaUsuario = res; 
      });
        return this.listaUsuario; 
    }

    validarSenha(res: any){
      if(res.form.value.senha1 === res.form.value.senha2){
        this.login.password = res.form.value.senha1
      }else{
        this.loginServer.message("Senha não confere", true)
      }
    }

  salvar(): void{
    if(this.senha1 === this.senha2){
      this.login.password = this.senha1;
      this.login.usuario = this.listaUsuario[0];
      this.loginServer.cadastrarLogin(this.login).subscribe(() =>{
        this.loginServer.message("Cadastro efetuado com sucesso");
        this.route.navigate(['cadastro/login']);
      })
    }else{
      this.loginServer.message("Senha não confere", true)
    }
  }

  voltar(): void{
    this.route.navigate(['cadastro/login'])
  }

}
