import { AuthGuard } from './account/shared/authGuard';
import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';
import { HomeComponent } from './components/body/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuComponent } from './components/menu/menu.component';
import { BodyComponent } from './components/body/body.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {MatButtonModule} from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatNativeDateModule, MAT_DATE_LOCALE} from '@angular/material/core';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSelectModule} from '@angular/material/select';
import {MatDialogModule} from '@angular/material/dialog';
import { CadastrarProdutoComponent } from './components/body/cadastro/cadastroProduto/cadastrarProduto/cadastrarProduto.component';
import { DetalhesProdutoComponent } from './components/body/cadastro/cadastroProduto/detalhesProduto/detalhesProduto.component';
import { EditarProdutoComponent } from './components/body/cadastro/cadastroProduto/editarProduto/editarProduto.component';
import { ExcluirProdutoComponent } from './components/body/cadastro/cadastroProduto/excluirProduto/excluirProduto.component';
import { DialogProdutoComponent } from './components/body/cadastro/cadastroProduto/excluirProduto/dialogProduto/dialogProduto.component';
import { ProdutoComponent } from './components/body/cadastro/cadastroProduto/produto/produto.component';
import { NcmComponent } from './components/body/cadastro/cadastroProduto/produto/ncm/ncm/ncm.component';
import { MarcaComponent } from './components/body/cadastro/cadastroProduto/produto/marca/marca/marca.component';
import { GrupoComponent } from './components/body/cadastro/cadastroProduto/produto/grupo/grupo/grupo.component';
import { DetalhesGrupoComponent } from './components/body/cadastro/cadastroProduto/produto/grupo/detalhesGrupo/detalhesGrupo.component';
import { CadastrarGrupoComponent } from './components/body/cadastro/cadastroProduto/produto/grupo/cadastrarGrupo/cadastrarGrupo.component';
import { DialogGrupoComponent } from './components/body/cadastro/cadastroProduto/produto/grupo/exluir/dialogGrupo/dialogGrupo.component';
import { CadastrarNcmComponent } from './components/body/cadastro/cadastroProduto/produto/ncm/cadastrarNcm/cadastrarNcm.component';
import { EditarNcmComponent } from './components/body/cadastro/cadastroProduto/produto/ncm/editarNcm/editarNcm.component';
import { DetalhesNcmComponent } from './components/body/cadastro/cadastroProduto/produto/ncm/detalhesNcm/detalhesNcm.component';
import { ExcluirNcmComponent } from './components/body/cadastro/cadastroProduto/produto/ncm/excluirNcm/excluirNcm.component';
import { DialogNcmComponent } from './components/body/cadastro/cadastroProduto/produto/ncm/excluirNcm/dialogNcm/dialogNcm.component';
import { DetalhesMarcaComponent } from './components/body/cadastro/cadastroProduto/produto/marca/detalhesMarca/detalhesMarca.component';
import { CadastrarMarcaComponent } from './components/body/cadastro/cadastroProduto/produto/marca/cadastrarMarca/cadastrarMarca.component';
import { EditarMarcaComponent } from './components/body/cadastro/cadastroProduto/produto/marca/editarMarca/editarMarca.component';
import { ExcluirMarcaComponent } from './components/body/cadastro/cadastroProduto/produto/marca/excluir/excluirMarca.component';
import { DialogMarcaComponent } from './components/body/cadastro/cadastroProduto/produto/marca/excluir/dialogMarca/dialogMarca.component';
import { DialogUnidadeMedidaComponent } from './components/body/cadastro/cadastroProduto/produto/unidadeMedida/excluir/dialogUnidadeMedida/dialogUnidadeMedida.component';
import { DetalhesUnidadeMedidaComponent } from './components/body/cadastro/cadastroProduto/produto/unidadeMedida/detalhesUnidadeMedida/detalhesUnidadeMedida.component';
import { EditarUnidadeMedidaComponent } from './components/body/cadastro/cadastroProduto/produto/unidadeMedida/editarUnidadeMedida/editarUnidadeMedida.component';
import { CadastrarUnidadeMedidaComponent } from './components/body/cadastro/cadastroProduto/produto/unidadeMedida/cadastrarUnidadeMedida/cadastrarUnidadeMedida.component';
import { UnidadeMedidaComponent } from './components/body/cadastro/cadastroProduto/produto/unidadeMedida/unidadeMedida/unidadeMedida.component';
import { EditarGrupoComponent } from './components/body/cadastro/cadastroProduto/produto/grupo/editarGrupo/editarGrupo.component';
import { ExcluirGrupoComponent } from './components/body/cadastro/cadastroProduto/produto/grupo/exluir/excluirGrupo.component';
import { ExcluirUnidadeMedidaComponent } from './components/body/cadastro/cadastroProduto/produto/unidadeMedida/excluir/excluirUnidadeMedida.component';
import { RelatorioComponent } from './components/body/cadastro/relatorio/relatorio.component';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { PedidoComponent } from './components/body/vendas/pedido/pedido.component';
import { DevolucaoComponent } from './components/body/vendas/devolucao/devolucao.component';
import { GarantiaComponent } from './components/body/vendas/garantia/garantia.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { CadastroFormaPagamentoComponent } from './components/body/cadastro/cadastroFinanceiro/formaPagamento/cadastroFormaPagamento/cadastroFormaPagamento.component';
import { DetalhesFormaPagamentoComponent } from './components/body/cadastro/cadastroFinanceiro/formaPagamento/detalhesFormaPagamento/detalhesFormaPagamento.component';
import { EditarFormaPagamentoComponent } from './components/body/cadastro/cadastroFinanceiro/formaPagamento/editarFormaPagamento/editarFormaPagamento.component';
import { CadastroSituacaoPedidoComponent } from './components/body/cadastro/cadastroFinanceiro/situacaoPedido/cadastroSituacaoPedido/cadastroSituacaoPedido.component';
import { DetalhesSituacaoPedidoComponent } from './components/body/cadastro/cadastroFinanceiro/situacaoPedido/detalhesSituacaoPedido/detalhesSituacaoPedido.component';
import { EditarSituacaoPedidoComponent } from './components/body/cadastro/cadastroFinanceiro/situacaoPedido/editarSituacaoPedido/editarSituacaoPedido.component';
import { DialogSituacaoPedidoComponent } from './components/body/cadastro/cadastroFinanceiro/situacaoPedido/excluir/dialogSituacaoPedido/dialogSituacaoPedido.component';
import { CadastroTipoPedidoComponent } from './components/body/cadastro/cadastroFinanceiro/tipoPedido/cadastroTipoPedido/cadastroTipoPedido.component';
import { DetalhesTipoPedidoComponent } from './components/body/cadastro/cadastroFinanceiro/tipoPedido/detalhesTipoPedido/detalhesTipoPedido.component';
import { EditarTipoPedidoComponent } from './components/body/cadastro/cadastroFinanceiro/tipoPedido/editarTipoPedido/editarTipoPedido.component';
import { DialogTipoPedidoComponent } from './components/body/cadastro/cadastroFinanceiro/tipoPedido/excluir/dialogTipoPedido/dialogTipoPedido.component';
import { ExcluirSituacaoPedidoComponent } from './components/body/cadastro/cadastroFinanceiro/situacaoPedido/excluir/excluirSituacaoPedido.component';
import { ExcluirFormaPagamentoComponent } from './components/body/cadastro/cadastroFinanceiro/formaPagamento/excluir/excluirFormaPagamento.component';
import { DialogFormaPagamentoComponent } from './components/body/cadastro/cadastroFinanceiro/formaPagamento/excluir/dialogFormaPagamento/dialogFormaPagamento.component';
import { TipoPedidoComponent } from './components/body/cadastro/cadastroFinanceiro/tipoPedido/tipo/tipo.component';
import { SituacaoPedidoComponent } from './components/body/cadastro/cadastroFinanceiro/situacaoPedido/situacao/situacao.component';
import { FormaPagamentoComponent } from './components/body/cadastro/cadastroFinanceiro/formaPagamento/pagamento/pagamento.component';
import { ExcluirTipoPedidoComponent } from './components/body/cadastro/cadastroFinanceiro/tipoPedido/excluir/excluirTipoPedido.component';
import { ServicoComponent } from './components/body/cadastro/cadastroFinanceiro/servico/servico/servico.component';
import { CadastroServicoComponent } from './components/body/cadastro/cadastroFinanceiro/servico/cadastroServico/cadastroServico.component';
import { DetalhesServicoComponent } from './components/body/cadastro/cadastroFinanceiro/servico/detalhesServico/detalhesServico.component';
import { EditarServicoComponent } from './components/body/cadastro/cadastroFinanceiro/servico/editarServico/editarServico.component';
import { ExcluirServicoComponent } from './components/body/cadastro/cadastroFinanceiro/servico/excluirServico/excluirServico.component';
import { DialogServicoComponent } from './components/body/cadastro/cadastroFinanceiro/servico/excluirServico/dialogServico/dialogServico.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { SituacaoComponent } from './components/body/cadastro/geral/situacao/situacao/situacao.component';
import { CadastrarSituacaoComponent } from './components/body/cadastro/geral/situacao/cadastrarSituacao/cadastrarSituacao.component';
import { DetalhesSituacaoComponent } from './components/body/cadastro/geral/situacao/detalhesSituacao/detalhesSituacao.component';
import { EditarSituacaoComponent } from './components/body/cadastro/geral/situacao/editarSituacao/editarSituacao.component';
import { DialogSituacaoComponent } from './components/body/cadastro/geral/situacao/excluirSituacao/dialogSituacao/dialogSituacao.component';
import { UsuarioComponent } from './components/body/cadastro/cadastroUsuario/usuario/usuario.component';
import { SetorComponent } from './components/body/cadastro/funcionario/setor/setor/setor.component';
import { DetalhesSetorComponent } from './components/body/cadastro/funcionario/setor/detalhesSetor/detalhesSetor.component';
import { CadastrarSetorComponent } from './components/body/cadastro/funcionario/setor/cadastrarSetor/cadastrarSetor.component';
import { EditarSetorComponent } from './components/body/cadastro/funcionario/setor/editarSetor/editarSetor.component';
import { ExcluirSetorComponent } from './components/body/cadastro/funcionario/setor/excluirSetor/excluirSetor.component';
import { DialogSetorComponent } from './components/body/cadastro/funcionario/setor/excluirSetor/dialogSetor/dialogSetor.component';
import { CadastrarFuncaoComponent } from './components/body/cadastro/funcionario/funcao/cadastrarFuncao/cadastrarFuncao.component';
import { EditarFuncaoComponent } from './components/body/cadastro/funcionario/funcao/editarFuncao/editarFuncao.component';
import { DetalhesFuncaoComponent } from './components/body/cadastro/funcionario/funcao/detalhesFuncao/detalhesFuncao.component';
import { ExcluirFuncaoComponent } from './components/body/cadastro/funcionario/funcao/excluir/excluirFuncao.component';
import { DialogFuncaoComponent } from './components/body/cadastro/funcionario/funcao/excluir/dialogFuncao/dialogFuncao.component';
import { FuncaoComponent } from './components/body/cadastro/funcionario/funcao/funcao/funcao.component';
import { NivelComponent } from './components/body/cadastro/funcionario/nivel/nivel/nivel.component';
import { CadastrarNivelComponent } from './components/body/cadastro/funcionario/nivel/cadastrarNivel/cadastrarNivel.component';
import { DetalhesNivelComponent } from './components/body/cadastro/funcionario/nivel/detalhesNivel/detalhesNivel.component';
import { EditarNivelComponent } from './components/body/cadastro/funcionario/nivel/editarNivel/editarNivel.component';
import { ExcluirNivelComponent } from './components/body/cadastro/funcionario/nivel/excluirNivel/excluirNivel.component';
import { DialogNivelComponent } from './components/body/cadastro/funcionario/nivel/excluirNivel/dialogNivel/dialogNivel.component';
import { ExcluirSituacaoComponent } from './components/body/cadastro/geral/situacao/excluirSituacao/excluirSituacao.component';
import {MatRadioModule} from '@angular/material/radio';
import { LoginComponent } from './components/body/acesso/login/login.component';
import { CadastroUsuarioComponent } from './components/body/acesso/cadastroUsuario/cadastroUsuario.component';
import { EsqueceuSenhaComponent } from './components/body/acesso/esqueceuSenha/esqueceuSenha.component';
import { TokenHeader } from './components/interface/servicos/tokenHeader';
import { AdminGuard } from './account/shared/adminGuard';
import { ConvidadoGuard } from './account/shared/convidadoGuards';
import { UserGuard } from './account/shared/userGuards';
import * as CryptoJS from 'crypto-js';
import { RHGuard } from './account/shared/rhGuard';
import { EstoqueGuard } from './account/shared/estoqueGuard';
import { FinanceiroGuard } from './account/shared/financeiroGuard';
import { CadastrarUsuarioComponent } from './components/body/cadastro/cadastroUsuario/usuario/cadastrarUsuario/cadastrarUsuario.component';
import { DetalhesUsuarioComponent } from './components/body/cadastro/cadastroUsuario/usuario/detalhesUsuario/detalhesUsuario.component';
import { CadastrarLoginComponent } from './components/body/cadastro/cadastroUsuario/login/cadastrarLogin/cadastrarLogin.component';
import { DetalhesLoginComponent } from './components/body/cadastro/cadastroUsuario/login/detalhesLogin/detalhesLogin.component';
import { EditarUsuarioComponent } from './components/body/cadastro/cadastroUsuario/usuario/editarUsuario/editarUsuario.component';
import { ExcluirUsuarioComponent } from './components/body/cadastro/cadastroUsuario/usuario/excluir-usuario/excluirUsuario.component';
import { DialogUsuarioComponent } from './components/body/cadastro/cadastroUsuario/usuario/excluir-usuario/dialogExcluir/dialogUsuario.component';
import { EditarLoginComponent } from './components/body/cadastro/cadastroUsuario/login/editarLogin/editarLogin.component';
import { ExcluirLoginComponent } from './components/body/cadastro/cadastroUsuario/login/excluirLogin/excluirLogin.component';
import { DialogExcluirComponent } from './components/body/cadastro/cadastroUsuario/login/excluirLogin/dialogLogin/dialogExcluir.component';
import { LoginCadastroComponent } from './components/body/cadastro/cadastroUsuario/login/loginCadastro.component';
import { TrocaSenhaComponent } from './components/body/acesso/trocaSenha/trocaSenha.component';




registerLocaleData(ptBr);

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "left",
  allowNegative: true,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: "."
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    MenuComponent,
    BodyComponent,
    ProdutoComponent,
    CadastrarProdutoComponent,
    DetalhesProdutoComponent,
    EditarProdutoComponent,
    ExcluirProdutoComponent,
    DialogProdutoComponent,
    NcmComponent,
    MarcaComponent,
    GrupoComponent,
    DetalhesGrupoComponent,
    CadastrarGrupoComponent,
    EditarGrupoComponent,
    ExcluirMarcaComponent,
    DialogGrupoComponent,
    CadastrarNcmComponent,
    EditarNcmComponent,
    DetalhesNcmComponent,
    ExcluirNcmComponent,
    DialogNcmComponent,
    DetalhesMarcaComponent,
    CadastrarMarcaComponent,
    EditarMarcaComponent,
    ExcluirUnidadeMedidaComponent,
    DialogMarcaComponent,
    DialogUnidadeMedidaComponent,
    DetalhesUnidadeMedidaComponent,
    EditarUnidadeMedidaComponent,
    CadastrarUnidadeMedidaComponent,
    UnidadeMedidaComponent,
    ExcluirGrupoComponent,
    RelatorioComponent,
    SetorComponent,
    DetalhesSetorComponent,
    CadastrarSetorComponent,
    EditarSetorComponent,
    ExcluirSetorComponent,
    DialogSetorComponent,
    CadastrarFuncaoComponent,
    EditarFuncaoComponent,
    DetalhesFuncaoComponent,
    ExcluirFuncaoComponent,
    DialogFuncaoComponent,
    FuncaoComponent,
    PedidoComponent,
    DevolucaoComponent,
    GarantiaComponent,
    TipoPedidoComponent,
    CadastroFormaPagamentoComponent,
    DetalhesFormaPagamentoComponent,
    EditarFormaPagamentoComponent,
    CadastroSituacaoPedidoComponent,
    DetalhesSituacaoPedidoComponent,
    EditarSituacaoPedidoComponent,
    DialogSituacaoPedidoComponent,
    CadastroTipoPedidoComponent,
    DetalhesTipoPedidoComponent,
    EditarTipoPedidoComponent,
    DialogTipoPedidoComponent,
    FormaPagamentoComponent,
    SituacaoPedidoComponent,
    ExcluirFormaPagamentoComponent,
    ExcluirSituacaoPedidoComponent,
    TipoPedidoComponent,
    ExcluirTipoPedidoComponent,
    DialogFormaPagamentoComponent,
    ServicoComponent,
    CadastroServicoComponent,
    DetalhesServicoComponent,
    EditarServicoComponent,
    ExcluirServicoComponent,
    DialogServicoComponent,
    SituacaoComponent,
    CadastrarSituacaoComponent,
    DetalhesSituacaoComponent,
    EditarSituacaoComponent,
    ExcluirSituacaoComponent,
    DialogSituacaoComponent,
    NivelComponent,
    CadastrarNivelComponent,
    DetalhesNivelComponent,
    EditarNivelComponent,
    ExcluirNivelComponent,
    DialogNivelComponent,
    UsuarioComponent,
    CadastrarUsuarioComponent,
    DetalhesUsuarioComponent,
    EditarUsuarioComponent,
    ExcluirUsuarioComponent,
    DialogUsuarioComponent,
    LoginComponent,
    CadastroUsuarioComponent,
    EsqueceuSenhaComponent,
    CadastrarLoginComponent,
    DetalhesLoginComponent,
    EditarLoginComponent,
    ExcluirLoginComponent,
    DialogExcluirComponent,
    LoginCadastroComponent,
    TrocaSenhaComponent
    
 ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatCardModule,
    MatSnackBarModule,
    HttpClientModule,
    MatButtonModule,
    MatFormFieldModule,
    MatNativeDateModule,
    BrowserModule,
    NgxMaskModule.forRoot(),
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatTableModule,
    FormsModule, 
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatSelectModule,
    MatDialogModule,
    CurrencyMaskModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatRadioModule

  ],
  providers: [
      {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
      { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
      { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig  },
      { provide: LOCALE_ID, useValue: 'pt' },
      { provide: 'CryptoJS', useValue: CryptoJS },
      AdminGuard,
      ConvidadoGuard,
      UserGuard,
      AuthGuard,
      RHGuard,
      EstoqueGuard,
      FinanceiroGuard,
      {
        provide: HTTP_INTERCEPTORS,
        useClass: TokenHeader,
        multi: true
      }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


