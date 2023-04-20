import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from 'src/app/components/interface/login';
import { HeaderService } from 'src/app/components/service/header.service';
import { LoginService } from 'src/app/components/service/login.service';

@Component({
  selector: 'app-detalhesLogin',
  templateUrl: './detalhesLogin.component.html',
  styleUrls: ['./detalhesLogin.component.css']
})
export class DetalhesLoginComponent implements OnInit {

  login!: Login;

  constructor(private server: LoginService, 
    private route: Router, 
    private router: ActivatedRoute,
    private headerService: HeaderService) {
      headerService.headerData = {
        title: 'Detalhes Login',
        icon: 'key',
        routerUrl: 'cadastro/login',
      }
    }

  ngOnInit(): void {
    this.selecionarPorId();
  }

  selecionarPorId(){
    const id = this.router.snapshot.paramMap.get('id');
    this.server.selecionarPorId(id!).subscribe(res =>
      { 
        this.login = res;
      })
  }

  editar(): void{
    const id = this.router.snapshot.paramMap.get('id');
    this.route.navigate(['cadastro/login/editar/'+id])
  }
  voltar(): void{
    this.route.navigate(['cadastro/login'])
  }
 
}
