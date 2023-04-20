import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, startWith } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { Login } from 'src/app/components/interface/login';
import { Usuario } from 'src/app/components/interface/usuario';
import { EnviarEmailService } from 'src/app/components/service/enviarEmail.service';
import { HeaderService } from 'src/app/components/service/header.service';
import { LoginService } from 'src/app/components/service/login.service';
import { UsuarioService } from 'src/app/components/service/usuario.service';

@Component({
  selector: 'app-editarLogin',
  templateUrl: './editarLogin.component.html',
  styleUrls: ['./editarLogin.component.css']
})
export class EditarLoginComponent implements OnInit {

  listaUsuario!: Usuario[];
  login: Login = new Login();
  mudouTela: boolean = false;
  myControl = new FormControl<string | Usuario>('');
  listaUsuarioFiltrado!: Observable<Usuario[]>;
    
  constructor(private server: UsuarioService, 
    private loginServer: LoginService,
    private emailService: EnviarEmailService,
    private router: ActivatedRoute, 
    private route: Router,
    private headerService: HeaderService) {
        headerService.headerData = {
          title: 'Editar Login',
          icon: 'key',
          routerUrl: 'cadastro/login',
     }
    }

  ngOnInit(): void {
    this.selecionarPorId();
    this.pesquisaFiltrada();
  }

  selecionarPorId(){
    const id = this.router.snapshot.paramMap.get('id');
    this.loginServer.selecionarPorId(id!).subscribe(res => {
      this.login = res;
      this.myControl.setValue(res.usuario);
    })
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
    this.server.pesquisaTodos(filterValue).subscribe(res =>{
      this.listaUsuario = []; 
      this.listaUsuario = res; 
    });
      return this.listaUsuario; 
  }

  
  salvar(): void{
    this.login.usuario = this.listaUsuario[0];
    this.loginServer.cadastrarLogin(this.login).subscribe(() =>{
      this.loginServer.message("Cadastro editado com sucesso");
      this.route.navigate(['cadastro/login']);
    })
  }

  trocarSenha(){
    this.emailService.cadastrarEnviarEmail(this.login.usuario.email!).subscribe(
      () =>{
        this.emailService.message("Email enviado com ao cliente com sucesso")
      },
      (error) =>{
        this.emailService.message("Não foi possivel enviar o e-mail", true)
        console.log(error)
      }
    )
}
  voltar(){
    this.route.navigate(['cadastro/login'])
  }

  onInput(){
    this.mudouTela = true;
  }

  podeDesativar(): boolean {
    if(this.mudouTela){
      confirm('A edição não foi salva, deseja sair?')
    }
    return true;
  }

 

}


