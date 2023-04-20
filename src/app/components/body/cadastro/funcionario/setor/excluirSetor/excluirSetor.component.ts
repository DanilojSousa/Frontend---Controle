import { FuncionarioSetorService } from 'src/app/components/service/funcionarioSetor.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Setor } from 'src/app/components/interface/setor';
import { HeaderService } from 'src/app/components/service/header.service';
import { SetorService } from 'src/app/components/service/setor.service';
import { DialogSetorComponent } from './dialogSetor/dialogSetor.component';

@Component({
  selector: 'app-excluir-setor',
  templateUrl: './excluirSetor.component.html',
  styleUrls: ['./excluirSetor.component.css']
})
export class ExcluirSetorComponent implements OnInit {

  setor!: Setor;
  setorDiaolog!: string;

  constructor(private server: SetorService, 
    private route: Router, 
    private funcionaSetorServer: FuncionarioSetorService,
    private router: ActivatedRoute,
    public dialog: MatDialog,
    private headerService: HeaderService) { 
        headerService.headerData = {
          title: 'Excluir Setor',
          icon: 'room_preferences',
          routerUrl: 'cadastro/funcionario/setor',
        }
    }

  
  ngOnInit(): void {
    this.selecionarPorId();
  }

  selecionarPorId(){
    const id = this.router.snapshot.paramMap.get('id');
    this.server.selecionarPorId(id!).subscribe(res =>{
      this.setor = res;
    })
  }

  voltar(){
    this.route.navigate(['cadastro/funcionario/setor']);
  }

  openDialog(){
    const dialogRef = this.dialog.open(DialogSetorComponent, {
      width: '250px',
      data: 'Deseja deletar o cadastro?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        //verificando se está sendo usado em outra entidade
        this.funcionaSetorServer.possueSetor(this.setor.id!.toString()).subscribe(res => {
          if(!res){
            //excluindo
            this.server.excluirSetor(this.setor.id!.toString()).subscribe(res =>{
              this.server.message("Cadastro excluido com sucesso!")
              this.voltar();
            });
          }else{
            this.server.message("Possui cadastro com esse registro...", res)
            this.voltar();
        }
        })
        
      }
    });
  }

}

