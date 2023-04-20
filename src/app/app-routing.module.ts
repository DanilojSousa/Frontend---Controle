
import { LoginComponent } from './components/body/acesso/login/login.component';
import { DetalhesFormaPagamentoComponent } from './components/body/cadastro/cadastroFinanceiro/formaPagamento/detalhesFormaPagamento/detalhesFormaPagamento.component';
import { EditarFormaPagamentoComponent } from './components/body/cadastro/cadastroFinanceiro/formaPagamento/editarFormaPagamento/editarFormaPagamento.component';
import { ExcluirFormaPagamentoComponent } from './components/body/cadastro/cadastroFinanceiro/formaPagamento/excluir/excluirFormaPagamento.component';
import { CadastroFormaPagamentoComponent } from './components/body/cadastro/cadastroFinanceiro/formaPagamento/cadastroFormaPagamento/cadastroFormaPagamento.component';
import { DetalhesProdutoComponent } from './components/body/cadastro/cadastroProduto/detalhesProduto/detalhesProduto.component';
import { EditarProdutoComponent } from './components/body/cadastro/cadastroProduto/editarProduto/editarProduto.component';
import { CadastrarProdutoComponent } from './components/body/cadastro/cadastroProduto/cadastrarProduto/cadastrarProduto.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/body/home/home.component';
import { ProdutoComponent } from './components/body/cadastro/cadastroProduto/produto/produto.component';
import { ExcluirProdutoComponent } from './components/body/cadastro/cadastroProduto/excluirProduto/excluirProduto.component';
import { NcmComponent } from './components/body/cadastro/cadastroProduto/produto/ncm/ncm/ncm.component';
import { MarcaComponent } from './components/body/cadastro/cadastroProduto/produto/marca/marca/marca.component';
import { GrupoComponent } from './components/body/cadastro/cadastroProduto/produto/grupo/grupo/grupo.component';
import { CadastrarGrupoComponent } from './components/body/cadastro/cadastroProduto/produto/grupo/cadastrarGrupo/cadastrarGrupo.component';
import { DetalhesGrupoComponent } from './components/body/cadastro/cadastroProduto/produto/grupo/detalhesGrupo/detalhesGrupo.component';
import { ExcluirGrupoComponent } from './components/body/cadastro/cadastroProduto/produto/grupo/exluir/excluirGrupo.component';
import { EditarGrupoComponent } from './components/body/cadastro/cadastroProduto/produto/grupo/editarGrupo/editarGrupo.component';
import { CadastrarMarcaComponent } from './components/body/cadastro/cadastroProduto/produto/marca/cadastrarMarca/cadastrarMarca.component';
import { EditarMarcaComponent } from './components/body/cadastro/cadastroProduto/produto/marca/editarMarca/editarMarca.component';
import { DetalhesMarcaComponent } from './components/body/cadastro/cadastroProduto/produto/marca/detalhesMarca/detalhesMarca.component';
import { ExcluirMarcaComponent } from './components/body/cadastro/cadastroProduto/produto/marca/excluir/excluirMarca.component';
import { CadastrarNcmComponent } from './components/body/cadastro/cadastroProduto/produto/ncm/cadastrarNcm/cadastrarNcm.component';
import { ExcluirNcmComponent } from './components/body/cadastro/cadastroProduto/produto/ncm/excluirNcm/excluirNcm.component';
import { EditarNcmComponent } from './components/body/cadastro/cadastroProduto/produto/ncm/editarNcm/editarNcm.component';
import { DetalhesNcmComponent } from './components/body/cadastro/cadastroProduto/produto/ncm/detalhesNcm/detalhesNcm.component';
import { UnidadeMedidaComponent } from './components/body/cadastro/cadastroProduto/produto/unidadeMedida/unidadeMedida/unidadeMedida.component';
import { DetalhesUnidadeMedidaComponent } from './components/body/cadastro/cadastroProduto/produto/unidadeMedida/detalhesUnidadeMedida/detalhesUnidadeMedida.component';
import { EditarUnidadeMedidaComponent } from './components/body/cadastro/cadastroProduto/produto/unidadeMedida/editarUnidadeMedida/editarUnidadeMedida.component';
import { CadastrarUnidadeMedidaComponent } from './components/body/cadastro/cadastroProduto/produto/unidadeMedida/cadastrarUnidadeMedida/cadastrarUnidadeMedida.component';
import { ExcluirUnidadeMedidaComponent } from './components/body/cadastro/cadastroProduto/produto/unidadeMedida/excluir/excluirUnidadeMedida.component';
import { PedidoComponent } from './components/body/vendas/pedido/pedido.component';
import { CadastroSituacaoPedidoComponent } from './components/body/cadastro/cadastroFinanceiro/situacaoPedido/cadastroSituacaoPedido/cadastroSituacaoPedido.component';
import { ExcluirSituacaoPedidoComponent } from './components/body/cadastro/cadastroFinanceiro/situacaoPedido/excluir/excluirSituacaoPedido.component';
import { EditarSituacaoPedidoComponent } from './components/body/cadastro/cadastroFinanceiro/situacaoPedido/editarSituacaoPedido/editarSituacaoPedido.component';
import { DetalhesSituacaoPedidoComponent } from './components/body/cadastro/cadastroFinanceiro/situacaoPedido/detalhesSituacaoPedido/detalhesSituacaoPedido.component';
import { CadastroTipoPedidoComponent } from './components/body/cadastro/cadastroFinanceiro/tipoPedido/cadastroTipoPedido/cadastroTipoPedido.component';
import { EditarTipoPedidoComponent } from './components/body/cadastro/cadastroFinanceiro/tipoPedido/editarTipoPedido/editarTipoPedido.component';
import { DetalhesTipoPedidoComponent } from './components/body/cadastro/cadastroFinanceiro/tipoPedido/detalhesTipoPedido/detalhesTipoPedido.component';
import { FormaPagamentoComponent } from './components/body/cadastro/cadastroFinanceiro/formaPagamento/pagamento/pagamento.component';
import { SituacaoPedidoComponent } from './components/body/cadastro/cadastroFinanceiro/situacaoPedido/situacao/situacao.component';
import { TipoPedidoComponent } from './components/body/cadastro/cadastroFinanceiro/tipoPedido/tipo/tipo.component';
import { ExcluirTipoPedidoComponent } from './components/body/cadastro/cadastroFinanceiro/tipoPedido/excluir/excluirTipoPedido.component';
import { ExcluirServicoComponent } from './components/body/cadastro/cadastroFinanceiro/servico/excluirServico/excluirServico.component';
import { EditarServicoComponent } from './components/body/cadastro/cadastroFinanceiro/servico/editarServico/editarServico.component';
import { DetalhesServicoComponent } from './components/body/cadastro/cadastroFinanceiro/servico/detalhesServico/detalhesServico.component';
import { ServicoComponent } from './components/body/cadastro/cadastroFinanceiro/servico/servico/servico.component';
import { CadastroServicoComponent } from './components/body/cadastro/cadastroFinanceiro/servico/cadastroServico/cadastroServico.component';
import { CadastrarSituacaoComponent } from './components/body/cadastro/geral/situacao/cadastrarSituacao/cadastrarSituacao.component';
import { ExcluirSituacaoComponent } from './components/body/cadastro/geral/situacao/excluirSituacao/excluirSituacao.component';
import { EditarSituacaoComponent } from './components/body/cadastro/geral/situacao/editarSituacao/editarSituacao.component';
import { DetalhesSituacaoComponent } from './components/body/cadastro/geral/situacao/detalhesSituacao/detalhesSituacao.component';
import { SituacaoComponent } from './components/body/cadastro/geral/situacao/situacao/situacao.component';
import { UsuarioComponent } from './components/body/cadastro/cadastroUsuario/usuario/usuario.component';
import { CadastrarSetorComponent } from './components/body/cadastro/funcionario/setor/cadastrarSetor/cadastrarSetor.component';
import { ExcluirSetorComponent } from './components/body/cadastro/funcionario/setor/excluirSetor/excluirSetor.component';
import { EditarSetorComponent } from './components/body/cadastro/funcionario/setor/editarSetor/editarSetor.component';
import { DetalhesSetorComponent } from './components/body/cadastro/funcionario/setor/detalhesSetor/detalhesSetor.component';
import { FuncaoComponent } from './components/body/cadastro/funcionario/funcao/funcao/funcao.component';
import { CadastrarFuncaoComponent } from './components/body/cadastro/funcionario/funcao/cadastrarFuncao/cadastrarFuncao.component';
import { DetalhesFuncaoComponent } from './components/body/cadastro/funcionario/funcao/detalhesFuncao/detalhesFuncao.component';
import { ExcluirFuncaoComponent } from './components/body/cadastro/funcionario/funcao/excluir/excluirFuncao.component';
import { EditarFuncaoComponent } from './components/body/cadastro/funcionario/funcao/editarFuncao/editarFuncao.component';
import { CadastrarNivelComponent } from './components/body/cadastro/funcionario/nivel/cadastrarNivel/cadastrarNivel.component';
import { ExcluirNivelComponent } from './components/body/cadastro/funcionario/nivel/excluirNivel/excluirNivel.component';
import { EditarNivelComponent } from './components/body/cadastro/funcionario/nivel/editarNivel/editarNivel.component';
import { DetalhesNivelComponent } from './components/body/cadastro/funcionario/nivel/detalhesNivel/detalhesNivel.component';
import { NivelComponent } from './components/body/cadastro/funcionario/nivel/nivel/nivel.component';
import { SetorComponent } from './components/body/cadastro/funcionario/setor/setor/setor.component';
import { CadastroUsuarioComponent } from './components/body/acesso/cadastroUsuario/cadastroUsuario.component';
import { EsqueceuSenhaComponent } from './components/body/acesso/esqueceuSenha/esqueceuSenha.component';

import { UserGuard } from './account/shared/userGuards';
import { RHGuard } from './account/shared/rhGuard';
import { FinanceiroGuard } from './account/shared/financeiroGuard';
import { AdminGuard } from './account/shared/adminGuard';
import { DetalhesUsuarioComponent } from './components/body/cadastro/cadastroUsuario/usuario/detalhesUsuario/detalhesUsuario.component';
import { CadastrarUsuarioComponent } from './components/body/cadastro/cadastroUsuario/usuario/cadastrarUsuario/cadastrarUsuario.component';
import { EditarUsuarioComponent } from './components/body/cadastro/cadastroUsuario/usuario/editarUsuario/editarUsuario.component';
import { ExcluirUsuarioComponent } from './components/body/cadastro/cadastroUsuario/usuario/excluir-usuario/excluirUsuario.component';
import { DetalhesLoginComponent } from './components/body/cadastro/cadastroUsuario/login/detalhesLogin/detalhesLogin.component';
import { LoginCadastroComponent } from './components/body/cadastro/cadastroUsuario/login/loginCadastro.component';
import { EditarLoginComponent } from './components/body/cadastro/cadastroUsuario/login/editarLogin/editarLogin.component';
import { CadastrarLoginComponent } from './components/body/cadastro/cadastroUsuario/login/cadastrarLogin/cadastrarLogin.component';
import { ExcluirLoginComponent } from './components/body/cadastro/cadastroUsuario/login/excluirLogin/excluirLogin.component';
import { TrocaSenhaComponent } from './components/body/acesso/trocaSenha/trocaSenha.component';


const routes: Routes = [
  {
    path: "inicio", 
    component: HomeComponent
  },{
    path: "cadastro/usuario",
    component: UsuarioComponent, 
    canActivate: [RHGuard],
  },{path: "cadastro/usuario/detalhes/:id",
    component: DetalhesUsuarioComponent,
    canActivate: [RHGuard],
  },{
    path: "cadastro/usuario/editar/:id",
    component: EditarUsuarioComponent,
    canActivate: [RHGuard],
  },{
    path: "cadastro/usuario/criar",
    component: CadastrarUsuarioComponent,
    canActivate: [RHGuard],
  },{
    path: "cadastro/usuario/excluir/:id",
    component: ExcluirUsuarioComponent,
    canActivate: [RHGuard],
  },{
    path: "cadastro/login",
    component: LoginCadastroComponent, 
    canActivate: [RHGuard],
  },{path: "cadastro/login/detalhes/:id",
    component: DetalhesLoginComponent,
    canActivate: [RHGuard],
  },{
    path: "cadastro/login/editar/:id",
    component: EditarLoginComponent,
    canActivate: [RHGuard],
  },{
    path: "cadastro/login/criar",
    component: CadastrarLoginComponent,
    canActivate: [RHGuard],
  },{
    path: "cadastro/login/excluir/:id",
    component: ExcluirLoginComponent,
    canActivate: [RHGuard],
  },{
    path: "cadastro/produto",
    component: ProdutoComponent,
    canActivate: [UserGuard],
  },{
    path: "cadastro/produto/criar",
    component: CadastrarProdutoComponent,  
    canActivate: [UserGuard],
  },{
    path: "cadastro/produto/excluir/:id",
    component: ExcluirProdutoComponent,
    canActivate: [UserGuard],
  },{
    path: "cadastro/produto/editar/:id",
    component: EditarProdutoComponent,
    canActivate: [UserGuard],
  },{
    path: "cadastro/produto/detalhes/:id",
    component: DetalhesProdutoComponent,
    canActivate: [UserGuard],
  },{
    path: "cadastro/produto/grupo",
    component: GrupoComponent,
    canActivate: [UserGuard],
  },{
    path: "cadastro/produto/grupo/detalhes/:id",
    component: DetalhesGrupoComponent,
    canActivate: [UserGuard],
  },{
    path: "cadastro/produto/grupo/criar",
    component: CadastrarGrupoComponent,
    canActivate: [UserGuard],
  },{
    path: "cadastro/produto/grupo/excluir/:id",
    component: ExcluirGrupoComponent,
    canActivate: [UserGuard],
  },{
    path: "cadastro/produto/grupo/editar/:id",
    component: EditarGrupoComponent,
    canActivate: [UserGuard],
  },{
    path: "cadastro/produto/marca",
    component: MarcaComponent,
    canActivate: [UserGuard],
  },{
    path: "cadastro/produto/marca/criar",
    component: CadastrarMarcaComponent,
    canActivate: [UserGuard],
  },{
    path: "cadastro/produto/marca/excluir/:id",
    component: ExcluirMarcaComponent,
    canActivate: [UserGuard],
  },{
    path: "cadastro/produto/marca/editar/:id",
    component: EditarMarcaComponent,
    canActivate: [UserGuard],
  },{
    path: "cadastro/produto/marca/detalhes/:id",
    component: DetalhesMarcaComponent,
    canActivate: [UserGuard],
  },{
    path: "cadastro/produto/ncm",
    component: NcmComponent,
    canActivate: [UserGuard],
  },{
    path: "cadastro/produto/ncm/criar",
    component: CadastrarNcmComponent,
    canActivate: [UserGuard],
  },{
    path: "cadastro/produto/ncm/excluir/:id",
    component: ExcluirNcmComponent,
    canActivate: [UserGuard],
  },{
    path: "cadastro/produto/ncm/editar/:id",
    component: EditarNcmComponent,
    canActivate: [UserGuard],
  },{
    path: "cadastro/produto/ncm/detalhes/:id",
    component: DetalhesNcmComponent,
    canActivate: [UserGuard],
  },{
    path: "cadastro/produto/unidadeMedida",
    component: UnidadeMedidaComponent,
    canActivate: [UserGuard],
  },{
    path: "cadastro/produto/unidadeMedida/criar",
    component: CadastrarUnidadeMedidaComponent,
    canActivate: [UserGuard],
  },{
    path: "cadastro/produto/unidadeMedida/excluir/:id",
    component: ExcluirUnidadeMedidaComponent,
    canActivate: [UserGuard],
  },{
    path: "cadastro/produto/unidadeMedida/editar/:id",
    component: EditarUnidadeMedidaComponent,
    canActivate: [UserGuard],
  },{
    path: "cadastro/produto/unidadeMedida/detalhes/:id",
    component: DetalhesUnidadeMedidaComponent,
    canActivate: [UserGuard],
  },{
    path: "cadastro/funcionario/setor",
    component: SetorComponent,
    canActivate: [RHGuard],
  },{
    path: "cadastro/funcionario/setor/criar",
    component: CadastrarSetorComponent,
    canActivate: [RHGuard],
  },{
    path: "cadastro/funcionario/setor/excluir/:id",
    component: ExcluirSetorComponent,
    canActivate: [RHGuard],
  },{
    path: "cadastro/funcionario/setor/editar/:id",
    component: EditarSetorComponent,
    canActivate: [RHGuard],
  },{
    path: "cadastro/funcionario/setor/detalhes/:id",
    component: DetalhesSetorComponent,
    canActivate: [RHGuard],
  },{
    path: "cadastro/funcionario/funcao",
    component: FuncaoComponent,
    canActivate: [RHGuard],
  },{
    path: "cadastro/funcionario/funcao/criar",
    component: CadastrarFuncaoComponent,
    canActivate: [RHGuard],
  },{
    path: "cadastro/funcionario/funcao/detalhes/:id",
    component: DetalhesFuncaoComponent,
    canActivate: [RHGuard],
  },{
    path: "cadastro/funcionario/funcao/excluir/:id",
    component: ExcluirFuncaoComponent,
    canActivate: [RHGuard],
  },{
    path: "cadastro/funcionario/funcao/editar/:id",
    component: EditarFuncaoComponent,
    canActivate: [RHGuard],
  },{
    path: "cadastro/financeiro/pagamento",
    component: FormaPagamentoComponent,
    canActivate: [FinanceiroGuard],
  },{
    path: "cadastro/financeiro/pagamento/criar",
    component: CadastroFormaPagamentoComponent,
    canActivate: [FinanceiroGuard],
  },{
    path: "cadastro/financeiro/pagamento/excluir/:id",
    component: ExcluirFormaPagamentoComponent,
    canActivate: [FinanceiroGuard],
  },{
    path: "cadastro/financeiro/pagamento/editar/:id",
    component: EditarFormaPagamentoComponent,
    canActivate: [FinanceiroGuard]
  },{
    path: "cadastro/financeiro/pagamento/detalhes/:id",
    component: DetalhesFormaPagamentoComponent,
    canActivate: [FinanceiroGuard]
  },{
    path: "cadastro/financeiro/situacao",
    component: SituacaoPedidoComponent,
    canActivate: [FinanceiroGuard]
  },{
    path: "cadastro/financeiro/situacao/criar",
    component: CadastroSituacaoPedidoComponent,
    canActivate: [FinanceiroGuard]
  },{
    path: "cadastro/financeiro/situacao/excluir/:id",
    component: ExcluirSituacaoPedidoComponent,
    canActivate: [FinanceiroGuard]
  },{
    path: "cadastro/financeiro/situacao/editar/:id",
    component: EditarSituacaoPedidoComponent,
    canActivate: [FinanceiroGuard]
  },{
    path: "cadastro/financeiro/situacao/detalhes/:id",
    component: DetalhesSituacaoPedidoComponent,
    canActivate: [FinanceiroGuard]
  },{
    path: "cadastro/financeiro/situacao",
    component: SituacaoPedidoComponent,
    canActivate: [FinanceiroGuard]
  },{
    path: "cadastro/financeiro/tipo",
    component: TipoPedidoComponent,
    canActivate: [FinanceiroGuard]
  },{
    path: "cadastro/financeiro/tipo/criar",
    component: CadastroTipoPedidoComponent,
    canActivate: [FinanceiroGuard]
  },{
    path: "cadastro/financeiro/tipo/excluir/:id",
    component: ExcluirTipoPedidoComponent,
    canActivate: [FinanceiroGuard]
  },{
    path: "cadastro/financeiro/tipo/editar/:id",
    component: EditarTipoPedidoComponent,
    canActivate: [FinanceiroGuard]
  },{
    path: "cadastro/financeiro/tipo/detalhes/:id",
    component: DetalhesTipoPedidoComponent,
    canActivate: [FinanceiroGuard]
  },{
    path: "cadastro/financeiro/servico",
    component: ServicoComponent,
    canActivate: [FinanceiroGuard],
  },{
    path: "cadastro/financeiro/servico/criar",
    component: CadastroServicoComponent,
    canActivate: [FinanceiroGuard]
  },{
    path: "cadastro/financeiro/servico/excluir/:id",
    component: ExcluirServicoComponent,
    canActivate: [FinanceiroGuard]
  },{
    path: "cadastro/financeiro/servico/editar/:id",
    component: EditarServicoComponent,
    canActivate: [FinanceiroGuard]
  },{
    path: "cadastro/financeiro/servico/detalhes/:id",
    component: DetalhesServicoComponent,
    canActivate: [FinanceiroGuard]
  },{
    path: "cadastro/financeiro/servico",
    component: ServicoComponent,
    canActivate: [FinanceiroGuard]
  },{
    path: "cadastro/funcionario/nivel",
    component: NivelComponent,
    canActivate: [RHGuard]
  },{
    path: "cadastro/funcionario/nivel/criar",
    component: CadastrarNivelComponent,
    canActivate: [RHGuard]
  },{
    path: "cadastro/funcionario/nivel/excluir/:id",
    component: ExcluirNivelComponent,
    canActivate: [RHGuard]
  },{
    path: "cadastro/funcionario/nivel/editar/:id",
    component: EditarNivelComponent,
    canActivate: [RHGuard]
  },{
    path: "cadastro/funcionario/nivel/detalhes/:id",
    component: DetalhesNivelComponent,
    canActivate: [RHGuard]
  },{
    path: "cadastro/geral/situacao",
    component: SituacaoComponent,
    canActivate: [AdminGuard]
  },{
    path: "cadastro/geral/situacao/criar",
    component: CadastrarSituacaoComponent,
    canActivate: [AdminGuard]
  },{
    path: "cadastro/geral/situacao/excluir/:id",
    component: ExcluirSituacaoComponent,
    canActivate: [AdminGuard]
  },{
    path: "cadastro/geral/situacao/editar/:id",
    component: EditarSituacaoComponent,
    canActivate: [AdminGuard]
  },{
    path: "cadastro/geral/situacao/detalhes/:id",
    component: DetalhesSituacaoComponent,
    canActivate: [AdminGuard]
  },{
    path: "acesso/login",
    component: LoginComponent,
  },{
    path: "acesso/cadastrar",
    component: CadastroUsuarioComponent,
  },{
    path: "acesso/senha",
    component: EsqueceuSenhaComponent,
  },{
    path: "acesso/trocar/senha/:token",
    component: TrocaSenhaComponent,
  },{
    path: "venda/pedido",
    component: PedidoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
