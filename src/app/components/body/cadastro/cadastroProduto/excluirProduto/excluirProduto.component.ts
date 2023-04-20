import { GrupoProdutoService } from 'src/app/components/service/grupoProduto.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Produto } from 'src/app/components/interface/produto';
import { HeaderService } from 'src/app/components/service/header.service';
import { ProdutoService } from 'src/app/components/service/produto.service';
import { DialogProdutoComponent } from './dialogProduto/dialogProduto.component';

@Component({
  selector: 'app-excluir-produto',
  templateUrl: './excluirProduto.component.html',
  styleUrls: ['./excluirProduto.component.css']
})
export class ExcluirProdutoComponent implements OnInit {

  produto!: Produto;
  funcionarioDiaolog!: string;

  constructor(private server: ProdutoService, 
    private grupoServer: GrupoProdutoService,
    private route: Router, 
    private router: ActivatedRoute,
    public dialog: MatDialog,
    private headerService: HeaderService) { 
        headerService.headerData = {
          title: 'Excluir Produto',
          icon: 'inventory_2',
          routerUrl: 'cadastro/produto',
        }
    }

  
  ngOnInit(): void {
    this.selecionarPorId();
  }

  selecionarPorId(){
    const id = this.router.snapshot.paramMap.get('id');
    this.server.selecionarPorId(id!).subscribe(res =>{
      this.produto = res;
    })
  }

  voltar(){
    this.route.navigate(['cadastro/produto']);
  }

  openDialog(){
    const dialogRef = this.dialog.open(DialogProdutoComponent, {
      width: '250px',
      data: 'Deseja deletar o cadastro?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        //verificando se está sendo usado em outra entidade
        this.grupoServer.possueProduto(this.produto.id!.toString()).subscribe(res =>{
          if(!res){
            //excluindo
            this.produto.delete = true;
            this.server.cadastrarProduto(this.produto).subscribe(res =>{
              this.server.message("Cadastro excluido com sucesso!")
              this.voltar();
            });
          }else{
            this.server.message("Grupo possui cadastro com esse registro...", res)
            this.voltar();
        }
        })
        
      }
    });
  }

}


