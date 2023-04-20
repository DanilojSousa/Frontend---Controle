import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from 'src/app/components/interface/produto';
import { HeaderService } from 'src/app/components/service/header.service';
import { ProdutoService } from 'src/app/components/service/produto.service';

@Component({
  selector: 'app-detalhes-produto',
  templateUrl: './detalhesProduto.component.html',
  styleUrls: ['./detalhesProduto.component.css']
})
export class DetalhesProdutoComponent implements OnInit {

  produto!: Produto;

  constructor(private server: ProdutoService, 
    private route: Router, 
    private router: ActivatedRoute,
    private headerService: HeaderService) {

      headerService.headerData = {
        title: 'Detalhes Produto',
        icon: 'inventory_2',
        routerUrl: 'cadastro/produto',
      }
    }

  ngOnInit(): void {
    this.selecionarPorId();
  }

  selecionarPorId(){
    const id = this.router.snapshot.paramMap.get('id');
    this.server.selecionarPorId(id!).subscribe(res =>
      { 
        this.produto = res;
      })
  }

  editar(): void{
    const id = this.router.snapshot.paramMap.get('id');
    this.route.navigate(['cadastro/produto/editar/'+id])
  }
  voltar(): void{
    this.route.navigate(['cadastro/produto'])
  }

}
