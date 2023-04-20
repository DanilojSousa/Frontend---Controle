import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Setor } from 'src/app/components/interface/setor';
import { HeaderService } from 'src/app/components/service/header.service';
import { SetorService } from 'src/app/components/service/setor.service';

@Component({
  selector: 'app-editar-setor',
  templateUrl: './editarSetor.component.html',
  styleUrls: ['./editarSetor.component.css']
})
export class EditarSetorComponent implements OnInit {

  setor!: Setor;
  mudouTela: boolean = false;
    
  constructor(private server: SetorService, 
    private router: ActivatedRoute, 
    private route: Router,
    private headerService: HeaderService) {
        headerService.headerData = {
          title: 'Editar Setor',
          icon: 'room_preferences',
          routerUrl: 'cadastro/funcionario/setor',
     }
    }

  ngOnInit(): void {
    this.selecionarPorId();
  }

  selecionarPorId(){
    const id = this.router.snapshot.paramMap.get('id');
    this.server.selecionarPorId(id!).subscribe(res => {
      this.setor = res;
    })
  }

  salvar(){
    this.server.cadastrarSetor(this.setor).subscribe(() =>{
      this.server.message("Cadastro Editado com sucesso");
      this.voltar();
    });
  }

  voltar(){
    this.route.navigate(['cadastro/funcionario/setor'])
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
