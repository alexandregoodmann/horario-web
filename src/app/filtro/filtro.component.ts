import { Component, OnInit } from '@angular/core';
import { Periodo } from '../model/periodo';
import { QuadroService } from '../service/quadro.service';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {

  private periodos: Periodo[] = [];

  constructor(private quadroService: QuadroService) { }

  ngOnInit() {
    this.quadroService.periodoObservable.subscribe(data => {
      this.periodos = data;
    });
    this.quadroService.montaQuadros();
  } 

  atualizar() {
    
  }

  mudar(periodo: Periodo) {
    if (periodo.checked) {
      periodo.checked = false;
    } else {
      periodo.checked = true;
    }
  }

}