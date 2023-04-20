import { Component, OnInit } from '@angular/core';
import { FuncionarioSetorService } from 'src/app/components/service/funcionarioSetor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HeaderService } from 'src/app/components/service/header.service';
import { DialogFuncaoComponent } from './dialogFuncao/dialogFuncao.component';
import { FuncionarioSetor } from 'src/app/components/interface/funcionarioSetor';

@Component({
  selector: 'app-excluir',
  templateUrl: './excluirFuncao.component.html',
  styleUrls: ['./excluirFuncao.component.css']
})
export class ExcluirFuncaoComponent implements OnInit {

  funcionarioSetor!: FuncionarioSetor;
  funcionarioDiaolog!: string;

  constructor(private server: FuncionarioSetorService, 
    private route: Router, 
    private router: ActivatedRoute,
    public dialog: MatDialog,
    private headerService: HeaderService) { 
        headerService.headerData = {
          title: 'Excluir Funcao',
          icon: 'groups',
          routerUrl: 'cadastro/funcionario/funcao',
        }
    }

  
  ngOnInit(): void {
    this.selecionarPorId();
  }

  selecionarPorId(){
    const id = this.router.snapshot.paramMap.get('id');
    this.server.selecionarPorId(id!).subscribe(res =>{
      this.funcionarioSetor = res;
    })
  }

  voltar(){
    this.route.navigate(['cadastro/funcionario/funcao']);
  }

  openDialog(){
    const dialogRef = this.dialog.open(DialogFuncaoComponent, {
      width: '250px',
      data: 'Deseja deletar o cadastro?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.funcionarioSetor.delete = true;
        this.server.cadastrarFuncionarioSetor(this.funcionarioSetor).subscribe(res =>{
          this.server.message("Cadastro excluido com sucesso!")
          this.voltar();
        });
      }
    });
  }

}
