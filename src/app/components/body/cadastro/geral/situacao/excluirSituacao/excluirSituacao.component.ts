import { ProdutoService } from 'src/app/components/service/produto.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Situacao } from 'src/app/components/interface/situacao';
import { HeaderService } from 'src/app/components/service/header.service';
import { SituacaoService } from 'src/app/components/service/situacao.service';
import { DialogSituacaoComponent } from './dialogSituacao/dialogSituacao.component';
import { UsuarioService } from 'src/app/components/service/usuario.service';

@Component({
  selector: 'app-excluirSituacao',
  templateUrl: './excluirSituacao.component.html',
  styleUrls: ['./excluirSituacao.component.css']
})

export class ExcluirSituacaoComponent implements OnInit {

  constructor(private situacaoServer: SituacaoService, 
    private route: Router, 
    private router: ActivatedRoute,
    public dialog: MatDialog,
    private usuarioServer: UsuarioService,
    private produtoServer: ProdutoService,
    private headerService: HeaderService) {

      headerService.headerData = {
        title: 'Excluir Situação',
        icon: 'more_horiz',
        routerUrl: 'cadastro/geral/situacao',
      }
   }

   situacao!: Situacao;
   situacaoPedidoDiaolog!: string;
  
   ngOnInit(): void {
     this.selecionarPorId();
   }
 
   selecionarPorId(){
     const id = this.router.snapshot.paramMap.get('id');
     this.situacaoServer.selecionarPorId(id!).subscribe(res =>{
       this.situacao = res;
     })
   }
  
   voltar(){
     this.route.navigate(['cadastro/geral/situacao']);
   }
 
    openDialog(){
      
      const dialogRef = this.dialog.open(DialogSituacaoComponent, {
        width: '250px',
        data: 'Deseja deletar o cadastro?'
      });
  
      dialogRef.afterClosed().subscribe(result => { 
        if(result){
          //verificando se está sendo usado em outra entidade
          this.usuarioServer.possueSituacao(this.situacao.id!.toString()).subscribe(res => { 
            if(!res){
              this.produtoServer.possueSituacao(this.situacao.id!.toString()).subscribe(res => {
                if(!res){
                  //excluindo
                    this.situacaoServer.excluirSituacao(this.situacao.id!.toString()).subscribe(res =>{
                      this.situacaoServer.message("Cadastro excluido com sucesso!")
                      this.voltar();
                    });
                }else{
                  this.situacaoServer.message("Produto possue cadastro com esse registro...", res)
                  this.voltar();
                }
              });   
            }else{
              this.situacaoServer.message("Usuario possue cadastro com esse registro...", res)
              this.voltar();
            }
        });
      }
    });
  }

}
