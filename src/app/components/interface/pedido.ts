import { SituacaoPedido } from 'src/app/components/interface/situacaoPedido';
import { FormaPagamento } from './formaPagamento';
import { TipoPedido } from './tipoPedido';
export class Pedido{

    id?: number
    tipoPedido?: TipoPedido
    dadosAdicionais?: string
    valorTotal?: number
    formaPagamento?: FormaPagamento
    emissao?: Date
    situacaoPedido?: SituacaoPedido
    delete: Boolean;

    constructor(){
        this.tipoPedido = new TipoPedido();
        this.formaPagamento = new FormaPagamento();
        this.situacaoPedido = new SituacaoPedido();
        this.emissao = new Date();
        this.delete = false;
    }
}

