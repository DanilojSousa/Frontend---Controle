import { Usuario } from './usuario';
export class Login{

    id?: number
    usuario: Usuario
    apelido?: String
    password?: string
    delete: Boolean
    
    constructor(){
        this.usuario = new Usuario();
        this.delete = false;
    }
}