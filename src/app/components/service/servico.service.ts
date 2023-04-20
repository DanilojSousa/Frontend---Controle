import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, delay, EMPTY, first, map, Observable } from 'rxjs';
import { Servico } from '../interface/servico';
import { AppConstants } from '../interface/servicos/urlConstants';

@Injectable({
  providedIn: 'root'
})
export class ServicoService {
  constructor(private msg: MatSnackBar, private http: HttpClient) { }
 
  cadastrarServico(servico: Servico): Observable<Servico> {
    return this.http.post<Servico>(AppConstants.urlServico + "/salvar", servico).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  excluirServico(id: string){
    const url = AppConstants.urlServico + "/delete/" + id;
    return this.http.delete(url).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  selecionarTodos(): Observable<Servico[]>{
    return this.http.get<Servico[]>(AppConstants.urlServico + "/getAll").pipe(
      first(),
      delay(500),
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }
  
  selecionarPorId(id: string): Observable<Servico>{
    return this.http.get<Servico>(AppConstants.urlServico + "/getById/?id=" + id).pipe(
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
