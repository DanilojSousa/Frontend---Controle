import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Setor } from 'src/app/components/interface/setor';
import { HeaderService } from 'src/app/components/service/header.service';
import { SetorService } from 'src/app/components/service/setor.service';

@Component({
  selector: 'app-setor',
  templateUrl: './setor.component.html',
  styleUrls: ['./setor.component.css']
})
export class SetorComponent implements OnInit {

  data = new Date('dd/MM/yyyy');
  listaSetor: Setor[] = []; 
  displayedColumns: string[] = ['id', 'nome','cargo','acao'];

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  dataSource$!: MatTableDataSource<Setor>; 
  mostraSpinner!: Boolean;

  constructor(
    private server: SetorService, 
    private route: Router,
     private headerService: HeaderService) {
      headerService.headerData = {
        title: 'Setor',
        icon: 'room_preferences',
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
        this.listaSetor = res;
        this.dataSource$ = new MatTableDataSource<Setor>(res);
        this.dataSource$.paginator = this.paginator;
        this.mostraSpinner = true;
      })
  }
  
  detalhes(id: number){
    this.route.navigate(['cadastro/funcionario/setor/detalhes/'+id])
  }

  editar(id: number){
    this.route.navigate(['cadastro/funcionario/setor/editar/'+id])
  }

  voltar(){
    this.route.navigate(['inicio'])
  }

  novoSetor(){
    this.route.navigate(['cadastro/funcionario/setor/criar'])
  }
 
  deletar(id: number){
    this.route.navigate(['cadastro/funcionario/setor/excluir/'+id])
  }
}
