import { Component, OnInit } from '@angular/core';
import { Quadro } from '../model/quadro';

@Component({
  selector: 'app-quadro',
  templateUrl: './quadro.component.html',
  styleUrls: ['./quadro.component.css']
})
export class QuadroComponent implements OnInit {

  aulas: Quadro[] = ELEMENT_DATA;

  constructor() { }

  ngOnInit() {
  }

}

const ELEMENT_DATA: Quadro[] = [
  { periodo: 'HI', segunda: '4610T-02', terca: '4610T-02', quarta: '4610T-02', quinta: '4610T-02', sexta: '4610T-02', sabado: '4610T-02' },
  { periodo: 'HI', segunda: '4610T-02', terca: '4610T-02', quarta: '4610T-02', quinta: '4610T-02', sexta: '4610T-02', sabado: '4610T-02' },
  { periodo: 'HI', segunda: '4610T-02', terca: '4610T-02', quarta: '4610T-02', quinta: '4610T-02', sexta: '4610T-02', sabado: '4610T-02' }
];