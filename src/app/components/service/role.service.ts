import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, delay, EMPTY, first, map, Observable } from 'rxjs';
import { Role } from '../interface/role';
import { AppConstants } from '../interface/servicos/urlConstants';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private msg: MatSnackBar, private http: HttpClient) { }
 
  cadastrarNivelAcesso(nivelAcesso: Role): Observable<Role> {
    return this.http.post<Role>(AppConstants.urlRole + "/salvar", nivelAcesso).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  excluirNivelAcesso(id: string){
    const url = AppConstants.urlRole + "/delete/" + id;
    return this.http.delete(url).pipe(
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  selecionarTodos(): Observable<Role[]>{
    return this.http.get<Role[]>(AppConstants.urlRole + "/getAll").pipe(
      first(),
      delay(500),
      map((obj) => obj),
      catchError((e) => this.error(e)),
    );
  }

  selecionarPorId(id: string): Observable<Role>{
    return this.http.get<Role>(AppConstants.urlRole + "/getById/?id=" + id).pipe(
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
