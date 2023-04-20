import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BuscarCnpjService {

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': '59a4085d-d96e-4217-a49d-44cf330802f5-12e5beb2-4338-4364-bc2d-70fb26ab5cd1'
    })
  };

  buscar(cnpj: string){
    return this.httpClient.get("https://api.cnpja.com/office/" +cnpj, this.httpOptions)
  }
}
