import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FuncionarioSetor } from 'src/app/components/interface/funcionarioSetor';
import { FuncionarioSetorService } from 'src/app/components/service/funcionarioSetor.service';
import { HeaderService } from 'src/app/components/service/header.service';

@Component({
  selector: 'app-detalhes-funcao',
  templateUrl: './detalhesFuncao.component.html',
  styleUrls: ['./detalhesFuncao.component.css']
})
export class DetalhesFuncaoComponent implements OnInit {

  funcionarioSetor!: FuncionarioSetor;
  
  constructor(
    private server: FuncionarioSetorService, 
    private route: Router, 
    private router: ActivatedRoute,
    private headerService: HeaderService) {
      headerService.headerData = {
        title: 'Detalhes Função',
        icon: 'groups',
        routerUrl: 'cadastro/funcionario/funcao',
      }
    }

  ngOnInit(): void {
    this.selecionarPorId();
  }

  selecionarPorId(){
    const id = this.router.snapshot.paramMap.get('id');
    this.server.selecionarPorId(id!).subscribe(res =>
      { 
        this.funcionarioSetor = res;
      })
  }

  editar(): void{
    const id = this.router.snapshot.paramMap.get('id');
    this.route.navigate(['cadastro/funcionario/funcao/editar/'+id])
  }
  voltar(): void{
    this.route.navigate(['cadastro/funcionario/funcao'])
  }

}
