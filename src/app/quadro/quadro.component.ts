import { Component, OnInit } from '@angular/core';
import { Disciplina } from '../model/disciplina';
import { Quadro } from '../model/quadro';
import { QuadroService } from '../service/quadro.service';

@Component({
  selector: 'app-quadro',
  templateUrl: './quadro.component.html',
  styleUrls: ['./quadro.component.css']
})
export class QuadroComponent implements OnInit {

  private quadros: Quadro[] = [];

  constructor(private quadroService: QuadroService) { }

  ngOnInit() {
    this.quadroService.quadrosObservable.subscribe(data => {
      this.quadros = data;
    });
  }

  getClass(aula: Disciplina) {
    if (aula.vagas === 0) {
      return 'sem-vagas';
    }
  }

}