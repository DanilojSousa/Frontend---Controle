import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Servico } from 'src/app/components/interface/servico';
import { HeaderService } from 'src/app/components/service/header.service';
import { ServicoService } from 'src/app/components/service/servico.service';

@Component({
  selector: 'app-editar-servico',
  templateUrl: './editarServico.component.html',
  styleUrls: ['./editarServico.component.css']
})
export class EditarServicoComponent implements OnInit {

  constructor(private server: ServicoService, 
    private router: ActivatedRoute, 
    private route: Router,
    private headerService: HeaderService) {
        headerService.headerData = {
        title: 'Editar Serviço',
        icon: 'sync_alt',
        routerUrl: 'cadastro/financeiro/servico',
     }
    }

    servico!: Servico;
    mudouTela: boolean = false;

  ngOnInit(): void {
    this.selecionarPorId();
  }

  selecionarPorId(){
    const id = this.router.snapshot.paramMap.get('id');
    this.server.selecionarPorId(id!).subscribe(res => {
      this.servico = res;
    })
  }

  salvar(){
    this.server.cadastrarServico(this.servico).subscribe(() =>{
      this.server.message("Cadastro Editado com sucesso");
      this.voltar();
    });
  }

  voltar(){
    this.route.navigate(['cadastro/financeiro/servico'])
  }

  onInput(){
    this.mudouTela = true;
  }

  podeDesativar(): boolean {
    if(this.mudouTela){
      confirm('A edição não foi salva, deseja sair?')
    }
    return true;
  }

}
