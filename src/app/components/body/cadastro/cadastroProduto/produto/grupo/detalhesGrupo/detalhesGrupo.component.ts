import { GrupoProduto } from './../../../../../../interface/grupoProduto';
import { GrupoProdutoService } from './../../../../../../service/grupoProduto.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from 'src/app/components/service/header.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhesGrupo.component.html',
  styleUrls: ['./detalhesGrupo.component.css']
})
export class DetalhesGrupoComponent implements OnInit {

  constructor(private server: GrupoProdutoService, 
    private route: Router, 
    private router: ActivatedRoute,
    private headerService: HeaderService) {

      headerService.headerData = {
        title: 'Detalhes Grupo',
        icon: 'inventory_2',
        routerUrl: 'cadastro/produto/grupo',
      }
    }

  grupoProduto!: GrupoProduto;

  ngOnInit(): void {
    this.selecionarPorId();
  }

  selecionarPorId(){
    const id = this.router.snapshot.paramMap.get('id');
    this.server.selecionarPorId(id!).subscribe(res =>
      { 
        this.grupoProduto = res;
      })
  }

  editar(): void{
    const id = this.router.snapshot.paramMap.get('id');
    this.route.navigate(['cadastro/produto/grupo/editar/'+id])
  }

  voltar(): void{
    this.route.navigate(['cadastro/produto/grupo'])
  }

}
