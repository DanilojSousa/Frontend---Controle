import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Situacao } from 'src/app/components/interface/situacao';
import { HeaderService } from 'src/app/components/service/header.service';
import { SituacaoService } from 'src/app/components/service/situacao.service';

@Component({
  selector: 'app-editarSituacao',
  templateUrl: './editarSituacao.component.html',
  styleUrls: ['./editarSituacao.component.css']
})
export class EditarSituacaoComponent implements OnInit {

  constructor(private server: SituacaoService, 
    private router: ActivatedRoute, 
    private route: Router,
    private headerService: HeaderService) {
        headerService.headerData = {
        title: 'Editar Situação',
        icon: 'more_horiz',
        routerUrl: 'cadastro/geral/situacao',
     }
    }

    situacao!: Situacao;
    mudouTela: boolean = false;

  ngOnInit(): void {
    this.selecionarPorId();
  }

  selecionarPorId(){
    const id = this.router.snapshot.paramMap.get('id');
    this.server.selecionarPorId(id!).subscribe(res => {
      this.situacao = res;
    })
  }

  salvar(){
    this.server.cadastrarSituacao(this.situacao).subscribe(() =>{
      this.server.message("Cadastro Editado com sucesso");
      this.voltar();
    });
  }

  voltar(){
    this.route.navigate(['cadastro/geral/situacao'])
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
