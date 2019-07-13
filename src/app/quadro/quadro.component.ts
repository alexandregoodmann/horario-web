import { Component, OnInit } from '@angular/core';
import { Aula } from '../model/aula';
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

  getClass(aula: Aula) {
    if (aula.vagas === 0) {
      return 'sem-vagas';
    }
  }

  show(quadro: Quadro){
    console.log(quadro);
    
  }

}