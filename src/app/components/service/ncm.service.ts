import { Ncm } from './../interface/ncm';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, delay, EMPTY, first, map, Observable } from 'rxjs';
import { AppConstants } from '../interface/servicos/urlConstants';

@Injectable({
  providedIn: 'root'
})
export class NcmService {

  constructor(private msg: MatSnackBar, private http: HttpClient) { }
  
  cadastrarNcm(ncm: Ncm): Observable<Ncm> {
    return this.http.post<Ncm>(AppConstants.urlNcm + "/salvar", ncm).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  excluirNcm(id: string){
    const url = AppConstants.urlNcm + "/delete/" + id;
    return this.http.delete(url).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  selecionarTodos(): Observable<Ncm[]>{
    return this.http.get<Ncm[]>(AppConstants.urlNcm + "/getAll").pipe(
      first(),
      delay(500),
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }
  
  selecionarPorId(id: string): Observable<Ncm>{
    return this.http.get<Ncm>(AppConstants.urlNcm + "/getById/?id=" + id).pipe(
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
