import { Disciplina } from "./disciplina";

export class Nivel {
    nivel: number;
    disciplinas: Disciplina[];
    creditos: number = 0;
    cursados: number = 0;
}