import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, delay, EMPTY, first, map, Observable } from 'rxjs';
import { EnviarEmail } from '../interface/enviarEmail';
import { AppConstants } from '../interface/servicos/urlConstants';

@Injectable({
  providedIn: 'root'
})
export class EnviarEmailService {

  constructor(private msg: MatSnackBar, private http: HttpClient) { }
  
  cadastrarEnviarEmail(email: string) {
    return this.http.post(AppConstants.urlEmail + "/salvar", email).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  excluirEnviarEmail(id: string){
    const url = AppConstants.urlEmail + "/delete/" + id;
    return this.http.delete(url).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  selecionarTodos(): Observable<EnviarEmail[]>{
    return this.http.get<EnviarEmail[]>(AppConstants.urlEmail + "/getAll").pipe(
      first(),
      delay(500),
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }
  
  selecionarPorId(id: string): Observable<EnviarEmail>{
    return this.http.get<EnviarEmail>(AppConstants.urlEmail + "/getById/?id=" + id).pipe(
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
