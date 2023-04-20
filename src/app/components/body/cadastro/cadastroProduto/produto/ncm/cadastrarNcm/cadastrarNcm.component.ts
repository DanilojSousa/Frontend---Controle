import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ncm } from 'src/app/components/interface/ncm';
import { HeaderService } from 'src/app/components/service/header.service';
import { NcmService } from 'src/app/components/service/ncm.service';

@Component({
  selector: 'app-cadastrar-ncm',
  templateUrl: './cadastrarNcm.component.html',
  styleUrls: ['./cadastrarNcm.component.css']
})
export class CadastrarNcmComponent implements OnInit {

  ncm: Ncm = new Ncm();

  constructor(private route: Router, 
    private server: NcmService,
    private headerService: HeaderService) { 
      
        headerService.headerData = {
          title: 'Cadastrar Ncm',
          icon: 'inventory_2',
          routerUrl: 'cadastro/produto/ncm',
        }
    }

 ngOnInit(): void {

}

  salvar(): void{
    this.server.cadastrarNcm(this.ncm).subscribe(() =>{
      this.server.message("Cadastro efetuado com sucesso");
      this.route.navigate(['cadastro/produto/ncm']);
    })
  }

  voltar(): void{
    this.route.navigate(['cadastro/produto/ncm'])
  }

}
