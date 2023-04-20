import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Marca } from 'src/app/components/interface/marca';
import { HeaderService } from 'src/app/components/service/header.service';
import { MarcaService } from 'src/app/components/service/marca.service';

@Component({
  selector: 'app-marca',
  templateUrl: './marca.component.html',
  styleUrls: ['./marca.component.css']
})
export class MarcaComponent implements OnInit {

  listaMarca: Marca[] = []; 
  displayedColumns: string[] = ['id', 'nome','fornecedor','acao'];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  dataSource$!: MatTableDataSource<Marca>; 
  mostraSpinner!: Boolean;

  constructor(private server: MarcaService, 
    private route: Router,
     private headerService: HeaderService) {
      headerService.headerData = {
        title: 'Marca',
        icon: 'inventory_2',
        routerUrl: 'inicio',
      }
     }

  ngOnInit(): void {
    this.selecionarTodos();
  }

  selecionarTodos(){
    this.mostraSpinner = false;
    this.server.selecionarAtivos().subscribe(res =>
      { 
        this.listaMarca = res;
        this.dataSource$ = new MatTableDataSource<Marca>(res);
        this.dataSource$.paginator = this.paginator;
        this.mostraSpinner = true;
      })
  }
  
  detalhes(id: number){
    this.route.navigate(['cadastro/produto/marca/detalhes/'+id])
  }

  editar(id: number){
    this.route.navigate(['cadastro/produto/marca/editar/'+id])
  }

  voltar(){
    this.route.navigate(['inicio'])
}

  novaMarca(){
    this.route.navigate(['cadastro/produto/marca/criar'])
  }
 
  deletar(id: number){
    this.route.navigate(['cadastro/produto/marca/excluir/'+id])
  }

}
