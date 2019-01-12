import { Component, OnInit } from '@angular/core';
import { Quadro } from '../model/quadro';
import { RestService } from '../service/rest.service';

@Component({
  selector: 'app-quadro',
  templateUrl: './quadro.component.html',
  styleUrls: ['./quadro.component.css']
})
export class QuadroComponent implements OnInit {

  aulas: Quadro[] = ELEMENT_DATA;
  quadros: any = [];

  constructor(private rest: RestService) { }

  ngOnInit() {
    this.getQuadros();
  }

  getQuadros() {
    this.quadros = [];
    this.rest.getQuadros().subscribe((data: {}) => this.quadros = data);
    console.log('aff', this.quadros);
  }
}

const ELEMENT_DATA: Quadro[] = [];

/*
const ELEMENT_DATA: Quadro[] = [
  { periodo: 'HI', segunda: '4610T-02', terca: '4610T-02', quarta: '4610T-02', quinta: '4610T-02', sexta: '4610T-02', sabado: '4610T-02' },
  { periodo: 'HI', segunda: '4610T-02', terca: '4610T-02', quarta: '4610T-02', quinta: '4610T-02', sexta: '4610T-02', sabado: '4610T-02' },
  { periodo: 'HI', segunda: '4610T-02', terca: '4610T-02', quarta: '4610T-02', quinta: '4610T-02', sexta: '4610T-02', sabado: '4610T-02' }
];
*/