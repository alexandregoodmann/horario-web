import { Aula } from "./aula";

export class Periodo {

    horarios: Map<string, string> = new Map<string, string>();
    periodo: string = '';
    horario: string;
    aulas: Aula[] = Array<Aula>(5);

    constructor() {
        this.horarios.set('A', '8h');
        this.horarios.set('B', '8h50min');
        this.horarios.set('C', '9h50min');
        this.horarios.set('D', '10h40min');
        this.horarios.set('E', '11h35min');
        this.horarios.set('E1', '12h25min');
        this.horarios.set('F', '14h');
        this.horarios.set('G', '14h50min');
        this.horarios.set('H', '15h50min');
        this.horarios.set('I', '16h40min');
        this.horarios.set('J', '17h35min');
        this.horarios.set('K', '18h45min');
        this.horarios.set('L', '19h30min');
        this.horarios.set('M', '20h15min');
        this.horarios.set('N', '21h15min');
        this.horarios.set('P', '22h');
    }

}