import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NivelFuncao } from 'src/app/components/interface/NivelFuncao';
import { HeaderService } from 'src/app/components/service/header.service';
import { NivelFuncaoService } from 'src/app/components/service/nivelFuncao.service';

@Component({
  selector: 'app-editarNivel',
  templateUrl: './editarNivel.component.html',
  styleUrls: ['./editarNivel.component.css']
})
export class EditarNivelComponent implements OnInit {

  constructor(private server: NivelFuncaoService, 
    private router: ActivatedRoute, 
    private route: Router,
    private headerService: HeaderService) {
        headerService.headerData = {
        title: 'Editar Nível',
        icon: 'trending_up',
        routerUrl: 'cadastro/funcionario/nivel',
     }
    }

    nivelFuncao!: NivelFuncao;
    mudouTela: boolean = false;

  ngOnInit(): void {
    this.selecionarPorId();
  }

  selecionarPorId(){
    const id = this.router.snapshot.paramMap.get('id');
    this.server.selecionarPorId(id!).subscribe(res => {
      this.nivelFuncao = res;
    })
  }

  salvar(){
    this.server.cadastrarNivelFuncao(this.nivelFuncao).subscribe(() =>{
      this.server.message("Cadastro Editado com sucesso");
      this.voltar();
    });
  }

  voltar(){
    this.route.navigate(['cadastro/funcionario/nivel'])
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
