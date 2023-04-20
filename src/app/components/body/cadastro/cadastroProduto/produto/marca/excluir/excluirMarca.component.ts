import { ProdutoService } from 'src/app/components/service/produto.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Marca } from 'src/app/components/interface/marca';
import { HeaderService } from 'src/app/components/service/header.service';
import { MarcaService } from 'src/app/components/service/marca.service';
import { DialogMarcaComponent } from './dialogMarca/dialogMarca.component';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluirMarca.component.html',
  styleUrls: ['./excluirMarca.component.css']
})
export class ExcluirMarcaComponent implements OnInit {

  marca!: Marca;
  clienteDiaolog!: string;

  constructor(private marcas: MarcaService, 
    private route: Router, 
    private produtoServer: ProdutoService,
    private router: ActivatedRoute,
    public dialog: MatDialog,
    private headerService: HeaderService) { 
      headerService.headerData = {
        title: 'Excluir Marca',
        icon: 'inventory_2',
        routerUrl: 'cadastro/produto/marca',
      }
    }

  
  ngOnInit(): void {
    this.selecionarPorId();
  }

  selecionarPorId(){
    const id = this.router.snapshot.paramMap.get('id');
    this.marcas.selecionarPorId(id!).subscribe(res =>{
      this.marca = res;
    })
  }


  voltar(){
    this.route.navigate(['cadastro/produto/marca']);
  }

  openDialog(){
    const dialogRef = this.dialog.open(DialogMarcaComponent, {
      width: '250px',
      data: 'Deseja deletar o cadastro?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        //verificando se está sendo usado em outra entidade
        this.produtoServer.possueMarca(this.marca.id!.toString()).subscribe(res => { 
          if(!res){
          //excluindo
            this.marca.delete = true;
            this.marcas.cadastrarMarca(this.marca).subscribe(res =>{
            this.marcas.message("Cadastro excluido com sucesso!")
            this.voltar();
            });
          }else{
            this.marcas.message("Produto possui cadastro com esse registro...", res)
            this.voltar();
          }
        });
      }
    });
  }
}



  