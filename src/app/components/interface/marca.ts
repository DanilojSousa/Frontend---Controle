import { Usuario } from "./usuario";

export class Marca{

    id?: number
    nome?: string
    usuario: Usuario
    delete: Boolean

    constructor(){
        this.usuario = new Usuario();
        this.delete = false;
    }
}