import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/components/service/usuario.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HeaderService } from 'src/app/components/service/header.service';
import { DialogUsuarioComponent } from './dialogExcluir/dialogUsuario.component';
import { Usuario } from 'src/app/components/interface/usuario';

@Component({
  selector: 'app-excluirUsuario',
  templateUrl: './excluirUsuario.component.html',
  styleUrls: ['./excluirUsuario.component.css']
})
export class ExcluirUsuarioComponent implements OnInit {

  usuario!: Usuario;
  usuarioDiaolog!: string;

  constructor(private usuarioServer: UsuarioService, 
    private route: Router, 
    private router: ActivatedRoute,
    public dialog: MatDialog,
    private headerService: HeaderService) {

      headerService.headerData = {
        title: 'Excluir Cliente',
        icon: 'handshake',
        routerUrl: 'cadastro/usuario',
      }
   }
  
   ngOnInit(): void {
     this.selecionarPorId();
   }
 
   selecionarPorId(){
     const id = this.router.snapshot.paramMap.get('id');
     this.usuarioServer.selecionarPorId(id!).subscribe(res =>{
       this.usuario = res;
     })
   }
 
   fone(): Boolean{
     if(this.usuario.fone!.length == 11){
       return true;
     }
     return false;
   }
 
   voltar(){
     this.route.navigate(['cadastro/usuario']);
   }
 
   openDialog(){
     const dialogRef = this.dialog.open(DialogUsuarioComponent, {
       width: '250px',
       data: 'Deseja deletar o cadastro?'
     });
 
     dialogRef.afterClosed().subscribe(result => {
       if(result){
        this.usuarioServer.possueLogin(this.usuario.id!.toString()).subscribe(res =>{
          if(res){
            this.usuarioServer.possueFuncionarioSetor(this.usuario.id!.toString()).subscribe(res =>{
              if(res){
                this.usuario.delete = true;
                this.usuarioServer.cadastrar(this.usuario).subscribe(res =>{
                  this.usuarioServer.message("Cadastro excluido com sucesso!")
                  this.voltar();
                });
              }else{
                this.usuarioServer.message("Possue Funcionário_Setor Ativo!", true);
                this.voltar();
              }
            });
          }else{
            this.usuarioServer.message("Possue Login Ativo!", true)
            this.voltar();
          }
         });
       }
     });
   }


}
