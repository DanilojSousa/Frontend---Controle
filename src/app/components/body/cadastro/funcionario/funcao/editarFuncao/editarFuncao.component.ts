import { NivelFuncaoService } from './../../../../../service/nivelFuncao.service';
import { NivelFuncao } from './../../../../../interface/NivelFuncao';
import { Component, OnInit } from '@angular/core';
import { Setor } from 'src/app/components/interface/setor';
import { FuncionarioSetorService } from 'src/app/components/service/funcionarioSetor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SetorService } from 'src/app/components/service/setor.service';
import { HeaderService } from 'src/app/components/service/header.service';
import { CurrencyMaskConfig } from 'ng2-currency-mask/lib/currency-mask.config';
import { FormControl } from '@angular/forms';
import { distinctUntilChanged, map, Observable, startWith } from 'rxjs';
import { Usuario } from 'src/app/components/interface/usuario';
import { FuncionarioSetor } from 'src/app/components/interface/funcionarioSetor';
import { UsuarioService } from 'src/app/components/service/usuario.service';

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: "."
};


@Component({
  selector: 'app-editar-funcao',
  templateUrl: './editarFuncao.component.html',
  styleUrls: ['./editarFuncao.component.css']
})
export class EditarFuncaoComponent implements OnInit {

  listaUsuario!: Usuario[];
  listaSetor!: Setor[];
  listaNivel!: NivelFuncao[];
  funcionarioSetor!: FuncionarioSetor;
  myControl = new FormControl<string | Usuario>('');
  listaUsuarioFiltrado!: Observable<Usuario[]>;
  mudouTela: boolean = false;
    
  constructor(private server: FuncionarioSetorService, 
    private router: ActivatedRoute, 
    private route: Router,
    private usuarioService: UsuarioService,
    private setorService: SetorService,
    private nivelService: NivelFuncaoService,
    private headerService: HeaderService) {
        headerService.headerData = {
          title: 'Editar Função',
          icon: 'groups',
          routerUrl: 'cadastro/funcionario/funcao',
     }
    }

  ngOnInit(): void {
    this.selecionarPorId();
    this.selecionarSetor();
    this.pesquisaFiltrada();
    this.selecionarNivel();
  }

  selecionarPorId(){
    const id = this.router.snapshot.paramMap.get('id');
    this.server.selecionarPorId(id!).subscribe(res => {
      this.funcionarioSetor = res;
      this.myControl.setValue(res.usuario);
    })
  }

  salvar(){
    this.funcionarioSetor.usuario = this.listaUsuario[0]
    this.nivelService.selecionarPorId(this.funcionarioSetor.setor.id!.toString()).subscribe(res=>{
      this.funcionarioSetor.setor = res;
    })
    this.setorService.selecionarPorId(this.funcionarioSetor.nivelFuncao.id!.toString()).subscribe(res=>{
      this.funcionarioSetor.setor = res;
    })
    this.server.cadastrarFuncionarioSetor(this.funcionarioSetor).subscribe(() =>{
      this.server.message("Cadastro Editado com sucesso");
      this.voltar();
    });
  }

  voltar(){
    this.route.navigate(['cadastro/funcionario/funcao'])
  }

  selecionarSetor(){
    this.setorService.selecionarTodos().subscribe(res => {
      this.listaSetor = res;
    })
  }

  selecionarNivel(){
    this.nivelService.selecionarTodos().subscribe(res => {
      this.listaNivel = res;
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
  this.usuarioService.pesquisaFuncionario(filterValue).subscribe(res =>{
    this.listaUsuario = res; 
  });
    return this.listaUsuario; 
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
