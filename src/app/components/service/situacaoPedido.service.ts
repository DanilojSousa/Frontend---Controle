import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, delay, EMPTY, first, map, Observable } from 'rxjs';
import { SituacaoPedido } from '../interface/situacaoPedido';
import { AppConstants } from '../interface/servicos/urlConstants';

@Injectable({
  providedIn: 'root'
})
export class SituacaoPedidoService {

  constructor(private msg: MatSnackBar, private http: HttpClient) { }
  
  cadastrarSituacaoPedido(situacaoPedido: SituacaoPedido): Observable<SituacaoPedido> {
    return this.http.post<SituacaoPedido>(AppConstants.urlSituacaoPedido + "/salvar", situacaoPedido).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  excluirSituacaoPedido(id: string){
    const url = AppConstants.urlSituacaoPedido + "/delete/" + id;
    return this.http.delete(url).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  selecionarTodos(): Observable<SituacaoPedido[]>{
    return this.http.get<SituacaoPedido[]>(AppConstants.urlSituacaoPedido + "/getAll").pipe(
      first(),
      delay(500),
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }
  
  selecionarPorId(id: string): Observable<SituacaoPedido>{
    return this.http.get<SituacaoPedido>(AppConstants.urlSituacaoPedido + "/getById/?id=" + id).pipe(
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
