import { Component, OnInit } from '@angular/core';
import { Periodo } from '../model/periodo';

@Component({
  selector: 'app-periodo',
  templateUrl: './periodo.component.html',
  styleUrls: ['./periodo.component.css']
})
export class PeriodoComponent implements OnInit {

  periodos: Periodo[] = ELEMENT_DATA;

  constructor() { }

  ngOnInit() {
  }

}
const ELEMENT_DATA: Periodo[] = [
  { periodo: 'HI', selecionado: true },
  { periodo: 'JK', selecionado: true },
  { periodo: 'LM', selecionado: true },
  { periodo: 'NP', selecionado: true }
];