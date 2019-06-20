import { Component, OnInit } from '@angular/core';
import { Cadeira } from '../model/cadeira';
import { Filtro } from '../model/filtro';
import { Quadro } from '../model/quadro';
import { RestService } from '../service/rest.service';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {

  private vetPeriodos: string[] = ['AB', 'CD', 'FG', 'HI', 'JK', 'LM', 'NP'];
  private cadeiras: Cadeira[] = new Array<Cadeira>();

  constructor(private rest: RestService) { }

  checkCadeira(e, cadeira: Cadeira) {
    cadeira.ignorar = e.target.checked;
    this.atualizar();
  }

  atualizar() {

    let filtro = new Filtro();
    this.cadeiras.filter(o => o.ignorar === true).forEach(cadeira => {
      filtro.ignorarCadeiras.push(cadeira.codigo);
    });

    this.rest.getQuadros(filtro).subscribe((quadros: Array<Quadro>) => {
      console.log(quadros);

      this.rest.setQuadroSource(quadros);
    });

  }

  ngOnInit() {

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
    this.rest.getQuadros(filtro).subscribe((quadros: Array<Quadro>) => {
      this.rest.setQuadroSource(quadros);
    });

  }

}
