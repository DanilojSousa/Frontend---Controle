import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Situacao } from 'src/app/components/interface/situacao';
import { HeaderService } from 'src/app/components/service/header.service';
import { SituacaoService } from 'src/app/components/service/situacao.service';

@Component({
  selector: 'app-detalhesSituacao',
  templateUrl: './detalhesSituacao.component.html',
  styleUrls: ['./detalhesSituacao.component.css']
})
export class DetalhesSituacaoComponent implements OnInit {

  constructor(private server: SituacaoService, 
    private route: Router, 
    private router: ActivatedRoute,
    private headerService: HeaderService) {
      headerService.headerData = {
        title: 'Detalhes Situação',
        icon: 'more_horiz',
        routerUrl: 'cadastro/geral/situacao',
      }
    }

    situacao!: Situacao;

  ngOnInit(): void {
    this.selecionarPorId();
  }

  selecionarPorId(){
    const id = this.router.snapshot.paramMap.get('id');
    this.server.selecionarPorId(id!).subscribe(res =>
      { 
        this.situacao = res;
      })
  }

  editar(): void{
    const id = this.router.snapshot.paramMap.get('id');
    this.route.navigate(['cadastro/geral/situacao/editar/'+id])
  }
  voltar(): void{
    this.route.navigate(['cadastro/geral/situacao'])
  }

}
