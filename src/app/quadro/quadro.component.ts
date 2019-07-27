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
  private disciplinas: Disciplina[] = [];
  private sugestoes: Map<String, Disciplina> = new Map<String, Disciplina>();

  constructor(private quadroService: QuadroService) { }

  ngOnInit() {
    this.quadroService.quadrosObservable.subscribe(data => {
      this.quadros = data;
    });
    this.quadroService.cadeirasObservable.subscribe(data => this.disciplinas = data);
  }

  getClass(aula: Disciplina) {
    if (aula.vagas === 0) {
      return 'sem-vagas';
    }
  }

  sugestao(dia, per) {

    let periodo = dia + 2 + '' + per;
    this.sugestoes = new Map<String, Disciplina>();

    this.disciplinas.forEach(d => {

      let clone = { ...d };
      clone.turmas = [];
      let cloneTurmas: any[] = [...d.turmas];

      let encontrou: boolean = false;
      cloneTurmas.forEach(t => {
        if (t.horario.includes(periodo)) {
          encontrou = true;
          clone.turmas.push(t);
        }
      });

      if (encontrou && this.sugestoes.get(d.sgCodicred) === undefined) {
        this.sugestoes.set(d.sgCodicred, clone);
      }

    });

  }

  remover(quadro: Quadro, aula: Disciplina) {
    aula.horarios.forEach(h => {
      let dia = Number.parseInt(h.substring(0, 1));
      let per = h.substring(1);
      quadro.getPeriodo(per).aulas[dia - 2] = undefined;
    });
  }

  add(quadro: Quadro, aula: Disciplina) {
    this.quadroService.setAulas(quadro, aula)
  }
  
}