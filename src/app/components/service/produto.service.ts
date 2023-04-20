import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, delay, EMPTY, first, map, Observable } from 'rxjs';
import { Page } from '../interface/pesquisaFiltrada/page';
import { Produto } from '../interface/produto';
import { AppConstants } from '../interface/servicos/urlConstants';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private msg: MatSnackBar, private http: HttpClient) { }

  cadastrarProduto(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(AppConstants.urlProduto + "/salvar", produto).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  excluirProduto(id: string){
    const url = AppConstants.urlProduto + "/delete/" + id;
    return this.http.delete(url).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  selecionarTodos(): Observable<Produto[]>{
    return this.http.get<Produto[]>(AppConstants.urlProduto + "/getAll").pipe(
      first(),
      delay(500),
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  selecionarAtivos(): Observable<Produto[]>{
    return this.http.get<Produto[]>(AppConstants.urlProduto + "/ativos").pipe(
      first(),
      delay(500),
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  pesquisa(nome: string): Observable<Produto[]>{
    return this.http.get<Produto[]>(AppConstants.urlProduto + "/pesquisa/" + nome).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    )
  }
  
  selecionarPorId(id: string): Observable<Produto>{
    return this.http.get<Produto>(AppConstants.urlProduto + "/getById/?id=" + id).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  possueGrupo(id: string): Observable<Boolean>{
    return this.http.get<Boolean>(AppConstants.urlProduto + "/grupo/" + id).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  possueMarca(id: string): Observable<Boolean>{
    return this.http.get<Boolean>(AppConstants.urlProduto + "/marca/" + id).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  possueNcm(id: string): Observable<Boolean>{
    return this.http.get<Boolean>(AppConstants.urlProduto + "/ncm/" + id).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  possueMedida(id: string): Observable<Boolean>{
    return this.http.get<Boolean>(AppConstants.urlProduto + "/medida/" + id).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  possueSituacao(id: string): Observable<Boolean>{
    return this.http.get<Boolean>(AppConstants.urlProduto + "/situacao/" + id).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  pesquisaPorPaginacao(pagina: number , size: number): Observable<Page<Produto>>{
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('size', size.toString());

    return this.http.get<Page<Produto>>(AppConstants.urlProduto + "/getAllAtivos/", {params}).pipe(
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
