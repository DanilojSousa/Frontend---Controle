import { catchError, delay, EMPTY, first, map, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Situacao } from '../interface/situacao';
import { AppConstants } from '../interface/servicos/urlConstants';

@Injectable({
  providedIn: 'root'
})
export class SituacaoService {

  constructor(private msg: MatSnackBar, private http: HttpClient) { }
 
  cadastrarSituacao(situacao: Situacao): Observable<Situacao> {
    return this.http.post<Situacao>(AppConstants.urlSituacao + "/salvar", situacao).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  excluirSituacao(id: string){
    const url = AppConstants.urlSituacao + "/delete/" + id;
    return this.http.delete(url).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  selecionarTodos(): Observable<Situacao[]>{
    return this.http.get<Situacao[]>(AppConstants.urlSituacao + "/getAll").pipe(
      first(),
      delay(500),
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }
  
  selecionarPorId(id: string): Observable<Situacao>{
    return this.http.get<Situacao>(AppConstants.urlSituacao + "/getById/?id=" + id).pipe(
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
