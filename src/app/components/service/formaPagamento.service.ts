import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, delay, EMPTY, first, map, Observable } from 'rxjs';
import { FormaPagamento } from '../interface/formaPagamento';
import { AppConstants } from '../interface/servicos/urlConstants';

@Injectable({
  providedIn: 'root'
})
export class FormaPagamentoService {

  constructor(private msg: MatSnackBar, private http: HttpClient) { }

  baseUrl = "/formaPagamento/";
  
  cadastrarFormaPagamento(formaPagamento: FormaPagamento): Observable<FormaPagamento> {
    return this.http.post<FormaPagamento>(AppConstants.urlFormaPagamento + "/salvar", formaPagamento).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  excluirFormaPagamento(id: string){
    const url = AppConstants.urlFormaPagamento + "/delete/" + id;
    return this.http.delete(url).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  selecionarTodos(): Observable<FormaPagamento[]>{
    return this.http.get<FormaPagamento[]>(AppConstants.urlFormaPagamento + "/getAll").pipe(
      first(),
      delay(500),
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }
  
  selecionarPorId(id: string): Observable<FormaPagamento>{
    return this.http.get<FormaPagamento>(AppConstants.urlFormaPagamento + "/getById/?id=" + id).pipe(
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
