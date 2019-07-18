import { turma } from "./turma";

export class Disciplina {
    sgCodCred: string;
    nmDisciplina: string;
    codigoTurma: number;
    horarios: string[];
    vagas: number;
    checked: boolean = true;
    nivel: number;
    turmas: any[];
}