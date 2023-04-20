import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, delay, EMPTY, first, map, Observable } from 'rxjs';
import { Marca } from '../interface/marca';
import { AppConstants } from '../interface/servicos/urlConstants';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  constructor(private msg: MatSnackBar, private http: HttpClient) { }
  
  cadastrarMarca(marca: Marca): Observable<Marca> {
    return this.http.post<Marca>(AppConstants.urlMarca + "/salvar", marca).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  excluirMarca(id: string){
    const url = AppConstants.urlMarca + "/delete/" + id;
    return this.http.delete(url).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  selecionarTodos(): Observable<Marca[]>{
    return this.http.get<Marca[]>(AppConstants.urlMarca + "/getAll").pipe(
      first(),
      delay(500),
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  selecionarAtivos(): Observable<Marca[]>{
    return this.http.get<Marca[]>(AppConstants.urlMarca + "/ativos").pipe(
      first(),
      delay(500),
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }
  
  selecionarPorId(id: string): Observable<Marca>{
    return this.http.get<Marca>(AppConstants.urlMarca + "/getById/?id=" + id).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  possueFornecedor(id: string): Observable<Boolean>{
    return this.http.get<Boolean>(AppConstants.urlMarca + "/fornecedor/" + id).pipe(
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
