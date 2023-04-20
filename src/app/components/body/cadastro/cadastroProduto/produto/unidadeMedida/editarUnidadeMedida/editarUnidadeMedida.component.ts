import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UnidadeMedida } from 'src/app/components/interface/unidadeMedida';
import { HeaderService } from 'src/app/components/service/header.service';
import { UnidadeMedidaService } from 'src/app/components/service/unidadeMedida.service';

@Component({
  selector: 'app-editar-unidade-medida',
  templateUrl: './editarUnidadeMedida.component.html',
  styleUrls: ['./editarUnidadeMedida.component.css']
})
export class EditarUnidadeMedidaComponent implements OnInit {

  unidadeMedida!: UnidadeMedida;
  mudouTela: boolean = false;
    
  constructor(private server: UnidadeMedidaService, 
    private router: ActivatedRoute, 
    private route: Router,
    private headerService: HeaderService) {

      headerService.headerData = {
        title: 'Editar Unidade Medida',
        icon: 'inventory_2',
        routerUrl: 'cadastro/produto/unidadeMedida',
      }
    }

  ngOnInit(): void {
    this.selecionarPorId();
  }

  selecionarPorId(){
    const id = this.router.snapshot.paramMap.get('id');
    this.server.selecionarPorId(id!).subscribe(res => {
      this.unidadeMedida = res;
    })
  }

  salvar(){
      this.server.cadastrarUnidadeMedida(this.unidadeMedida).subscribe(() =>{
      this.server.message("Cadastro Editado com sucesso");
      this.voltar();
    });
  }

  voltar(){
    this.route.navigate(['cadastro/produto/unidadeMedida'])
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
