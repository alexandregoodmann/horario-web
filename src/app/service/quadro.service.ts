import { Injectable } from '@angular/core';
import { TurmaDTO } from '../model/turma';

@Injectable({
  providedIn: 'root'
})
export class QuadroService {

  constructor() { }

  setAula(per: string, turma: TurmaDTO): void {
    let vet = this.parsePeriodo(per);
    this.quadro[vet[0]][vet[1]] = turma;
  }

  getAula(per: string): TurmaDTO {
    let vet = this.parsePeriodo(per);
    let cell = this.quadro[vet[0]][vet[1]];
    if (cell === '') {
      return undefined;
    } else {
      return cell;
    }
  }

  private parsePeriodo(periodo: string): number[] {
    let i = PERIODOS.indexOf(periodo.substring(1));
    let j = Number.parseInt(periodo.substring(0, 1)) - 1;
    return [i, j];
  }

  private criaQuadro(): void {
    for (let i = 0; i < PERIODOS.length; i++) {
      let linha = new Array<any>();
      for (let j = 0; j < 7; j++) {
        if (j === 0) {
          linha.push(PERIODOS[i]);
        } else {
          linha.push('');
        }
      }
      this.quadro.push(linha);
    }
  }

  calcularTotal() {
    let total: number = 0;
    this.disciplinas.forEach((v, k) => {
      total = total + Number.parseInt(k.substring(k.length - 2));
    });
    this.totalCredito = total;
  }
}
