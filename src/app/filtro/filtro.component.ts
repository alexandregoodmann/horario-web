import { Component, OnInit } from '@angular/core';
import { Cadeira } from '../model/cadeira';
import { RestService } from '../service/rest.service';
import { Periodo } from '../model/periodo';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {

  private vetPeriodos: string[] = ['AB', 'CD', 'FG', 'HI', 'JK', 'LM', 'NP'];
  periodos: Periodo[] = new Array<Periodo>();

  cadeiras: Cadeira[] = new Array<Cadeira>();
  ignorarCadeiras: Cadeira[] = new Array();

  constructor(private rest: RestService) { }

  ngOnInit() {
    this.getDisciplinas();
    this.vetPeriodos.forEach(d => {
      let per = new Periodo();
      per.periodo = d;
      per.ignorar = false;
      this.periodos.push(per);
    });
  }

  clickCheckBox(valor: string){
    console.log('====>>>' + valor);
  }

  ignorarCadeira(cadeira: Cadeira): void {
    for (let i = 0; i < this.ignorarCadeiras.length; i++) {
      if (cadeira.codigo === this.ignorarCadeiras[i].codigo) {
        this.ignorarCadeiras.splice(i, 1);
        return;
      }
    }
    this.ignorarCadeiras.push(cadeira);
  }

  atualizar() {
    this.periodos.forEach(p=>{
      console.log(p.periodo+'====>>>' + p.ignorar);
    });
  }

  getDisciplinas() {
    this.rest.getDisciplinas().subscribe((data: Array<Cadeira>) => {
      this.cadeiras = data;
    });
  }

}
