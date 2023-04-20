import { ProdutoService } from 'src/app/components/service/produto.service';
import { GrupoProduto } from './../../../../../../interface/grupoProduto';
import { GrupoProdutoService } from './../../../../../../service/grupoProduto.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HeaderService } from 'src/app/components/service/header.service';
import { DialogGrupoComponent } from './dialogGrupo/dialogGrupo.component';

@Component({
  selector: 'app-exluir',
  templateUrl: './excluirGrupo.component.html',
  styleUrls: ['./excluirGrupo.component.css']
})
export class ExcluirGrupoComponent implements OnInit {

  grupoProduto!: GrupoProduto;
  clienteDiaolog!: string;

  constructor(private grupo: GrupoProdutoService, 
    private route: Router, 
    private produtoServer: ProdutoService,
    private router: ActivatedRoute,
    public dialog: MatDialog,
    private headerService: HeaderService) { 
      headerService.headerData = {
        title: 'Excluir Grupo',
        icon: 'inventory_2',
        routerUrl: 'cadastro/produto/grupo',
      }
    }

  
  ngOnInit(): void {
    this.selecionarPorId();
  }

  selecionarPorId(){
    const id = this.router.snapshot.paramMap.get('id');
    this.grupo.selecionarPorId(id!).subscribe(res =>{
      this.grupoProduto = res;
    })
  }


  voltar(){
    this.route.navigate(['cadastro/produto/grupo']);
  }

  openDialog(){
    const dialogRef = this.dialog.open(DialogGrupoComponent, {
      width: '250px',
      data: 'Deseja deletar o cadastro?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        //verificando se está sendo usado em outra entidade
        this.produtoServer.possueGrupo(this.grupoProduto.id!.toString()).subscribe(res => { 
          if(!res){
            //excluindo
            this.grupoProduto.delete = true;
            this.grupo.cadastrarGrupoProduto(this.grupoProduto).subscribe(res =>{
            this.grupo.message("Cadastro excluido com sucesso!")
            this.voltar();
            });
          }else{
            this.grupo.message("Produto possui cadastro com esse registro...", res)
            this.voltar();
          }
        });
      }
    });
  }
}
