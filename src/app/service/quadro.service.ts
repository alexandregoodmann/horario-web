import { Injectable } from '@angular/core';
import { Cadeira } from '../model/cadeira';
import { Disciplina } from '../model/disciplina';
import { Quadro } from '../model/quadro';

@Injectable({
  providedIn: 'root'
})
export class QuadroService {

  destino: Map<String, Cadeira> = new Map<String, Cadeira>();

  constructor() { }

  montarQuadros(): Quadro[] {

    this.montarListaDestino();
    let q = this.criarQuadroVazio();
    let quadros: Quadro[] = [];
    
    this.destino.forEach((c, h) => {
      let vet = this.parseHorario(h);
      q.quadro[vet[0]][vet[1]] = c;
    });

    quadros.push(q);

    return quadros;
  }

  private montarListaDestino() {

    let o = new Disciplina();

    o.disciplinas.forEach(d => {
      d.turmas.forEach(t => {
        t.horario.forEach(h => {
          if (this.destino.get(h) === undefined) {
            let c = this.parseCadeira(d, t, h);
            this.destino.set(h, c);
          }
        });
      });
    });

  }

  private parseCadeira(d: any, t: any, h: any): Cadeira {
    let c = new Cadeira();
    c.codigo = d.sgCodicred;
    c.credito = Number.parseInt(c.codigo.substring(c.codigo.length - 2, c.codigo.length));
    c.descricao = d.nmNome;
    return c;
  }

  parseHorario(h: String): number[] {
    let i = PERIODOS.indexOf(h.substring(1));
    let j = Number.parseInt(h.substring(0, 1)) - 1;
    return [i, j];
  }

  private criarQuadroVazio(): Quadro {
    let q = new Quadro();
    for (let i = 0; i < PERIODOS.length; i++) {
      let linha: string[] = [];
      for (let j = 0; j < 7; j++) {
        linha.push('');
      }
      q.quadro.push(linha);
    }
    return q;
  }
}

const PERIODOS: string[] = ['A', 'B', 'C', 'D', 'E', 'E1', 'E2', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'P', 'Q'];
