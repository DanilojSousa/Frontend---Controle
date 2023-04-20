import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NivelFuncao } from 'src/app/components/interface/NivelFuncao';
import { HeaderService } from 'src/app/components/service/header.service';
import { NivelFuncaoService } from 'src/app/components/service/nivelFuncao.service';

@Component({
  selector: 'app-detalhesNivel',
  templateUrl: './detalhesNivel.component.html',
  styleUrls: ['./detalhesNivel.component.css']
})
export class DetalhesNivelComponent implements OnInit {

  constructor(private server: NivelFuncaoService, 
    private route: Router, 
    private router: ActivatedRoute,
    private headerService: HeaderService) {
      headerService.headerData = {
        title: 'Detalhes Nível',
        icon: 'trending_up',
        routerUrl: 'cadastro/funcionario/nivel',
      }
    }

    nivelFuncao!: NivelFuncao;

  ngOnInit(): void {
    this.selecionarPorId();
  }

  selecionarPorId(){
    const id = this.router.snapshot.paramMap.get('id');
    this.server.selecionarPorId(id!).subscribe(res =>
      { 
        this.nivelFuncao = res;
      })
  }

  editar(): void{
    const id = this.router.snapshot.paramMap.get('id');
    this.route.navigate(['cadastro/funcionario/nivel/editar/'+id])
  }
  voltar(): void{
    this.route.navigate(['cadastro/funcionario/nivel'])
  }


}
