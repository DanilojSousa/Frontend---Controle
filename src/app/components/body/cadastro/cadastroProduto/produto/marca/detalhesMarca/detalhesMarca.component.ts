import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Marca } from 'src/app/components/interface/marca';
import { HeaderService } from 'src/app/components/service/header.service';
import { MarcaService } from 'src/app/components/service/marca.service';

@Component({
  selector: 'app-detalhes-marca',
  templateUrl: './detalhesMarca.component.html',
  styleUrls: ['./detalhesMarca.component.css']
})
export class DetalhesMarcaComponent implements OnInit {

  constructor(private server: MarcaService, 
    private route: Router, 
    private router: ActivatedRoute,
    headerService: HeaderService) {

      headerService.headerData = {
        title: 'Detalhes Marca',
        icon: 'inventory_2',
        routerUrl: 'cadastro/produto/marca',
      }
    }

  marca!: Marca;

  ngOnInit(): void {
    this.selecionarPorId();
  }

  selecionarPorId(){
    const id = this.router.snapshot.paramMap.get('id');
    this.server.selecionarPorId(id!).subscribe(res =>
      { 
        this.marca = res;
      })
  }

  editar(): void{
    const id = this.router.snapshot.paramMap.get('id');
    this.route.navigate(['cadastro/produto/marca/editar/'+id])
  }

  voltar(): void{
    this.route.navigate(['cadastro/produto/marca'])
  }
}
