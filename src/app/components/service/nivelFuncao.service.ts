import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, EMPTY, map, Observable } from 'rxjs';
import { NivelFuncao } from '../interface/NivelFuncao';
import { AppConstants } from '../interface/servicos/urlConstants';

@Injectable({
  providedIn: 'root'
})
export class NivelFuncaoService {
  
  constructor(private msg: MatSnackBar, private http: HttpClient) { }

  cadastrarNivelFuncao(nivelFuncao: NivelFuncao): Observable<NivelFuncao> {
    return this.http.post<NivelFuncao>(AppConstants.urlNivelFuncao + "/salvar", nivelFuncao).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  excluirNivelFuncao(id: string){
    const url = AppConstants.urlNivelFuncao + "/delete/" + id;
    return this.http.delete(url).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }
  
  selecionarTodos(): Observable<NivelFuncao[]>{
    return this.http.get<NivelFuncao[]>(AppConstants.urlNivelFuncao + "/getAll").pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }
  selecionarPorId(id: string): Observable<NivelFuncao>{
    return this.http.get<NivelFuncao>(AppConstants.urlNivelFuncao + "/getById/?id=" + id).pipe(
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
