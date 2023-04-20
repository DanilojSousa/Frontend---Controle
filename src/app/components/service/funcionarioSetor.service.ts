import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, delay, EMPTY, first, map, Observable } from 'rxjs';
import { FuncionarioSetor } from '../interface/funcionarioSetor';
import { Page } from '../interface/pesquisaFiltrada/page';
import { AppConstants } from '../interface/servicos/urlConstants';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioSetorService {

  constructor(private msg: MatSnackBar, private http: HttpClient) { }
 
  cadastrarFuncionarioSetor(funcionarioSetor: FuncionarioSetor): Observable<FuncionarioSetor> {
    return this.http.post<FuncionarioSetor>(AppConstants.urlFuncionarioSetor + "/salvar", funcionarioSetor).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  excluirFuncionarioSetor(id: string){
    const url = AppConstants.urlFuncionarioSetor + "/delete/" + id;
    return this.http.delete(url).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  selecionarTodos(): Observable<FuncionarioSetor[]>{
    return this.http.get<FuncionarioSetor[]>(AppConstants.urlFuncionarioSetor + "/getAll").pipe(
      first(),
      delay(500),
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  selecionarAtivos(): Observable<FuncionarioSetor[]>{
    return this.http.get<FuncionarioSetor[]>(AppConstants.urlFuncionarioSetor + "/ativos").pipe(
      first(),
      delay(500),
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }
  
  selecionarPorId(id: string): Observable<FuncionarioSetor>{
    return this.http.get<FuncionarioSetor>(AppConstants.urlFuncionarioSetor + "/getById/?id=" + id).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  possueSetor(id: string): Observable<Boolean>{
    return this.http.get<Boolean>(AppConstants.urlFuncionarioSetor + "/funcao/" + id).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  possueFuncionario(id: string): Observable<Boolean>{
    return this.http.get<Boolean>(AppConstants.urlFuncionarioSetor + "/empregado/" + id).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  possueFuncao(id: string): Observable<Boolean>{
    return this.http.get<Boolean>(AppConstants.urlFuncionarioSetor + "/funcao/" + id).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e))
    );
  }

  possueNivel(id: string): Observable<Boolean>{
    return this.http.get<Boolean>(AppConstants.urlFuncionarioSetor + "/nivel/" + id).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e))
    );
  }

  pesquisaPorPaginacao(pagina: number , size: number): Observable<Page<FuncionarioSetor>>{
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('size', size.toString());

    return this.http.get<Page<FuncionarioSetor>>(AppConstants.urlFuncionarioSetor + "/getAllAtivos/", {params}).pipe(
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
