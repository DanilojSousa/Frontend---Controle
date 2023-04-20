import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, delay, EMPTY, first, map, Observable } from 'rxjs';
import { Pedido } from '../interface/pedido';
import { AppConstants } from '../interface/servicos/urlConstants';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private msg: MatSnackBar, private http: HttpClient) { }
  
  cadastrarPedido(pedido: Pedido): Observable<Pedido> {
    return this.http.post<Pedido>(AppConstants.urlPedido + "/salvar", pedido).pipe(
      map((obj: any) => obj),
      catchError((e) => this.error(e)),
    );
  }

  excluirPedido(id: string){
    const url = AppConstants.urlPedido + "/delete/" + id;
    return this.http.delete(url).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  selecionarTodos(): Observable<Pedido[]>{
    return this.http.get<Pedido[]>(AppConstants.urlPedido + "/getAll").pipe(
      first(),
      delay(500),
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  selecionarAtivos(): Observable<Pedido[]>{
    return this.http.get<Pedido[]>(AppConstants.urlPedido + "/ativos").pipe(
      first(),
      delay(500),
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }
  
  selecionarPorId(id: string): Observable<Pedido>{
    return this.http.get<Pedido>(AppConstants.urlPedido + "/getById/?id=" + id).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  possueTipoPedido(id: string): Observable<Boolean>{
    return this.http.get<Boolean>(AppConstants.urlPedido + "/tipoPedido/" + id).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e))
    );
  }

  possueFormaPagamento(id: string): Observable<Boolean>{
    return this.http.get<Boolean>(AppConstants.urlPedido + "/formaPagamento/" + id).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e))
    );
  }

  possueSituacao(id: string): Observable<Boolean>{
    return this.http.get<Boolean>(AppConstants.urlPedido + "/situacao/" + id).pipe(
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
