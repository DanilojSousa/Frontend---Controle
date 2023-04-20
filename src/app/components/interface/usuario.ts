import { Role } from "./role";
import { Situacao } from "./situacao";

export class Usuario{ 

    id?: number
    cpf?: string
    cnpj?: string
    ie?: string
    nascimento?: Date
    nome?: string
    email?: string
    cep?: string
    endereco?: string
    numero?: string
    bairro?: string
    cidade?: string
    uf?: string
    dataRegistro: Date
    fone?: string
    situacao: Situacao
    fornecedor: Boolean
    cliente: Boolean
    funcionario: Boolean
    delete: Boolean
    role: Role

    constructor(){
        this.situacao = new Situacao();
        this.dataRegistro = new Date();
        this.fornecedor = false;
        this.cliente = false;
        this.funcionario = false;
        this.delete = false;
        this.role = new Role();
    }
}