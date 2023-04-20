import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, delay, EMPTY, first, map, Observable } from 'rxjs';
import { GrupoProduto } from '../interface/grupoProduto';
import { AppConstants } from '../interface/servicos/urlConstants';

@Injectable({
  providedIn: 'root'
})
export class GrupoProdutoService {

  constructor(private msg: MatSnackBar, private http: HttpClient) { }
  
  cadastrarGrupoProduto(grupoProduto: GrupoProduto): Observable<GrupoProduto> {
    return this.http.post<GrupoProduto>(AppConstants.urlGrupoProduto + "/salvar", grupoProduto).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  excluirGrupoProduto(id: string){
    const url = AppConstants.urlGrupoProduto + "/delete/" + id;
    return this.http.delete(url).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  selecionarTodos(): Observable<GrupoProduto[]>{
    return this.http.get<GrupoProduto[]>(AppConstants.urlGrupoProduto + "/getAll").pipe(
      first(),
      delay(500),
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  selecionarAtivos(): Observable<GrupoProduto[]>{
    return this.http.get<GrupoProduto[]>(AppConstants.urlGrupoProduto + "/ativos").pipe(
      first(),
      delay(500),
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }
  
  selecionarPorId(id: string): Observable<GrupoProduto>{
    return this.http.get<GrupoProduto>(AppConstants.urlGrupoProduto + "/getById/?id=" + id).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  possueProduto(id: string): Observable<Boolean>{
    return this.http.get<Boolean>(AppConstants.urlGrupoProduto + "/produto/" + id).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e))
    );
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
