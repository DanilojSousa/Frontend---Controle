import { ProdutoService } from 'src/app/components/service/produto.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Ncm } from 'src/app/components/interface/ncm';
import { HeaderService } from 'src/app/components/service/header.service';
import { NcmService } from 'src/app/components/service/ncm.service';
import { DialogNcmComponent } from './dialogNcm/dialogNcm.component';

@Component({
  selector: 'app-excluir-ncm',
  templateUrl: './excluirNcm.component.html',
  styleUrls: ['./excluirNcm.component.css']
})
export class ExcluirNcmComponent implements OnInit {

  ncm!: Ncm;
  clienteDiaolog!: string;

  constructor(private server: NcmService, 
    private route: Router, 
    private produtoServer: ProdutoService,
    private router: ActivatedRoute,
    public dialog: MatDialog,
    private headerService: HeaderService) { 
      headerService.headerData = {
        title: 'Excluir Ncm',
        icon: 'inventory_2',
        routerUrl: 'cadastro/produto/ncm',
      }
    }

  
  ngOnInit(): void {
    this.selecionarPorId();
  }

  selecionarPorId(){
    const id = this.router.snapshot.paramMap.get('id');
    this.server.selecionarPorId(id!).subscribe(res =>{
      this.ncm = res;
    })
  }


  voltar(){
    this.route.navigate(['cadastro/produto/ncm']);
  }

  openDialog(){
    const dialogRef = this.dialog.open(DialogNcmComponent, {
      width: '250px',
      data: 'Deseja deletar o cadastro?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        //verificando se está sendo usado em outra entidade
        this.produtoServer.possueNcm(this.ncm.id!.toString()).subscribe(res => { 
          if(!res){
           //excluindo
            this.server.excluirNcm(this.ncm.id!.toString()).subscribe(res =>{
            this.server.message("Cadastro excluido com sucesso!")
            this.voltar();
            });
          }else{
            this.server.message("Produto possui cadastro com esse registro...", res)
            this.voltar();
          }
        });
      }
    });
  }
}


      
