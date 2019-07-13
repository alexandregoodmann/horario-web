import { Component, OnInit } from '@angular/core';
import { PeriodoFiltro } from '../model/periodo-filtro';
import { QuadroService } from '../service/quadro.service';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {

  private periodos: PeriodoFiltro[] = [];

  constructor(private quadroService: QuadroService) { }

  ngOnInit() {
    this.quadroService.periodoObservable.subscribe(data => {
      this.periodos = data;
    });
  }

  atualizar() {
    this.quadroService.montaQuadros();
  }

  mudar(periodo: PeriodoFiltro) {
    if (periodo.checked) {
      periodo.checked = false;
    } else {
      periodo.checked = true;
    }
  }

}