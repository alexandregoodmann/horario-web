import { Component, OnInit } from '@angular/core';
import { Quadro } from '../model/quadro';
import { RestService } from '../service/rest.service';
import { Filtro } from '../model/filtro';

@Component({
  selector: 'app-quadro',
  templateUrl: './quadro.component.html',
  styleUrls: ['./quadro.component.css']
})
export class QuadroComponent implements OnInit {

  quadros: Quadro[] = [];

  constructor(private rest: RestService) { }

  ngOnInit() {
    this.getQuadros();
  }

  getQuadros() {

    let filtro = new Filtro();
    filtro.ignorarCadeiras = ['a', 'b'];
    filtro.ignorarPeriodos = ['c', 'd'];

    this.rest.getQuadros(filtro).subscribe((quadros: Array<Quadro>) => {
      this.quadros = quadros;
    });
  }
}