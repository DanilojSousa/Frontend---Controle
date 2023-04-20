import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { FormaPagamento } from 'src/app/components/interface/formaPagamento';
import { FormaPagamentoService } from 'src/app/components/service/formaPagamento.service';
import { HeaderService } from 'src/app/components/service/header.service';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.component.html',
  styleUrls: ['./pagamento.component.css']
})
export class FormaPagamentoComponent implements OnInit {

  listaFormaPagamento: FormaPagamento[] = []; 
  displayedColumns: string[] = ['id', 'nome','acao'];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  dataSource$!: MatTableDataSource<FormaPagamento>; 
  mostraSpinner!: Boolean;

  constructor(private server: FormaPagamentoService, 
    private route: Router,
     private headerService: HeaderService) {
      headerService.headerData = {
        title: 'Forma Pagamento',
        icon: 'payments',
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
        this.listaFormaPagamento = res;
        this.dataSource$ = new MatTableDataSource<FormaPagamento>(res);
        this.dataSource$.paginator = this.paginator;
        this.mostraSpinner = true;
      })
  }
  
  detalhes(id: number){
    this.route.navigate(['cadastro/financeiro/pagamento/detalhes/'+id])
  }

  editar(id: number){
    this.route.navigate(['cadastro/financeiro/pagamento/editar/'+id])
  }

  voltar(){
   this.route.navigate(['inicio'])
  }

  novoFormaPagamento(){
    this.route.navigate(['cadastro/financeiro/pagamento/criar'])
  }
 
  deletar(id: number){
    this.route.navigate(['cadastro/financeiro/pagamento/excluir/'+id])
  }
}
