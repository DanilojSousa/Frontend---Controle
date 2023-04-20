import { LoginService } from './login.service';
import { Usuario } from './../interface/usuario';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, delay, EMPTY, first, map, Observable } from 'rxjs';
import { Page } from '../interface/pesquisaFiltrada/page';
import { AppConstants } from '../interface/servicos/urlConstants';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private msg: MatSnackBar, 
    private http: HttpClient,
    private login: LoginService) { }

  cadastrar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(AppConstants.urlUsuario + "/salvar", usuario).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  excluir(id: string){
    const url = AppConstants.urlUsuario + "/delete/" + id;
    return this.http.delete(url).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  selecionarTodos(): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(AppConstants.urlUsuario + "/getAll").pipe(
      first(),
      delay(500),
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  selecionarAtivos(pagina:number, limites:number): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(AppConstants.urlUsuario + "/ativos/"+pagina+"/"+limites).pipe(
      first(),
      delay(500),
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }
  
  selecionarPorId(id: string): Observable<Usuario>{
    return this.http.get<Usuario>(AppConstants.urlUsuario + "/getById/?id=" + id).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  pesquisaTodos(nome: string): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(AppConstants.urlUsuario + "/pesquisa/todos/" + nome).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    )
  }

  pesquisaFornecedor(nome: string): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(AppConstants.urlUsuario + "/pesquisa/fornecedor/" + nome).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    )
  }

  pesquisaCliente(nome: string): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(AppConstants.urlUsuario + "/pesquisa/cliente/" + nome).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    )
  }

  pesquisaFuncionario(nome: string): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(AppConstants.urlUsuario + "/pesquisa/funcionario/" + nome).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    )
  }

  possueSituacao(id: string): Observable<Boolean>{
    return this.http.get<Boolean>(AppConstants.urlUsuario + "/situacao/" + id).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e))
    );
  }

  possueNivelAcesso(id: string): Observable<Boolean>{
    return this.http.get<Boolean>(AppConstants.urlUsuario + "/nivelAcesso/" + id).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e))
    );
  }

  possueLogin(id: string):Observable<Boolean>{
    return this.http.get<Boolean>(AppConstants.urlUsuario + "/login/" + id).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e))
    );
  }

  possueFuncionarioSetor(id: string):Observable<Boolean>{
    return this.http.get<Boolean>(AppConstants.urlUsuario + "/setor/" + id).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e))
    );
  }

  fornecedores(nome: string): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(AppConstants.urlUsuario + "/lista/fornecedores/" + nome).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    )
  }

  clientes(nome: string): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(AppConstants.urlUsuario + "/lista/clientes/" + nome).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    )
  }

  funcionarios(nome: string): Observable<Usuario[]>{
    return this.http.get<Usuario[]>(AppConstants.urlUsuario + "/lista/funcionarios/" + nome).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    )
  }

  pesquisaPorPaginacao(pagina: number , size: number): Observable<Page<Usuario>>{
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('size', size.toString());
    return this.http.get<Page<Usuario>>(AppConstants.urlUsuario + "/getAllAtivos/", {params}).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    )
  }

  validarPossueEmail(email:String): Observable<boolean>{
    let params = new HttpParams();
    params = params.append('email', email.toString());
    return this.http.get<boolean>(AppConstants.urlUsuario + "/validar/email", {params}).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    )
  }

  validarPossueCpf(cpf:String): Observable<boolean>{
    let params = new HttpParams();
    params = params.append('cpf', cpf.toString());
    return this.http.get<boolean>(AppConstants.urlUsuario + "/validar/cpf", {params}).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    )
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
