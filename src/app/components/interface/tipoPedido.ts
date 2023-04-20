import { Servico } from './servico';
export class TipoPedido{

    id?: number
    nome?: string
    destacaImpostos: boolean
    geraEstoque: boolean
    geraDuplicata: boolean
    servico: Servico

    constructor(){
        this.servico = new Servico();
        this.destacaImpostos = false;
        this.geraEstoque = false;
        this.geraDuplicata = false;
    }
}