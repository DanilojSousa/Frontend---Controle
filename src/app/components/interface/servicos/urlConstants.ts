export class AppConstants{

    public static servidor: string = "http://localhost:8080/";
    public static login: string = this.servidor + "api/";
    public static urlUsuario: string =  this.login + "usuario";
    public static urlLogin: string =  this.login + "login";
    public static urlUnidadeMedida: string =  this.login + "unidade";
    public static urlTipoPedido: string =  this.login + "tipo/pedido";
    public static urlSituacaoPedido: string =  this.login + "situacao/pedido";
    public static urlSituacao: string =  this.login + "situacao";
    public static urlSetor: string =  this.login + "setor";
    public static urlServico: string =  this.login + "servico";
    public static urlRole: string =  this.login + "role";
    public static urlProduto: string =  this.login + "produto";
    public static urlPedidoProduto: string =  this.login + "pedido/produto";
    public static urlPedido: string =  this.login + "pedido";
    public static urlNivelFuncao: string =  this.login + "nivel/funcao";
    public static urlNcm: string =  this.login + "ncm";
    public static urlMarca: string =  this.login + "marca";
    public static urlGrupoProduto: string =  this.login + "grupo/produto";
    public static urlFuncionarioSetor: string =  this.login + "funcionario/setor";
    public static urlFormaPagamento: string =  this.login + "forma/pagamento";
    public static urlEmail: string =  this.login + "email";

}