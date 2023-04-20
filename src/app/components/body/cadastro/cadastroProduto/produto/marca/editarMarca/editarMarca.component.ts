import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Marca } from 'src/app/components/interface/marca';
import { HeaderService } from 'src/app/components/service/header.service';
import { MarcaService } from 'src/app/components/service/marca.service';
import { FormControl } from '@angular/forms';
import { distinctUntilChanged, map, Observable, startWith } from 'rxjs';
import { Usuario } from 'src/app/components/interface/usuario';
import { UsuarioService } from 'src/app/components/service/usuario.service';

@Component({
  selector: 'app-editar-marca',
  templateUrl: './editarMarca.component.html',
  styleUrls: ['./editarMarca.component.css']
})
export class EditarMarcaComponent implements OnInit {

  marca!: Marca;
  listaUsuario: Usuario [] = [];
  myControl = new FormControl<string | Usuario>('');
  listaUsuarioFiltrado!: Observable<Usuario[]>;
  mudouTela: boolean = false;
    
  constructor(private server: MarcaService, 
    private router: ActivatedRoute, 
    private route: Router,
    private usuario: UsuarioService,
    private headerService: HeaderService) {

      headerService.headerData = {
        title: 'Editar Marca',
        icon: 'inventory_2',
        routerUrl: 'cadastro/produto/marca',
      }
    }

  ngOnInit(): void {
    this.selecionarPorId();
    this.pesquisaFiltrada();
  }

  selecionarPorId(){
    const id = this.router.snapshot.paramMap.get('id');
    this.server.selecionarPorId(id!).subscribe(res => {
      this.marca = res;
      this.myControl.setValue(res.usuario)
    })
  }

  salvar(){
    if(this.listaUsuario.length > 0){
      this.marca.usuario = this.listaUsuario[0]
    }   
      this.server.cadastrarMarca(this.marca).subscribe(() =>{
      this.server.message("Cadastro Editado com sucesso");
      this.voltar();
    });
  }

  voltar(){
    this.route.navigate(['cadastro/produto/marca'])
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
  this.usuario.pesquisaFornecedor(filterValue).subscribe(res =>{
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
