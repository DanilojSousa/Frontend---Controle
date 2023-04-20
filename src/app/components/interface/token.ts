export class RespostaToken{

    data?: String
	tempo?: String
	mensagem?: String
	authorization?: String
    role?: String
	situacao?: String

    constructor(data:String, tempo:String, mensagem:String, authorization:String, situacao:String, role:String){
       this.data = data;
       this.tempo = tempo;
       this.mensagem = mensagem;
       this.authorization = authorization;
       this.situacao = situacao; 
       this.role = role;
    }
}