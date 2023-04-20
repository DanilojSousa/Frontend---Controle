import { Ncm } from './../../../../../../interface/ncm';
import { Component, OnInit } from '@angular/core';
import { NcmService } from 'src/app/components/service/ncm.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HeaderService } from 'src/app/components/service/header.service';

@Component({
  selector: 'app-editar-ncm',
  templateUrl: './editarNcm.component.html',
  styleUrls: ['./editarNcm.component.css']
})
export class EditarNcmComponent implements OnInit {

  ncm!: Ncm;
  mudouTela: boolean = false;
    
  constructor(private server: NcmService, 
    private router: ActivatedRoute, 
    private route: Router,
    private headerService: HeaderService) {

      headerService.headerData = {
        title: 'Editar Ncm',
        icon: 'inventory_2',
        routerUrl: 'cadastro/produto/ncm',
      }
    }

  ngOnInit(): void {
    this.selecionarPorId();
  }

  selecionarPorId(){
    const id = this.router.snapshot.paramMap.get('id');
    this.server.selecionarPorId(id!).subscribe(res => {
      this.ncm = res;
    })
  }

  salvar(){
      this.server.cadastrarNcm(this.ncm).subscribe(() =>{
      this.server.message("Cadastro Editado com sucesso");
      this.voltar();
    });
  }

  voltar(){
    this.route.navigate(['cadastro/produto/ncm'])
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
