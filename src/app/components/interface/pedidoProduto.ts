import { Produto } from './produto';
import { Pedido } from './pedido';
export class PedidoProduto{

    id?: number
    pedido: Pedido
    produto: Produto
    valorUnitario?: number
    valorTotal?: number
    desconto?: number
    qtd?: number
    delete: Boolean

    constructor(){
        this.pedido = new Pedido();
        this.produto = new Produto();
        this.delete = false;
    }
}