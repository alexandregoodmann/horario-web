import { Component, OnInit } from '@angular/core';
import { Disciplina } from '../model/disciplina';
import { PeriodoFiltro } from '../model/periodo-filtro';
import { QuadroService } from '../service/quadro.service';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {

  private periodos: PeriodoFiltro[] = [];
  private cadeiras: Disciplina[] = [];
  private filtroPeriodo: string[] = [];

  constructor(private quadroService: QuadroService) { }

  ngOnInit() {
    this.quadroService.periodoObservable.subscribe(data => {
      this.periodos = data;
    });
    this.quadroService.cadeirasObservable.subscribe(data => this.cadeiras = data);
  }

  private addRem(e: any, vet: string[]) {
    if (e.target.checked) {
      vet.forEach(v => {
        this.filtroPeriodo.push(v);
      });
    } else {
      vet.forEach(v => {
        let i = this.filtroPeriodo.indexOf(v);
        this.filtroPeriodo.splice(i, 1);
      });
    }
  }

  atualizar(e) {

    if (e.target.value === 'manha') {
      let vet: string[] = ['A', 'B', 'C', 'D'];
      this.addRem(e, vet);
    }

    if (e.target.value === 'tarde') {
      let vet: string[] = ['E', 'E1', 'F', 'G', 'H', 'I'];
      this.addRem(e, vet);
    }

    if (e.target.value === 'noite') {
      let vet: string[] = ['J', 'K', 'L', 'M', 'N', 'P'];
      this.addRem(e, vet);
    }

    //atualiza com as disciplinas marcadas
    let cadeiras: string[] = [];
    let cad = this.cadeiras.filter(o => o.checked);
    cad.forEach(c => {
      cadeiras.push(c.sgCodicred);
    });

    //atualiza quadros
    this.quadroService.montaQuadros(this.filtroPeriodo, cadeiras);
  }

  checkCadeira(e, cadeira: Disciplina) {
    cadeira.checked = e.target.checked;
    this.atualizar(e);
  }

  checkTodasCadeira(e) {
    this.cadeiras.forEach(c => c.checked = e.target.checked);
    this.atualizar(e);
  }

}