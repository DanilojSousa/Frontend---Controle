import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Marca } from 'src/app/components/interface/marca';
import { HeaderService } from 'src/app/components/service/header.service';
import { MarcaService } from 'src/app/components/service/marca.service';
import { FormControl } from '@angular/forms';
import { distinctUntilChanged, map, Observable, startWith } from 'rxjs';
import { Usuario } from 'src/app/components/interface/usuario';
import { UsuarioService } from 'src/app/components/service/usuario.service';


@Component({
  selector: 'app-cadastrar-marca',
  templateUrl: './cadastrarMarca.component.html',
  styleUrls: ['./cadastrarMarca.component.css']
})
export class CadastrarMarcaComponent implements OnInit {

  listaUsuario: Usuario [] = [];
  marca: Marca = new Marca();

  constructor(private route: Router, 
    private server: MarcaService,
    private usuarioes: UsuarioService,
    private headerService: HeaderService) { 
      
        headerService.headerData = {
          title: 'Cadastrar Marca',
          icon: 'inventory_2',
          routerUrl: 'cadastro/produto/marca',
        }
    }

ngOnInit(): void {
  this.pesquisaFiltrada();
}

salvar(): void{
  this.marca.usuario = this.listaUsuario[0];
  this.server.cadastrarMarca(this.marca).subscribe(() =>{
    this.server.message("Cadastro efetuado com sucesso");
    this.route.navigate(['cadastro/produto/marca']);
  })
}

voltar(): void{
  this.route.navigate(['cadastro/produto/marca'])
}

//pesquisa

myControl = new FormControl<string | Usuario>('');
listaUsuarioFiltrado!: Observable<Usuario[]>;

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
  this.usuarioes.pesquisaFornecedor(filterValue).subscribe(res =>{
    this.listaUsuario = res; 
  });
    return this.listaUsuario; 
}

}


