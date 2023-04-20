import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HeaderData } from '../interface/header-data.model';


@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  constructor() { }

  private _headerDate = new BehaviorSubject<HeaderData>({
    title: 'Inicio',
    icon: 'home',
    routerUrl: 'inicio'
})

get headerData(): HeaderData{
  return this._headerDate.value
}

set headerData(headerData: HeaderData){
  this._headerDate.next(headerData)
}
}
