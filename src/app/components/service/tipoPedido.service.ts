import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, delay, EMPTY, first, map, Observable } from 'rxjs';
import { TipoPedido } from '../interface/tipoPedido';
import { AppConstants } from '../interface/servicos/urlConstants';

@Injectable({
  providedIn: 'root'
})
export class TipoPedidoService {

  constructor(private msg: MatSnackBar, private http: HttpClient) { }

  cadastrarTipoPedido(tipoPedido: TipoPedido): Observable<TipoPedido> {
    return this.http.post<TipoPedido>(AppConstants.urlTipoPedido + "/salvar", tipoPedido).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  excluirTipoPedido(id: string){
    const url = AppConstants.urlTipoPedido + "/delete/" + id;
    return this.http.delete(url).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  selecionarTodos(): Observable<TipoPedido[]>{
    return this.http.get<TipoPedido[]>(AppConstants.urlTipoPedido + "/getAll").pipe(
      first(),
      delay(500),
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }
  
  selecionarPorId(id: string): Observable<TipoPedido>{
    return this.http.get<TipoPedido>(AppConstants.urlTipoPedido + "/getById/?id=" + id).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  possueServico(id: string): Observable<Boolean>{
    return this.http.get<Boolean>(AppConstants.urlTipoPedido + "/servico/" + id).pipe(
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
