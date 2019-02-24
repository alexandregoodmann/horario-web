import { Component, OnInit } from '@angular/core';
import { Cadeira } from '../model/cadeira';
import { Filtro } from '../model/filtro';
import { Periodo } from '../model/periodo';
import { Quadro } from '../model/quadro';
import { RestService } from '../service/rest.service';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {

  private vetPeriodos: string[] = ['AB', 'CD', 'FG', 'HI', 'JK', 'LM', 'NP'];
  private periodos: Periodo[] = new Array<Periodo>();
  private cadeiras: Cadeira[] = new Array<Cadeira>();

  constructor(private rest: RestService) { }

  checkPeriodo(e, periodo: Periodo) {
    periodo.ignorar = e.target.checked;
  }

  checkCadeira(e, cadeira: Cadeira) {
    cadeira.ignorar = e.target.checked;
  }

  atualizar() {

    let filtro = new Filtro();
    this.cadeiras.filter(o => o.ignorar === true).forEach(cadeira => {
      filtro.ignorarCadeiras.push(cadeira.codigo);
    });

    this.periodos.filter(o => o.ignorar === true).forEach(periodo => {
      filtro.ignorarPeriodos.push(periodo.periodo);
    });

    this.rest.getQuadros2(filtro).subscribe((quadros: Array<Quadro>) => {
      console.log(quadros);

      this.rest.setQuadroSource(quadros);
    });

  }

  ngOnInit() {

    //Monta lista de periodos
    this.vetPeriodos.forEach(d => {
      let per = new Periodo();
      per.periodo = d;
      per.ignorar = false;
      this.periodos.push(per);
    });

    //pega lista das disciplinas
    let mapa = new Map<String, Cadeira>();
    this.rest.getCadeiras().subscribe((data: Array<Cadeira>) => {
      data.forEach(cadeira => {
        mapa.set(cadeira.codigo, cadeira);
      });
      mapa.forEach(m => {
        this.cadeiras.push(m);
      });
    });

    //monta a lista de quadros
    let filtro = new Filtro();
    this.rest.getQuadros2(filtro).subscribe((quadros: Array<Quadro>) => {
      this.rest.setQuadroSource(quadros);
    });

  }

}