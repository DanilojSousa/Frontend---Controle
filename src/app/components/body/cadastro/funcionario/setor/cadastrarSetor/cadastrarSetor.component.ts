import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Setor } from 'src/app/components/interface/setor';
import { HeaderService } from 'src/app/components/service/header.service';
import { SetorService } from 'src/app/components/service/setor.service';

@Component({
  selector: 'app-cadastrar-setor',
  templateUrl: './cadastrarSetor.component.html',
  styleUrls: ['./cadastrarSetor.component.css']
})
export class CadastrarSetorComponent implements OnInit {

  setor: Setor = new Setor();

  constructor(private route: Router, 
    private server: SetorService,
    private headerService: HeaderService) { 
      
        headerService.headerData = {
          title: 'Cadastrar Setor',
          icon: 'room_preferences',
          routerUrl: 'cadastro/funcionario/setor',
        }
    }

  ngOnInit(): void {

  }

  salvar(): void{
    this.server.cadastrarSetor(this.setor).subscribe(() =>{
      this.server.message("Cadastro efetuado com sucesso");
      this.route.navigate(['cadastro/funcionario/setor']);
    })
  }

  voltar(): void{
    this.route.navigate(['cadastro/funcionario/setor'])
  }

}
