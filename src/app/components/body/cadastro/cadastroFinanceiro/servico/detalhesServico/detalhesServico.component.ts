import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Servico } from 'src/app/components/interface/servico';
import { HeaderService } from 'src/app/components/service/header.service';
import { ServicoService } from 'src/app/components/service/servico.service';

@Component({
  selector: 'app-detalhes-servico',
  templateUrl: './detalhesServico.component.html',
  styleUrls: ['./detalhesServico.component.css']
})
export class DetalhesServicoComponent implements OnInit {

  constructor(private server: ServicoService, 
    private route: Router, 
    private router: ActivatedRoute,
    private headerService: HeaderService) {
      headerService.headerData = {
        title: 'Detalhes Serviço',
        icon: 'sync_alt',
        routerUrl: 'cadastro/financeiro/servico',
      }
    }

    servico!: Servico;

  ngOnInit(): void {
    this.selecionarPorId();
  }

  selecionarPorId(){
    const id = this.router.snapshot.paramMap.get('id');
    this.server.selecionarPorId(id!).subscribe(res =>
      { 
        this.servico = res;
      })
  }

  editar(): void{
    const id = this.router.snapshot.paramMap.get('id');
    this.route.navigate(['cadastro/financeiro/servico/editar/'+id])
  }
  voltar(): void{
    this.route.navigate(['cadastro/financeiro/servico'])
  }


}
