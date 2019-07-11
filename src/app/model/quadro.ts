import { Aula } from "./aula";

export class Quadro {

    disciplinas: Map<String, Aula> = new Map<String, Aula>();
    quadro: Map<string, Array<Aula>> = new Map<string, Array<Aula>>();
    totalCredito: number;
    
}