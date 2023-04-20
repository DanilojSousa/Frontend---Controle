import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ncm } from 'src/app/components/interface/ncm';
import { HeaderService } from 'src/app/components/service/header.service';
import { NcmService } from 'src/app/components/service/ncm.service';

@Component({
  selector: 'app-detalhes-ncm',
  templateUrl: './detalhesNcm.component.html',
  styleUrls: ['./detalhesNcm.component.css']
})
export class DetalhesNcmComponent implements OnInit {

  constructor(private server: NcmService, 
    private route: Router, 
    private router: ActivatedRoute,
    private headerService: HeaderService) {

      headerService.headerData = {
        title: 'Detalhes Ncm',
        icon: 'inventory_2',
        routerUrl: 'cadastro/produto/ncm',
      }
    }

    ncm!: Ncm;

  ngOnInit(): void {
    this.selecionarPorId();
  }

  selecionarPorId(){
    const id = this.router.snapshot.paramMap.get('id');
    this.server.selecionarPorId(id!).subscribe(res =>
      { 
        this.ncm = res;
      })
  }

  editar(): void{
    const id = this.router.snapshot.paramMap.get('id');
    this.route.navigate(['cadastro/produto/ncm/editar/'+id])
  }

  voltar(): void{
    this.route.navigate(['cadastro/produto/ncm'])
  }
}
