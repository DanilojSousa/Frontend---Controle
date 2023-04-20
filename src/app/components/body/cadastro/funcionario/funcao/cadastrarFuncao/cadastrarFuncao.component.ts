import { NivelFuncaoService } from './../../../../../service/nivelFuncao.service';
import { NivelFuncao } from './../../../../../interface/NivelFuncao';
import { Usuario } from './../../../../../interface/usuario';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from 'src/app/components/service/header.service';
import { Setor } from 'src/app/components/interface/setor';
import { distinctUntilChanged, map, Observable, startWith } from 'rxjs';
import { FormControl } from '@angular/forms';
import { FuncionarioSetor } from 'src/app/components/interface/funcionarioSetor';
import { FuncionarioSetorService } from 'src/app/components/service/funcionarioSetor.service';
import { UsuarioService } from 'src/app/components/service/usuario.service';
import { SetorService } from 'src/app/components/service/setor.service';

@Component({
  selector: 'app-cadastrar-funcao',
  templateUrl: './cadastrarFuncao.component.html',
  styleUrls: ['./cadastrarFuncao.component.css']
})
export class CadastrarFuncaoComponent implements OnInit {

  myControl = new FormControl<string | Usuario>('');
  listaFuncionario: Usuario[] = [];
  listaNivel: NivelFuncao[] = [];
  listaSetor: Setor[] = [];
  listaFuncionarioFiltrado!: Observable<Usuario[]>;

  funcionarioSetor: FuncionarioSetor = new FuncionarioSetor();
  

  constructor(private route: Router, 
    private funcionarios: FuncionarioSetorService,
    private routerUsuario: UsuarioService,
    private routerSetor: SetorService,
    private routerNivel: NivelFuncaoService,
    private headerService: HeaderService) { 
      
        headerService.headerData = {
          title: ' Cadastrar Função',
          icon: 'groups',
          routerUrl: 'cadastro/funcionario/funcao',
        }
    }

  ngOnInit(): void {
    this.selecionarSetor();
    this.pesquisaFiltrada();
    this.selecionarNivel();
  }

salvar(): void{
  this.funcionarioSetor.usuario = this.listaFuncionario[0];
  this.funcionarios.cadastrarFuncionarioSetor(this.funcionarioSetor).subscribe(() =>{
    this.funcionarios.message("Cadastro efetuado com sucesso");
    this.route.navigate(['cadastro/funcionario/funcao']);
  })
}

selecionarSetor(){
  this.routerSetor.selecionarTodos().subscribe(res =>{
    this.listaSetor = res;
  })
}

selecionarNivel(){
  this.routerNivel.selecionarTodos().subscribe(res =>{
    this.listaNivel = res;
  })
}

voltar(): void{
  this.route.navigate(['cadastro/funcionario/funcao'])
}

 //pesquisa
 displayFn(usuario: Usuario): string {
  return usuario && usuario.nome ? usuario.nome : '';
}

pesquisaFiltrada(){
  this.listaFuncionarioFiltrado = this.myControl.valueChanges.pipe(
    startWith(''),
    distinctUntilChanged(),
    map(value => {
      const name = typeof value === 'string' ? value : value?.nome;
      return name ? this._filter(name as string): this.listaFuncionario;
    }));
}

private _filter(nome: string): Usuario[] {
  const filterValue = nome.toLowerCase();
  this.routerUsuario.pesquisaFuncionario(filterValue).subscribe(res =>{
    this.listaFuncionario = []; 
    this.listaFuncionario = res; 
  });
    return this.listaFuncionario; 
}

}
