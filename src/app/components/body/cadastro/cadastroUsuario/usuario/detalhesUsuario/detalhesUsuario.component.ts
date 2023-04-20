import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from 'src/app/components/interface/usuario';
import { HeaderService } from 'src/app/components/service/header.service';
import { UsuarioService } from 'src/app/components/service/usuario.service';

@Component({
  selector: 'app-detalhesUsuario',
  templateUrl: './detalhesUsuario.component.html',
  styleUrls: ['./detalhesUsuario.component.css']
})
export class DetalhesUsuarioComponent implements OnInit {

  usuario!: Usuario;

  constructor(private server: UsuarioService, 
    private route: Router, 
    private router: ActivatedRoute,
    private headerService: HeaderService) {
      headerService.headerData = {
        title: 'Detalhes Usuario',
        icon: 'person',
        routerUrl: 'cadastro/usuario',
      }
    }

  ngOnInit(): void {
    this.selecionarPorId();
  }

  selecionarPorId(){
    const id = this.router.snapshot.paramMap.get('id');
    this.server.selecionarPorId(id!).subscribe(res =>
      { 
        this.usuario = res;
      })
  }

  editar(): void{
    const id = this.router.snapshot.paramMap.get('id');
    this.route.navigate(['cadastro/usuario/editar/'+id])
  }
  voltar(): void{
    this.route.navigate(['cadastro/usuario'])
  }

  fone(): boolean{
      if(this.usuario.fone!.length == 11){
        return true;
      }
      return false;
  }
 

}
