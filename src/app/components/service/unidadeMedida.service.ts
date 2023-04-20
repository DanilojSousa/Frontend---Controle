import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, delay, EMPTY, first, map, Observable } from 'rxjs';
import { UnidadeMedida } from '../interface/unidadeMedida';
import { AppConstants } from '../interface/servicos/urlConstants';

@Injectable({
  providedIn: 'root'
})
export class UnidadeMedidaService {
  constructor(private msg: MatSnackBar, private http: HttpClient) { }
  
  cadastrarUnidadeMedida(unidadeMedida: UnidadeMedida): Observable<UnidadeMedida> {
    return this.http.post<UnidadeMedida>(AppConstants.urlUnidadeMedida + "/salvar", unidadeMedida).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  excluirUnidadeMedida(id: string){
    const url = AppConstants.urlUnidadeMedida + "/delete/" + id;
    return this.http.delete(url).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  selecionarTodos(): Observable<UnidadeMedida[]>{
    return this.http.get<UnidadeMedida[]>(AppConstants.urlUnidadeMedida + "/getAll").pipe(
      first(),
      delay(500),
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }
  
  selecionarPorId(id: string): Observable<UnidadeMedida>{
    return this.http.get<UnidadeMedida>(AppConstants.urlUnidadeMedida + "/getById/?id=" + id).pipe(
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
