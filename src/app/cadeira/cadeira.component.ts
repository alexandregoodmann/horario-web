import { Component, OnInit } from '@angular/core';
import { Cadeira } from '../model/cadeira';

@Component({
  selector: 'app-cadeira',
  templateUrl: './cadeira.component.html',
  styleUrls: ['./cadeira.component.css']
})
export class CadeiraComponent implements OnInit {

  incluirAll: boolean = true;

  cadeiras: Cadeira[] = ELEMENT_DATA;

  constructor() { }

  ngOnInit() {
  }

}

const ELEMENT_DATA: Cadeira[] = [];