import { Component, OnInit } from '@angular/core';
import { Quadro } from '../model/quadro';
import { RestService } from '../service/rest.service';

@Component({
  selector: 'app-quadro',
  templateUrl: './quadro.component.html',
  styleUrls: ['./quadro.component.css']
})
export class QuadroComponent implements OnInit {

  quadros: Quadro[];

  constructor(private rest: RestService) { }

  ngOnInit() {
    this.getQuadros();
  }

  getQuadros() {
    this.quadros = [];
    this.rest.getQuadros().subscribe((quadros: Array<Quadro>) => {
      this.quadros = quadros;
    });
  }
}