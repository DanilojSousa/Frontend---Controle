import { UnidadeMedida } from './unidadeMedida';
import { Marca } from './marca';
import { Ncm } from './ncm';
import { Situacao } from './situacao';
export class Produto{

    id?: number
    nome?: string
    ean?: string
    ncm: Ncm
    altura?: number
    comprimento?: number
    largura?: number
    qtdUnidade?: number
    qtdEmbalagem?: number
    unidadeMedida: UnidadeMedida
    modelo?: string
    partNumber?: string
    garantia?: number
    marca: Marca
    situacao: Situacao
    delete: Boolean

    constructor( ){
        this.unidadeMedida = new UnidadeMedida();
        this.marca = new Marca();
        this.situacao = new Situacao();
        this.ncm = new Ncm();
        this.delete = false;
    }
}
