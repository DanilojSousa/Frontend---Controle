import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UnidadeMedida } from 'src/app/components/interface/unidadeMedida';
import { HeaderService } from 'src/app/components/service/header.service';
import { UnidadeMedidaService } from 'src/app/components/service/unidadeMedida.service';

@Component({
  selector: 'app-detalhes-unidade-medida',
  templateUrl: './detalhesUnidadeMedida.component.html',
  styleUrls: ['./detalhesUnidadeMedida.component.css']
})
export class DetalhesUnidadeMedidaComponent implements OnInit {

  constructor(private server: UnidadeMedidaService, 
    private route: Router, 
    private router: ActivatedRoute,
    private headerService: HeaderService) {

      headerService.headerData = {
        title: 'Detalhes Unidade Medida',
        icon: 'inventory_2',
        routerUrl: 'cadastro/produto/unidadeMedida',
      }
    }

    unidadeMedida!: UnidadeMedida;

  ngOnInit(): void {
    this.selecionarPorId();
  }

  selecionarPorId(){
    const id = this.router.snapshot.paramMap.get('id');
    this.server.selecionarPorId(id!).subscribe(res =>
      { 
        this.unidadeMedida = res;
      })
  }

  editar(): void{
    const id = this.router.snapshot.paramMap.get('id');
    this.route.navigate(['cadastro/produto/unidadeMedida/editar/'+id])
  }

  voltar(): void{
    this.route.navigate(['cadastro/produto/unidadeMedida'])
  }

}
