import { Cadeira } from "./cadeira";

export class Quadro {
    aulas: Cadeira[][] = new Array<Array<Cadeira>>();
    totalCredito: number;
}