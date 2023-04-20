import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Servico } from 'src/app/components/interface/servico';
import { HeaderService } from 'src/app/components/service/header.service';
import { ServicoService } from 'src/app/components/service/servico.service';

@Component({
  selector: 'app-servico',
  templateUrl: './servico.component.html',
  styleUrls: ['./servico.component.css']
})
export class ServicoComponent implements OnInit {

  listaServico: Servico[] = []; 
  displayedColumns: string[] = ['id', 'descricao','acao'];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  dataSource$!: MatTableDataSource<Servico>; 
  mostraSpinner!: Boolean;

  constructor(private server: ServicoService, 
    private route: Router,
     private headerService: HeaderService) {
      headerService.headerData = {
        title: 'Serviço',
        icon: 'sync_alt',
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
        this.listaServico = res;
        this.dataSource$ = new MatTableDataSource<Servico>(res);
        this.dataSource$.paginator = this.paginator;
        this.mostraSpinner = true;
      })
  }
  
  detalhes(id: number){
    this.route.navigate(['cadastro/financeiro/servico/detalhes/'+id])
  }

  editar(id: number){
    this.route.navigate(['cadastro/financeiro/servico/editar/'+id])
  }

  voltar(){
    this.route.navigate(['inicio'])
  }

  novoSituacaoPedido(){
    this.route.navigate(['cadastro/financeiro/servico/criar'])
  }
 
  deletar(id: number){
    this.route.navigate(['cadastro/financeiro/servico/excluir/'+id])
  }
}
