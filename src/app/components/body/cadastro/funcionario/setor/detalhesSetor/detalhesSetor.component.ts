import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Setor } from 'src/app/components/interface/setor';
import { HeaderService } from 'src/app/components/service/header.service';
import { SetorService } from 'src/app/components/service/setor.service';

@Component({
  selector: 'app-detalhes-setor',
  templateUrl: './detalhesSetor.component.html',
  styleUrls: ['./detalhesSetor.component.css']
})
export class DetalhesSetorComponent implements OnInit {

  setor!: Setor;

  constructor(
    private server: SetorService, 
    private route: Router, 
    private router: ActivatedRoute,
    private headerService: HeaderService) {
      headerService.headerData = {
        title: 'Detalhes Setor',
        icon: 'room_preferences',
        routerUrl: 'cadastro/funcionario/setor',
      }
    }

  ngOnInit(): void {
    this.selecionarPorId();
  }

  selecionarPorId(){
    const id = this.router.snapshot.paramMap.get('id');
    this.server.selecionarPorId(id!).subscribe(res =>
      { 
        this.setor = res;
      })
  }

  editar(): void{
    const id = this.router.snapshot.paramMap.get('id');
    this.route.navigate(['cadastro/funcionario/setor/editar/'+id])
  }
  voltar(): void{
    this.route.navigate(['cadastro/funcionario/setor'])
  }

}
