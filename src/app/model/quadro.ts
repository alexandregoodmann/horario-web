import { Disciplina } from "./disciplina";
import { Periodo } from "./periodo";

export class Quadro {

    disciplinas: Map<String, Disciplina> = new Map<String, Disciplina>();
    periodos: Periodo[] = []
    totalCredito: number;
    totalDisciplinas: number;

    getPeriodo(periodo: string): Periodo {
        let f = this.periodos.filter(o => o.periodo === periodo);
        if (f.length === 0) {
            return undefined
        } else {
            return f[0];
        }
    }

    criaPeriodo(periodo: string): Periodo {
        let per = new Periodo();
        per.periodo = periodo;
        per.horario = per.horarios.get(periodo);
        this.periodos.push(per);
        return per;
    }

}