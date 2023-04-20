import { Component, OnInit } from '@angular/core';
import { Login } from 'src/app/components/interface/login';
import { DialogExcluirComponent } from './dialogLogin/dialogExcluir.component';
import { LoginService } from 'src/app/components/service/login.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HeaderService } from 'src/app/components/service/header.service';

@Component({
  selector: 'app-excluirLogin',
  templateUrl: './excluirLogin.component.html',
  styleUrls: ['./excluirLogin.component.css']
})
export class ExcluirLoginComponent implements OnInit {

  login!: Login;
  loginDiaolog!: string;

  constructor(private loginServer: LoginService, 
    private route: Router, 
    private router: ActivatedRoute,
    public dialog: MatDialog,
    private headerService: HeaderService) {

      headerService.headerData = {
        title: 'Excluir Login',
        icon: 'key',
        routerUrl: 'cadastro/login',
      }
   }
  
   ngOnInit(): void {
     this.selecionarPorId();
   }
 
   selecionarPorId(){
     const id = this.router.snapshot.paramMap.get('id');
     this.loginServer.selecionarPorId(id!).subscribe(res =>{
       this.login = res;
     })
   }
 
   voltar(){
     this.route.navigate(['cadastro/login']);
   }
 
   openDialog(){
     const dialogRef = this.dialog.open(DialogExcluirComponent, {
       width: '250px',
       data: 'Deseja deletar o cadastro?'
     });
 
     dialogRef.afterClosed().subscribe(result => {
       if(result){
        this.login.delete = true;
         this.loginServer.cadastrarLogin(this.login).subscribe(res =>{
           this.loginServer.message("Cadastro excluido com sucesso!")
           this.voltar();
         });
       }
     });
   }

}
