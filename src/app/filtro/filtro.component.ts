import { Component, OnInit } from '@angular/core';
import { Cadeira } from '../model/cadeira';
import { RestService } from '../service/rest.service';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {

  cadeiras: Cadeira[];
  ignorarCadeiras: Cadeira[] = new Array();

  constructor(private rest: RestService) { }

  ngOnInit() {
    this.getCadeiras();
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
    this.cadeiras.forEach(c => {
      console.log('-->>>' + c.descricao + '--->>>');
    });
  }

  getCadeiras() {
    this.rest.getCadeiras().subscribe((data: Array<Cadeira>) => {
      this.cadeiras = data;
    });
  }
 
}
