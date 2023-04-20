import { FuncionarioSetorService } from 'src/app/components/service/funcionarioSetor.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { NivelFuncaoService } from 'src/app/components/service/nivelFuncao.service';
import { HeaderService } from 'src/app/components/service/header.service';
import { NivelFuncao } from 'src/app/components/interface/NivelFuncao';
import { DialogNivelComponent } from './dialogNivel/dialogNivel.component';
import { UsuarioService } from 'src/app/components/service/usuario.service';

@Component({
  selector: 'app-excluirNivel',
  templateUrl: './excluirNivel.component.html',
  styleUrls: ['./excluirNivel.component.css']
})
export class ExcluirNivelComponent implements OnInit {

  constructor(private nivelServer: NivelFuncaoService, 
    private route: Router, 
    private router: ActivatedRoute,
    public dialog: MatDialog,
    private funcaoServer: FuncionarioSetorService,
    private headerService: HeaderService) {

      headerService.headerData = {
        title: 'Excluir Nível',
        icon: 'trending_up',
        routerUrl: 'cadastro/funcionario/nivel',
      }
   }

   nivelFuncao!: NivelFuncao;
   nivelFuncaoDiaolog!: string;
  
   ngOnInit(): void {
     this.selecionarPorId();
   }
 
   selecionarPorId(){
     const id = this.router.snapshot.paramMap.get('id');
     this.nivelServer.selecionarPorId(id!).subscribe(res =>{
       this.nivelFuncao = res;
     })
   }
  
   voltar(){
     this.route.navigate(['cadastro/funcionario/nivel']);
   }
 
    openDialog(){
      
      const dialogRef = this.dialog.open(DialogNivelComponent, {
        width: '250px',
        data: 'Deseja deletar o cadastro?'
      });
  
      dialogRef.afterClosed().subscribe(result => { 
        if(result){
          //verificando se está sendo usado em outra entidade
          this.funcaoServer.possueNivel(this.nivelFuncao.id!.toString()).subscribe(res => { 
            if(!res){
              //excluindo
              this.nivelServer.excluirNivelFuncao(this.nivelFuncao.id!.toString()).subscribe(res =>{
                this.nivelServer.message("Cadastro excluido com sucesso!")
                this.voltar();
            });
            }else{
              this.nivelServer.message("Função possui cadastro com esse registro...", res)
              this.voltar();
          }
        });
    }
    });
  }

}
