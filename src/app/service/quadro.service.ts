import { Injectable } from '@angular/core';
import { Cadeira } from '../model/cadeira';
import { Disciplina } from '../model/disciplina';
import { Quadro } from '../model/quadro';

@Injectable({
  providedIn: 'root'
})
export class QuadroService {

  quadros: Quadro[] = [];
  destino: Map<String, Cadeira> = new Map<String, Cadeira>();

  constructor() { }

  montarQuadros() {

    let o = new Disciplina();
    let q = new Quadro();
    this.quadros[0] = q;

    o.disciplinas.forEach(d => {
      d.turmas.forEach(t => {
        t.horario.forEach(h => {
          if (this.destino.get(h) === undefined) {
            let c = this.parseCadeira(d, t, h);

            this.destino.set(h, c);

            this.put(this.quadros[0], h, c);
          }
        });
      });
    });

    console.log(this.quadros);


  }

  private parseCadeira(d: any, t: any, h: any): Cadeira {
    let c = new Cadeira();
    c.codigo = d.sgCodicred;
    c.credito = Number.parseInt(c.codigo.substring(c.codigo.length - 2, c.codigo.length));
    c.descricao = d.nmNome;
    return c;
  }

  put(q: Quadro, h: string, c: Cadeira) {
    let i = Number.parseInt(h.substring(0, 1)) - 1;
    let j = PERIODOS.indexOf(h.substring(1));
    q[i][j] = c;
  }

  create() {
    for (let i = 0; i < 13; i++) {
      for (let j = 0; j < 7; j++) {
        this.quadros[i][j] = null;
      }
    }
  }
}

const PERIODOS: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'];
