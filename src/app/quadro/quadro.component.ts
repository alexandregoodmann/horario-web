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
  private sugestoes: string[] = [];

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

  sugestao(quadro, dia, per) {
    let periodo = dia + 2 + '' + per;
    this.sugestoes = [];
    this.disciplinas.forEach(d => {
      d.turmas.forEach(t => {
        if (t.horario.includes(periodo) && this.quadroService.todasLivres(quadro, t.horario)) {
          if (!this.sugestoes.includes(d.nmDisciplina)) {
            this.sugestoes.push(d.nmDisciplina);
          }
        }
      })
    });
    if (this.sugestoes.length === 0) {
      this.sugestoes.push('Sem Sugestão');
    }
  }

  remover(quadro: Quadro, aula: Disciplina) {
    aula.horarios.forEach(h => {
      let dia = Number.parseInt(h.substring(0, 1));
      let per = h.substring(1);
      quadro.getPeriodo(per).aulas[dia - 2] = undefined;
    });
  }

}