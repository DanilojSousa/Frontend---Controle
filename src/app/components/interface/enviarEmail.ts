export class EnviarEmail{

    id?: number
    destinatario?: String
    assunto?: String
    conteudo?: String
    enviado?: Boolean
    
    constructor(){
        this.enviado = false;
    }
}