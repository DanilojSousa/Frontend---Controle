import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, delay, EMPTY, first, map, Observable } from 'rxjs';
import { Setor } from '../interface/setor';
import { AppConstants } from '../interface/servicos/urlConstants';

@Injectable({
  providedIn: 'root'
})
export class SetorService {
  
  constructor(private msg: MatSnackBar, private http: HttpClient) { }

  cadastrarSetor(setor: Setor): Observable<Setor> {
    return this.http.post<Setor>(AppConstants.urlSetor + "/salvar", setor).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  excluirSetor(id: string){
    const url = AppConstants.urlSetor + "/delete/" + id;
    return this.http.delete(url).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  selecionarTodos(): Observable<Setor[]>{
    return this.http.get<Setor[]>(AppConstants.urlSetor + "/getAll").pipe(
      first(),
      delay(500),
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }
  
  selecionarPorId(id: string): Observable<Setor>{
    return this.http.get<Setor>(AppConstants.urlSetor + "/getById/?id=" + id).pipe(
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
