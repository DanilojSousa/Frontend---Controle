import { Produto } from 'src/app/components/interface/produto';
export class GrupoProduto{

    id?: number
    nome?: string
    produto: Produto
    delete: Boolean

    constructor(){
        this.produto = new Produto();
        this.delete = false;
    }

}