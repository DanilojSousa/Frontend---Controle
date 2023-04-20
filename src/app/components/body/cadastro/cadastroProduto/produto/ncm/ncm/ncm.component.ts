import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Ncm } from 'src/app/components/interface/ncm';
import { HeaderService } from 'src/app/components/service/header.service';
import { NcmService } from 'src/app/components/service/ncm.service';

@Component({
  selector: 'app-ncm',
  templateUrl: './ncm.component.html',
  styleUrls: ['./ncm.component.css']
})
export class NcmComponent implements OnInit {

  listaNcm: Ncm[] = []; 
  displayedColumns: string[] = ['id', 'nome','acao'];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  dataSource$!: MatTableDataSource<Ncm>; 
  mostraSpinner!: Boolean;

  constructor(private server: NcmService, 
    private route: Router,
     private headerService: HeaderService) {
      headerService.headerData = {
        title: 'Ncm',
        icon: 'inventory_2',
        routerUrl: 'inicio',
      }
     }

  ngOnInit(): void {
    this.selecionarTodos();
  }

  selecionarTodos(){
    this.mostraSpinner = false;
    this.server.selecionarTodos().subscribe(res =>
      { 
        this.listaNcm = res;
        this.dataSource$ = new MatTableDataSource<Ncm>(res);
        this.dataSource$.paginator = this.paginator;
        this.mostraSpinner = true;
      })
  }
  
  detalhes(id: number){
    this.route.navigate(['cadastro/produto/ncm/detalhes/'+id])
  }

  editar(id: number){
    this.route.navigate(['cadastro/produto/ncm/editar/'+id])
  }

  voltar(){
   this.route.navigate(['inicio'])
  }

  novoNcm(){
    this.route.navigate(['cadastro/produto/ncm/criar'])
  }
 
  deletar(id: number){
    this.route.navigate(['cadastro/produto/ncm/excluir/'+id])
  }
}
