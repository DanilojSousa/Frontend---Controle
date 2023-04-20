import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Role } from 'src/app/components/interface/role';
import { Situacao } from 'src/app/components/interface/situacao';
import { Usuario } from 'src/app/components/interface/usuario';
import { BuscarCepService } from 'src/app/components/service/buscar-cep.service';
import { HeaderService } from 'src/app/components/service/header.service';
import { RoleService } from 'src/app/components/service/role.service';
import { SituacaoService } from 'src/app/components/service/situacao.service';
import { UsuarioService } from 'src/app/components/service/usuario.service';


@Component({
  selector: 'app-editarUsuario',
  templateUrl: './editarUsuario.component.html',
  styleUrls: ['./editarUsuario.component.css']
})
export class EditarUsuarioComponent implements OnInit {

  listaSituacao!: Situacao[];
  usuario!: Usuario;
  listaRole: Role[] = [];
  mudouTela: boolean = false;
    
  constructor(private server: UsuarioService, 
    private router: ActivatedRoute, 
    private route: Router,
    private situacaoService: SituacaoService,
    private roleService: RoleService,
    private buscarCep: BuscarCepService,
    private headerService: HeaderService) {
        headerService.headerData = {
          title: 'Editar Usuario',
          icon: 'person',
          routerUrl: 'cadastro/usuario',
     }
    }

  ngOnInit(): void {
    this.selecionarPorId();
    this.selecionarSituacao();
    this.selecionarNivelAcesso();

  }

  selecionarPorId(){
    const id = this.router.snapshot.paramMap.get('id');
    this.server.selecionarPorId(id!).subscribe(res => {
      this.usuario = res;
    })
  }

  salvar(){
    this.usuario.fone = this.usuario.fone!.replace(/[^0-9]/g,'');
    this.usuario.cpf = this.usuario.cpf!.replace(/[^0-9]/g,'');
    this.situacaoService.selecionarPorId(this.usuario.situacao.id!.toString()).subscribe(res => {
      this.usuario.situacao = res;
    })
    this.server.cadastrar(this.usuario).subscribe(() =>{
      this.server.message("Cadastro Editado com sucesso");
      this.voltar();
    });
  }

  voltar(){
    this.route.navigate(['cadastro/usuario'])
  }

  fone(): boolean{
    if(this.usuario.fone!.length == 11){
      return true;
    }
    return false;
  }

  selecionarSituacao(){
    this.situacaoService.selecionarTodos().subscribe(res => {
      this.listaSituacao = res;
    })
  }

  selecionarNivelAcesso(){
    this.roleService.selecionarTodos().subscribe(res => {
      this.listaRole= res;
    })
  }

  carregarCep(res: any){
    this.usuario.cep = res.cep;
    this.usuario.endereco = res.logradouro;
    this.usuario.cidade = res.localidade;
    this.usuario.bairro = res.bairro;
    this.usuario.uf = res.uf;
  }

  consultaCep(valor: any){
    this.buscarCep.buscar(valor.form.value.cep).subscribe(res =>{
      this.carregarCep(res);
    })
  }

  onInput(){
    this.mudouTela = true;
  }

  podeDesativar(): boolean {
    if(this.mudouTela){
      confirm('A edição não foi salva, deseja sair?')
    }
    return true;
  }
}
