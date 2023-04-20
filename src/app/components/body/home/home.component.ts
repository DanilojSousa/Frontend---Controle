import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderService } from '../../service/header.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private headerService: HeaderService,
    private route: Router) {   
    headerService.headerData = {
      title: 'Inicio',
      icon: 'home',
      routerUrl: '',
    } }

  ngOnInit(): void {

  }

}
