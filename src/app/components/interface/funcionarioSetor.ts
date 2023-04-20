import { NivelFuncao } from './NivelFuncao';
import { Setor } from './setor';
import { Usuario } from './usuario';
export class FuncionarioSetor{

    id?: number
    setor: Setor
    usuario: Usuario
    salario: number
    data: Date
    nivelFuncao: NivelFuncao
    delete: Boolean

    constructor(){
        this.usuario = new Usuario();
        this.setor = new Setor();
        this.data = new Date();
        this.salario = 0.0;
        this.nivelFuncao = new NivelFuncao();
        this.delete = false;
    }
}