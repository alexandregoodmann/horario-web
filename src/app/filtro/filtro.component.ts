import { Component, OnInit } from '@angular/core';
import { Aula } from '../model/aula';
import { PeriodoFiltro } from '../model/periodo-filtro';
import { QuadroService } from '../service/quadro.service';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {

  private periodos: PeriodoFiltro[] = [];
  private todos: boolean = true;
  private cadeiras: Aula[] = [];

  constructor(private quadroService: QuadroService) { }

  ngOnInit() {
    this.quadroService.periodoObservable.subscribe(data => {
      this.periodos = data;
    });
    this.quadroService.cadeirasObservable.subscribe(data => this.cadeiras = data);
    this.atualizar();
  }

  atualizar() {

    //atualiza com os periodos marcados
    let periodos: string[] = [];
    let per = this.periodos.filter(o => o.checked);
    per.forEach(p => {
      periodos.push(p.periodo);
    })

    //atualiza com as disciplinas marcadas
    let cadeiras: string[] = [];
    let cad = this.cadeiras.filter(o => o.checked);
    cad.forEach(c => {
      cadeiras.push(c.sgCodCred);
    });

    //atualiza quadros
    this.quadroService.montaQuadros(periodos, cadeiras);
  }

  mudar(periodo: PeriodoFiltro) {
    if (periodo.checked) {
      periodo.checked = false;
    } else {
      periodo.checked = true;
    }
  }

  setTodos(e) {
    this.periodos.forEach(p => {
      p.checked = e.target.checked;
    });
  }

  checkCadeira(e, cadeira: Aula) {
    cadeira.checked = e.target.checked;
  }

  checkTodasCadeira(e) {
    this.cadeiras.forEach(c => c.checked = e.target.checked);
  }

}