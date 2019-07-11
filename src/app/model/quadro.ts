import { TurmaDTO } from "./turma";

export class Quadro {

    disciplinas: Map<String, TurmaDTO> = new Map<String, TurmaDTO>();
    quadro: Array<Array<any>> = new Array<Array<any>>();
    totalCredito: number;

    constructor() {
    }
}