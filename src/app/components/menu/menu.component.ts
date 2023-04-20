import { LoginService } from './../service/login.service';
import { Router } from '@angular/router';
import { Component, HostListener, OnInit } from '@angular/core';
import { HeaderService } from '../service/header.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  currentUrl!: string; 
  private inactivityTimeoutId: any;

  constructor(private route: Router, 
    private login: LoginService,
    private headerService: HeaderService) {

   }

  ngOnInit(): void {
    this.home();
    this.logado();
    this.atualizandoNavegador();
    this.resetInactivityTimer();
  }
  
  home(){
    this.route.navigate(["/inicio"])
  }

  @HostListener('document:mousemove')
  @HostListener('document:keypress')
  resetInactivityTimer() {
    clearTimeout(this.inactivityTimeoutId);
    this.inactivityTimeoutId = setTimeout(() => {
      this.login.sair();
    }, 1800000); 
  }

  logado(): Boolean{
    const token = localStorage.getItem('XAuthorization');
    if(token != null){
      return true;
    }else{
      return false;
    }
  }

  sair(){
    this.login.sair();
    this.logado();
    this.route.navigate(["/inicio"])
  }

  get title(): string{
    return this.headerService.headerData.title;
  }
  get icon(): string{
    return this.headerService.headerData.icon;
  }
  get routerUrl(): string{
    return this.headerService.headerData.routerUrl;
  }

  atualizandoNavegador(){
    this.currentUrl = window.location.href;
    if(!this.currentUrl.includes('inicio')){
      this.route.navigate([this.currentUrl.substring(21)]);
    }
  }

}
