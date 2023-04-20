import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, delay, EMPTY, first, map, Observable } from 'rxjs';
import { PedidoProduto } from '../interface/pedidoProduto';
import { AppConstants } from '../interface/servicos/urlConstants';

@Injectable({
  providedIn: 'root'
})
export class PedidoProdutoService {

  constructor(private msg: MatSnackBar, private http: HttpClient) { }
  
  cadastrarPedidoProduto(pedidoProduto: PedidoProduto): Observable<PedidoProduto> {
    return this.http.post<PedidoProduto>(AppConstants.urlPedidoProduto + "/salvar", pedidoProduto).pipe(
      map((obj: any) => obj),
      catchError((e) => this.error(e)),
    );
  }

  excluirPedidoProduto(id: string){
    const url = AppConstants.urlPedidoProduto + "/delete/" + id;
    return this.http.delete(url).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  selecionarTodos(): Observable<PedidoProduto[]>{
    return this.http.get<PedidoProduto[]>(AppConstants.urlPedidoProduto + "/getAll").pipe(
      first(),
      delay(500),
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  selecionarAtivos(): Observable<PedidoProduto[]>{
    return this.http.get<PedidoProduto[]>(AppConstants.urlPedidoProduto + "/ativos").pipe(
      first(),
      delay(500),
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }
  
  
  selecionarPorId(id: string): Observable<PedidoProduto>{
    return this.http.get<PedidoProduto>(AppConstants.urlPedidoProduto + "/getById/?id=" + id).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
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
