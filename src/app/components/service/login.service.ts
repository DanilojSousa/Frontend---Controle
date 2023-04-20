import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, delay, EMPTY, first, map, Observable } from 'rxjs';
import { Login } from '../interface/login';
import { RespostaToken } from '../interface/token';
import { Router } from '@angular/router';
import { AppConstants } from '../interface/servicos/urlConstants';
import { Page } from '../interface/pesquisaFiltrada/page';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private msg: MatSnackBar, 
    private http: HttpClient,
    private route: Router) {}
  
  cadastrarLogin(login: Login): Observable<Login> {
    return this.http.post<Login>(AppConstants.urlLogin + "/salvar", login).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  excluirLogin(id: string){
    const url = AppConstants.urlLogin + "/delete/" + id;
    return this.http.delete(url).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  selecionarTodos(): Observable<Login[]>{
    return this.http.get<Login[]>(AppConstants.urlLogin + "/getAll").pipe(
      first(),
      delay(500),
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  selecionarAtivos(): Observable<Login[]>{
    return this.http.get<Login[]>(AppConstants.urlLogin + "/ativos").pipe(
      first(),
      delay(500),
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }
  
  selecionarPorId(id: string): Observable<Login>{
    return this.http.get<Login>(AppConstants.urlLogin + "/getById/?id=" + id).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  pesquisaLogin(nome: string): Observable<Login[]>{
    return this.http.get<Login[]>(AppConstants.urlLogin + "/pesquisa/login/" + nome).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    )
  }
  pesquisaPorEmail(email:string):Observable<Login>{
    return this.http.get<Login>(AppConstants.urlLogin + "/email" + email).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    )
  }

  entrar(login: Login){
    return this.http.post(AppConstants.urlLogin, JSON.stringify(login)).subscribe(
      res =>{
        var tokenParametro = this.deserialize(JSON.parse(JSON.stringify(res))).authorization?.substring(7);
        this.setToken(tokenParametro);
        this.message("Login efetuado com sucesso")
        this.route.navigate(['inicio'])
      },
      error => {
        this.message("Favor validar seu e-mail ou sua senha", true);
      }
    )
  }

  public deserialize(json: any): RespostaToken {
    return new RespostaToken(json.data, json.tempo, json.mensagem, json.authorization, json.situacao, json.role);
  }

  setToken(token: any): void{
    localStorage.setItem('XAuthorization', token);
  }

  getToken(): void{
    localStorage.getItem('XAuthorization');
  }
  logado(): boolean{
    if(localStorage.getItem('XAuthorization') != ""
    && localStorage.getItem('XAuthorization') != null){
      return true
    };
    return false
  }

  sair(): void{
    localStorage.removeItem('XAuthorization');
    this.message("Deslogado com sucesso")
  }

  pesquisaPorPaginacao(pagina: number , size: number): Observable<Page<Login>>{
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('size', size.toString());
    return this.http.get<Page<Login>>(AppConstants.urlLogin + "/getAllAtivos/", {params}).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    )
  }

  validarSenhaComBanco(senha:string, senhaNova:string): Observable<boolean>{
    let params = new HttpParams();
    params = params.append('senha', senha.toString());
    params = params.append('senhaNova', senhaNova.toString());
    return this.http.get<boolean>(AppConstants.urlLogin + "/validar/possui/senha/", {params});

  }
  message(valor: string, isError: Boolean = false):void{
      this.msg.open(valor, "X",{
        duration: 3000,
        horizontalPosition: "center",
        verticalPosition: "top",
        panelClass: isError ? ['msg-error'] : ['msg-sucess']
      })
  }

  error(e: any): Observable<any>{
    this.message("Ocorreu um erro!", true)
    return EMPTY;
  }
}
