import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Disciplina } from '../model/disciplina';
import { PeriodoFiltro } from '../model/periodo-filtro';
import { Quadro } from '../model/quadro';

@Injectable({
    providedIn: 'root'
})
export class QuadroService {

    private origem: Disciplina[] = [];

    private periodoBehavior = new BehaviorSubject<Array<PeriodoFiltro>>(new Array<PeriodoFiltro>());
    periodoObservable = this.periodoBehavior.asObservable();

    private quadrosBehavior = new BehaviorSubject<Array<Quadro>>(new Array<Quadro>());
    quadrosObservable = this.quadrosBehavior.asObservable();

    private cadeirasBehavior = new BehaviorSubject<Array<Disciplina>>(new Array<Disciplina>());
    cadeirasObservable = this.cadeirasBehavior.asObservable();

    constructor() {
        this.setPeriodos();
        this.listaCadeiras();
    }

    private listaCadeiras(): void {

        let lista = [...DADOS];

        let cadeiras: Disciplina[] = [];
        lista.forEach(d => {
            let cadeira = new Disciplina();
            cadeira.sgCodCred = d.sgCodicred;
            cadeira.nmDisciplina = d.nmNome;
            cadeira.nivel = d.cdNivel;
            cadeira.turmas = d.turmas;
            cadeiras.push(cadeira);
        });

        cadeiras.sort(function (a, b) {
            if (a.nivel > b.nivel) {
                return 1;
            }
            if (a.nivel < b.nivel) {
                return -1;
            }
            return 0;
        });

        this.cadeirasBehavior.next(cadeiras);
    }

    private setPeriodos() {
        let periodos: PeriodoFiltro[] = [];
        PERIODOS.forEach(p => {
            let pp = new PeriodoFiltro();
            pp.checked = true;
            pp.periodo = p;
            periodos.push(pp);
        });
        this.periodoBehavior.next(periodos);
    }

    private criaOrigem(periodos: string[], cadeiras: string[]): void {

        let lista = [...DADOS];

        this.cadeirasObservable.subscribe(data => {
            lista.forEach(dis => {
                if (cadeiras.includes(dis.sgCodicred)) {
                    dis.turmas.forEach(t => {
                        let add: boolean = false;
                        t.horario.forEach(h => {
                            if (periodos.includes(h.substring(1))) {
                                add = true;
                            }
                        });
                        if (add) {
                            let aula = new Disciplina();
                            aula.codigoTurma = t.codigo;
                            aula.horarios = t.horario;
                            aula.nmDisciplina = dis.nmNome;
                            aula.sgCodCred = dis.sgCodicred;
                            aula.vagas = t.vagas;
                            aula.nivel = dis.cdNivel;
                            this.origem.push(aula);
                        }
                    });
                }
            });
        });

        //ordena lista por nível
        this.origem.sort(function (a, b) {
            if (a.nivel > b.nivel) {
                return 1;
            }
            if (a.nivel < b.nivel) {
                return -1;
            }
            return 0;
        });

    }

    montaQuadros(periodos: string[], cadeiras: string[]) {

        this.criaOrigem(periodos, cadeiras);

        let quadros: Quadro[] = [];
        while (this.origem.length > 0) {
            quadros.push(this.montarQuadro());
        }

        quadros.sort(function (a, b) {
            if (a.totalCredito > b.totalCredito) {
                return -1;
            }
            if (a.totalCredito < b.totalCredito) {
                return 1;
            }
            return 0;
        });
        this.quadrosBehavior.next(quadros);
    }

    private montarQuadro(): Quadro {

        let remover: number[] = [];
        let quadro: Quadro = new Quadro();

        this.origem.forEach(turma => {
            //se ainda não estiver no quadro
            if (quadro.disciplinas.get(turma.sgCodCred) === undefined) {
                //se todos os horários desta turma estão livres
                if (this.todasLivres(quadro, turma.horarios)) {
                    //adiciona no quadro as turmas
                    quadro.disciplinas.set(turma.sgCodCred, turma);
                    this.setAulas(quadro, turma);
                    remover.push(this.origem.indexOf(turma));
                }
            }
        });

        //remove da origem os objetos adicionados ao quadro
        remover.forEach(r => {
            this.origem.splice(r, 1);
        });

        this.calcularTotal(quadro);

        quadro.periodos.sort(function (a, b) {
            if (a.periodo > b.periodo) {
                return 1;
            }
            if (a.periodo < b.periodo) {
                return -1;
            }
            return 0;
        });

        return quadro;
    }

    private setAulas(quadro: Quadro, aula: Disciplina): void {
        aula.horarios.forEach(h => {
            //2J 2K; 
            let pos = Number.parseInt(h.substring(0, 1)) - 2;
            let per = h.substring(1);
            let periodo = quadro.getPeriodo(per);
            if (periodo === undefined) {
                quadro.criaPeriodo(per).aulas[pos] = aula;
            } else {
                periodo.aulas[pos] = aula;
            }
        });
    }

    todasLivres(quadro: Quadro, horarios: string[]): boolean {

        let livre: boolean = true;

        horarios.forEach(h => {
            let pos = Number.parseInt(h.substring(0, 1)) - 2;
            let per = h.substring(1);
            let periodo = quadro.getPeriodo(per);
            if (periodo !== undefined) {
                if (periodo.aulas[pos] !== undefined) {
                    livre = false;
                }
            }
        });

        return livre;
    }

    private calcularTotal(quadro: Quadro) {
        let total: number = 0;
        quadro.disciplinas.forEach((v, k) => {
            total = total + Number.parseInt(k.substring(k.length - 2));
        });
        quadro.totalCredito = total;
        quadro.totalDisciplinas = quadro.disciplinas.size;
    }

}

const PERIODOS = ['A', 'B', 'C', 'D', 'E', 'E1', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'P'];

const DADOS = [
    {
        "retorno": null,
        "mensagem": null,
        "cdDisciplina": 10586,
        "nmNome": "Vibrações Mecânicas",
        "sgCodicred": "4444R-04",
        "sgCodi": null,
        "sgCred": null,
        "cdNivel": 6,
        "tipoDisciplina": null,
        "idTipoDisciplina": 1,
        "nrCreditosPre": 0,
        "stStatus": null,
        "txCursado": null,
        "txPlanejado": null,
        "txCorequisito": null,
        "cdCoRequisito": null,
        "disciplinasPreRequisito": "\n95305-04 - Matemática Aplicada",
        "disciplinasSubstitutas": "",
        "disciplinasCoRequisitos": "",
        "disciplinasRequisitosEspeciais": "",
        "tipoRequisito": [
            "REQ",
            "SUB"
        ],
        "turmas": [
            {
                "cdDisciplina": 10586,
                "idTurmaAluno": 0,
                "idTurma": 722,
                "stMatricula": null,
                "codigo": 370,
                "txHorario": "2LM 4NP ",
                "horario": [
                    "2L",
                    "2M",
                    "4N",
                    "4P"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "4442-ENGENHARIA MECÂNICA",
                    "4452-ENGENHARIA MECÂNICA"
                ],
                "txHorarioExtenso": "Segunda-feira, das 19:30 às 21:00 e Quarta-feira, das 21:15 às 22:45",
                "vagas": 60,
                "vagasVeterano": 60,
                "vagasBixo": 0,
                "vagasExtra": 0,
                "vagasCentral": 0,
                "incluido": null,
                "nrPredio": "30D",
                "nrSala": "207",
                "professores": null,
                "tpVaga": "V",
                "tpTurma": "N"
            }
        ]
    },
    {
        "retorno": null,
        "mensagem": null,
        "cdDisciplina": 26927,
        "nmNome": "Laboratório - Criatividade E Design",
        "sgCodicred": "254ER-04",
        "sgCodi": null,
        "sgCred": null,
        "cdNivel": 0,
        "tipoDisciplina": null,
        "idTipoDisciplina": 3,
        "nrCreditosPre": 0,
        "stStatus": null,
        "txCursado": null,
        "txPlanejado": null,
        "txCorequisito": null,
        "cdCoRequisito": null,
        "disciplinasPreRequisito": "",
        "disciplinasSubstitutas": "",
        "disciplinasCoRequisitos": "",
        "disciplinasRequisitosEspeciais": "",
        "tipoRequisito": [],
        "turmas": [
            {
                "cdDisciplina": 26927,
                "idTurmaAluno": 10413,
                "idTurma": 2286,
                "stMatricula": "R",
                "codigo": 670,
                "txHorario": "4ABCD ",
                "horario": [
                    "4A",
                    "4B",
                    "4C",
                    "4D"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "2553-ADMINISTRAÇÃO - LF INOVAÇÃO E EMPREENDEDORISMO"
                ],
                "txHorarioExtenso": "Quarta-feira, das 08:00 às 11:30",
                "vagas": 5,
                "vagasVeterano": 25,
                "vagasBixo": 0,
                "vagasExtra": 5,
                "vagasCentral": 0,
                "incluido": true,
                "nrPredio": "15A",
                "nrSala": "206",
                "professores": null,
                "tpVaga": "E",
                "tpTurma": "N"
            }
        ]
    },
    {
        "retorno": null,
        "mensagem": null,
        "cdDisciplina": 10585,
        "nmNome": "Engenharia Da Qualidade",
        "sgCodicred": "4444P-02",
        "sgCodi": null,
        "sgCred": null,
        "cdNivel": 6,
        "tipoDisciplina": null,
        "idTipoDisciplina": 1,
        "nrCreditosPre": 0,
        "stStatus": null,
        "txCursado": null,
        "txPlanejado": null,
        "txCorequisito": null,
        "cdCoRequisito": null,
        "disciplinasPreRequisito": "",
        "disciplinasSubstitutas": "\n4481L-04 - Gestao de Qualidade - Eq",
        "disciplinasCoRequisitos": "",
        "disciplinasRequisitosEspeciais": "\n95304-04 - Probabilidade e Estatística",
        "tipoRequisito": [
            "ESP",
            "SUB"
        ],
        "turmas": [
            {
                "cdDisciplina": 10585,
                "idTurmaAluno": 0,
                "idTurma": 473,
                "stMatricula": null,
                "codigo": 370,
                "txHorario": "3LM ",
                "horario": [
                    "3L",
                    "3M"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "4455-ENGENHARIA DE CONTROLE E AUTOMAÇÃO",
                    "4442-ENGENHARIA MECÂNICA",
                    "4452-ENGENHARIA MECÂNICA"
                ],
                "txHorarioExtenso": "Terça-feira, das 19:30 às 21:00",
                "vagas": 60,
                "vagasVeterano": 60,
                "vagasBixo": 0,
                "vagasExtra": 0,
                "vagasCentral": 0,
                "incluido": null,
                "nrPredio": "30D",
                "nrSala": "307",
                "professores": null,
                "tpVaga": "V",
                "tpTurma": "N"
            }
        ]
    },
    {
        "retorno": null,
        "mensagem": null,
        "cdDisciplina": 10597,
        "nmNome": "Máquinas Térmicas",
        "sgCodicred": "4445E-04",
        "sgCodi": null,
        "sgCred": null,
        "cdNivel": 8,
        "tipoDisciplina": null,
        "idTipoDisciplina": 1,
        "nrCreditosPre": 0,
        "stStatus": null,
        "txCursado": null,
        "txPlanejado": null,
        "txCorequisito": null,
        "cdCoRequisito": 6700,
        "disciplinasPreRequisito": "\n4444H-04 - Termodinâmica Aplicada",
        "disciplinasSubstitutas": "",
        "disciplinasCoRequisitos": "",
        "disciplinasRequisitosEspeciais": "",
        "tipoRequisito": [
            "REQ",
            "SUB"
        ],
        "turmas": [
            {
                "cdDisciplina": 10597,
                "idTurmaAluno": 0,
                "idTurma": 272,
                "stMatricula": null,
                "codigo": 380,
                "txHorario": "4LM 6NP ",
                "horario": [
                    "4L",
                    "4M",
                    "6N",
                    "6P"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "4442-ENGENHARIA MECÂNICA",
                    "4452-ENGENHARIA MECÂNICA"
                ],
                "txHorarioExtenso": "Quarta-feira, das 19:30 às 21:00 e Sexta-feira, das 21:15 às 22:45",
                "vagas": 30,
                "vagasVeterano": 30,
                "vagasBixo": 0,
                "vagasExtra": 0,
                "vagasCentral": 0,
                "incluido": null,
                "nrPredio": "30F",
                "nrSala": "119",
                "professores": null,
                "tpVaga": "V",
                "tpTurma": "N"
            }
        ]
    },
    {
        "retorno": null,
        "mensagem": null,
        "cdDisciplina": 27152,
        "nmNome": "Laboratório - Mercado E Modelagem De Negócios",
        "sgCodicred": "254ET-04",
        "sgCodi": null,
        "sgCred": null,
        "cdNivel": 0,
        "tipoDisciplina": null,
        "idTipoDisciplina": 3,
        "nrCreditosPre": 0,
        "stStatus": null,
        "txCursado": null,
        "txPlanejado": null,
        "txCorequisito": null,
        "cdCoRequisito": null,
        "disciplinasPreRequisito": "",
        "disciplinasSubstitutas": "",
        "disciplinasCoRequisitos": "",
        "disciplinasRequisitosEspeciais": "",
        "tipoRequisito": [],
        "turmas": [
            {
                "cdDisciplina": 27152,
                "idTurmaAluno": 0,
                "idTurma": 2117,
                "stMatricula": null,
                "codigo": 670,
                "txHorario": "6ABCD ",
                "horario": [
                    "6A",
                    "6B",
                    "6C",
                    "6D"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "2553-ADMINISTRAÇÃO - LF INOVAÇÃO E EMPREENDEDORISMO"
                ],
                "txHorarioExtenso": "Sexta-feira, das 08:00 às 11:30",
                "vagas": 5,
                "vagasVeterano": 25,
                "vagasBixo": 0,
                "vagasExtra": 5,
                "vagasCentral": 0,
                "incluido": null,
                "nrPredio": "15A",
                "nrSala": "214",
                "professores": null,
                "tpVaga": "E",
                "tpTurma": "N"
            }
        ]
    },
    {
        "retorno": null,
        "mensagem": null,
        "cdDisciplina": 26898,
        "nmNome": "Laboratório - O Empreendedor",
        "sgCodicred": "254EN-04",
        "sgCodi": null,
        "sgCred": null,
        "cdNivel": 0,
        "tipoDisciplina": null,
        "idTipoDisciplina": 3,
        "nrCreditosPre": 0,
        "stStatus": null,
        "txCursado": null,
        "txPlanejado": null,
        "txCorequisito": null,
        "cdCoRequisito": null,
        "disciplinasPreRequisito": "",
        "disciplinasSubstitutas": "",
        "disciplinasCoRequisitos": "",
        "disciplinasRequisitosEspeciais": "",
        "tipoRequisito": [],
        "turmas": [
            {
                "cdDisciplina": 26898,
                "idTurmaAluno": 10415,
                "idTurma": 2469,
                "stMatricula": "R",
                "codigo": 670,
                "txHorario": "5ABCD ",
                "horario": [
                    "5A",
                    "5B",
                    "5C",
                    "5D"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "2553-ADMINISTRAÇÃO - LF INOVAÇÃO E EMPREENDEDORISMO"
                ],
                "txHorarioExtenso": "Quinta-feira, das 08:00 às 11:30",
                "vagas": 5,
                "vagasVeterano": 25,
                "vagasBixo": 0,
                "vagasExtra": 5,
                "vagasCentral": 0,
                "incluido": true,
                "nrPredio": "15A",
                "nrSala": "110",
                "professores": null,
                "tpVaga": "E",
                "tpTurma": "N"
            }
        ]
    },
    {
        "retorno": null,
        "mensagem": null,
        "cdDisciplina": 6878,
        "nmNome": "Eletrotécnica - Em",
        "sgCodicred": "4453G-02",
        "sgCodi": null,
        "sgCred": null,
        "cdNivel": 4,
        "tipoDisciplina": null,
        "idTipoDisciplina": 1,
        "nrCreditosPre": 0,
        "stStatus": null,
        "txCursado": null,
        "txPlanejado": null,
        "txCorequisito": null,
        "cdCoRequisito": null,
        "disciplinasPreRequisito": "",
        "disciplinasSubstitutas": "",
        "disciplinasCoRequisitos": "\n42187-04 - Eletromagnetismo",
        "disciplinasRequisitosEspeciais": "",
        "tipoRequisito": [
            "COR",
            "SUB"
        ],
        "turmas": [
            {
                "cdDisciplina": 6878,
                "idTurmaAluno": 1354,
                "idTurma": 170,
                "stMatricula": "R",
                "codigo": 470,
                "txHorario": "3LM ",
                "horario": [
                    "3L",
                    "3M"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "4452-ENGENHARIA MECÂNICA"
                ],
                "txHorarioExtenso": "Terça-feira, das 19:30 às 21:00",
                "vagas": 60,
                "vagasVeterano": 60,
                "vagasBixo": 0,
                "vagasExtra": 0,
                "vagasCentral": 0,
                "incluido": true,
                "nrPredio": "32A",
                "nrSala": "303",
                "professores": null,
                "tpVaga": "V",
                "tpTurma": "N"
            }
        ]
    },
    {
        "retorno": null,
        "mensagem": null,
        "cdDisciplina": 27828,
        "nmNome": "Engenharia Econômica",
        "sgCodicred": "4471X-02",
        "sgCodi": null,
        "sgCred": null,
        "cdNivel": 8,
        "tipoDisciplina": null,
        "idTipoDisciplina": 1,
        "nrCreditosPre": 100,
        "stStatus": null,
        "txCursado": null,
        "txPlanejado": null,
        "txCorequisito": null,
        "cdCoRequisito": null,
        "disciplinasPreRequisito": "",
        "disciplinasSubstitutas": "\n4481A-04 - Analise de Investimentos - Eq\n44786-02 - Engenharia Econômica I\n4110R-04 - Matemática Financeira",
        "disciplinasCoRequisitos": "",
        "disciplinasRequisitosEspeciais": "",
        "tipoRequisito": [
            "SUB"
        ],
        "turmas": [
            {
                "cdDisciplina": 27828,
                "idTurmaAluno": 0,
                "idTurma": 2182,
                "stMatricula": null,
                "codigo": 480,
                "txHorario": "2JK ",
                "horario": [
                    "2J",
                    "2K"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "4451-ENGENHARIA CIVIL",
                    "4450-ENGENHARIA DE COMPUTAÇÃO",
                    "4455-ENGENHARIA DE CONTROLE E AUTOMAÇÃO",
                    "4463-ENGENHARIA DE CONTROLE E AUTOMAÇÃO",
                    "4457-ENGENHARIA DE PRODUÇÃO",
                    "4458-ENGENHARIA DE PRODUÇÃO",
                    "4453-ENGENHARIA ELÉTRICA",
                    "4459-ENGENHARIA ELÉTRICA",
                    "4464-ENGENHARIA ELÉTRICA - LF ELETRÔNICA",
                    "4465-ENGENHARIA ELÉTRICA - LF EM SISTEMAS DE ENERGIA ELÉTRICA",
                    "4452-ENGENHARIA MECÂNICA"
                ],
                "txHorarioExtenso": "Segunda-feira, das 17:35 às 19:29",
                "vagas": 60,
                "vagasVeterano": 60,
                "vagasBixo": 0,
                "vagasExtra": 0,
                "vagasCentral": 0,
                "incluido": null,
                "nrPredio": "30D",
                "nrSala": "210",
                "professores": null,
                "tpVaga": "V",
                "tpTurma": "N"
            },
            {
                "cdDisciplina": 27828,
                "idTurmaAluno": 0,
                "idTurma": 2185,
                "stMatricula": null,
                "codigo": 450,
                "txHorario": "3NP ",
                "horario": [
                    "3N",
                    "3P"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "4451-ENGENHARIA CIVIL",
                    "4450-ENGENHARIA DE COMPUTAÇÃO",
                    "4455-ENGENHARIA DE CONTROLE E AUTOMAÇÃO",
                    "4463-ENGENHARIA DE CONTROLE E AUTOMAÇÃO",
                    "4457-ENGENHARIA DE PRODUÇÃO",
                    "4458-ENGENHARIA DE PRODUÇÃO",
                    "4453-ENGENHARIA ELÉTRICA",
                    "4459-ENGENHARIA ELÉTRICA",
                    "4464-ENGENHARIA ELÉTRICA - LF ELETRÔNICA",
                    "4465-ENGENHARIA ELÉTRICA - LF EM SISTEMAS DE ENERGIA ELÉTRICA",
                    "4452-ENGENHARIA MECÂNICA"
                ],
                "txHorarioExtenso": "Terça-feira, das 21:15 às 22:45",
                "vagas": 60,
                "vagasVeterano": 60,
                "vagasBixo": 0,
                "vagasExtra": 0,
                "vagasCentral": 0,
                "incluido": null,
                "nrPredio": "30D",
                "nrSala": "205",
                "professores": null,
                "tpVaga": "V",
                "tpTurma": "N"
            },
            {
                "cdDisciplina": 27828,
                "idTurmaAluno": 0,
                "idTurma": 2183,
                "stMatricula": null,
                "codigo": 470,
                "txHorario": "6LM ",
                "horario": [
                    "6L",
                    "6M"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "4451-ENGENHARIA CIVIL",
                    "4450-ENGENHARIA DE COMPUTAÇÃO",
                    "4455-ENGENHARIA DE CONTROLE E AUTOMAÇÃO",
                    "4463-ENGENHARIA DE CONTROLE E AUTOMAÇÃO",
                    "4457-ENGENHARIA DE PRODUÇÃO",
                    "4458-ENGENHARIA DE PRODUÇÃO",
                    "4453-ENGENHARIA ELÉTRICA",
                    "4459-ENGENHARIA ELÉTRICA",
                    "4464-ENGENHARIA ELÉTRICA - LF ELETRÔNICA",
                    "4465-ENGENHARIA ELÉTRICA - LF EM SISTEMAS DE ENERGIA ELÉTRICA",
                    "4452-ENGENHARIA MECÂNICA"
                ],
                "txHorarioExtenso": "Sexta-feira, das 19:30 às 21:00",
                "vagas": 60,
                "vagasVeterano": 60,
                "vagasBixo": 0,
                "vagasExtra": 0,
                "vagasCentral": 0,
                "incluido": null,
                "nrPredio": "30D",
                "nrSala": "203",
                "professores": null,
                "tpVaga": "V",
                "tpTurma": "N"
            },
            {
                "cdDisciplina": 27828,
                "idTurmaAluno": 0,
                "idTurma": 2186,
                "stMatricula": null,
                "codigo": 390,
                "txHorario": "6JK ",
                "horario": [
                    "6J",
                    "6K"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "4451-ENGENHARIA CIVIL",
                    "4450-ENGENHARIA DE COMPUTAÇÃO",
                    "4455-ENGENHARIA DE CONTROLE E AUTOMAÇÃO",
                    "4463-ENGENHARIA DE CONTROLE E AUTOMAÇÃO",
                    "4457-ENGENHARIA DE PRODUÇÃO",
                    "4458-ENGENHARIA DE PRODUÇÃO",
                    "4453-ENGENHARIA ELÉTRICA",
                    "4459-ENGENHARIA ELÉTRICA",
                    "4464-ENGENHARIA ELÉTRICA - LF ELETRÔNICA",
                    "4465-ENGENHARIA ELÉTRICA - LF EM SISTEMAS DE ENERGIA ELÉTRICA",
                    "4452-ENGENHARIA MECÂNICA"
                ],
                "txHorarioExtenso": "Sexta-feira, das 17:35 às 19:29",
                "vagas": 60,
                "vagasVeterano": 60,
                "vagasBixo": 0,
                "vagasExtra": 0,
                "vagasCentral": 0,
                "incluido": null,
                "nrPredio": "30D",
                "nrSala": "207",
                "professores": null,
                "tpVaga": "V",
                "tpTurma": "N"
            },
            {
                "cdDisciplina": 27828,
                "idTurmaAluno": 0,
                "idTurma": 2184,
                "stMatricula": null,
                "codigo": 460,
                "txHorario": "5LM ",
                "horario": [
                    "5L",
                    "5M"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "4451-ENGENHARIA CIVIL",
                    "4450-ENGENHARIA DE COMPUTAÇÃO",
                    "4455-ENGENHARIA DE CONTROLE E AUTOMAÇÃO",
                    "4463-ENGENHARIA DE CONTROLE E AUTOMAÇÃO",
                    "4457-ENGENHARIA DE PRODUÇÃO",
                    "4458-ENGENHARIA DE PRODUÇÃO",
                    "4453-ENGENHARIA ELÉTRICA",
                    "4459-ENGENHARIA ELÉTRICA",
                    "4464-ENGENHARIA ELÉTRICA - LF ELETRÔNICA",
                    "4465-ENGENHARIA ELÉTRICA - LF EM SISTEMAS DE ENERGIA ELÉTRICA",
                    "4452-ENGENHARIA MECÂNICA"
                ],
                "txHorarioExtenso": "Quinta-feira, das 19:30 às 21:00",
                "vagas": 60,
                "vagasVeterano": 60,
                "vagasBixo": 0,
                "vagasExtra": 0,
                "vagasCentral": 0,
                "incluido": null,
                "nrPredio": "30D",
                "nrSala": "205",
                "professores": null,
                "tpVaga": "V",
                "tpTurma": "N"
            },
            {
                "cdDisciplina": 27828,
                "idTurmaAluno": 0,
                "idTurma": 2187,
                "stMatricula": null,
                "codigo": 350,
                "txHorario": "4NP ",
                "horario": [
                    "4N",
                    "4P"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "4451-ENGENHARIA CIVIL",
                    "4450-ENGENHARIA DE COMPUTAÇÃO",
                    "4455-ENGENHARIA DE CONTROLE E AUTOMAÇÃO",
                    "4463-ENGENHARIA DE CONTROLE E AUTOMAÇÃO",
                    "4457-ENGENHARIA DE PRODUÇÃO",
                    "4458-ENGENHARIA DE PRODUÇÃO",
                    "4453-ENGENHARIA ELÉTRICA",
                    "4459-ENGENHARIA ELÉTRICA",
                    "4464-ENGENHARIA ELÉTRICA - LF ELETRÔNICA",
                    "4465-ENGENHARIA ELÉTRICA - LF EM SISTEMAS DE ENERGIA ELÉTRICA",
                    "4452-ENGENHARIA MECÂNICA"
                ],
                "txHorarioExtenso": "Quarta-feira, das 21:15 às 22:45",
                "vagas": 60,
                "vagasVeterano": 60,
                "vagasBixo": 0,
                "vagasExtra": 0,
                "vagasCentral": 0,
                "incluido": null,
                "nrPredio": "30D",
                "nrSala": "205",
                "professores": null,
                "tpVaga": "V",
                "tpTurma": "N"
            }
        ]
    },
    {
        "retorno": null,
        "mensagem": null,
        "cdDisciplina": 7013,
        "nmNome": "Gestão Empresarial Para Engenharia",
        "sgCodicred": "44721-02",
        "sgCodi": null,
        "sgCred": null,
        "cdNivel": 6,
        "tipoDisciplina": null,
        "idTipoDisciplina": 1,
        "nrCreditosPre": 100,
        "stStatus": null,
        "txCursado": null,
        "txPlanejado": null,
        "txCorequisito": null,
        "cdCoRequisito": null,
        "disciplinasPreRequisito": "",
        "disciplinasSubstitutas": "\n4481E-04 - Avaliacao Economica de Projetos",
        "disciplinasCoRequisitos": "",
        "disciplinasRequisitosEspeciais": "",
        "tipoRequisito": [
            "SUB"
        ],
        "turmas": [
            {
                "cdDisciplina": 7013,
                "idTurmaAluno": 0,
                "idTurma": 505,
                "stMatricula": null,
                "codigo": 480,
                "txHorario": "6JK ",
                "horario": [
                    "6J",
                    "6K"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "4451-ENGENHARIA CIVIL",
                    "4450-ENGENHARIA DE COMPUTAÇÃO",
                    "4447-ENGENHARIA DE CONTROLE E AUTOMAÇÃO",
                    "4455-ENGENHARIA DE CONTROLE E AUTOMAÇÃO",
                    "4457-ENGENHARIA DE PRODUÇÃO",
                    "4458-ENGENHARIA DE PRODUÇÃO",
                    "4630-ENGENHARIA DE SOFTWARE",
                    "4453-ENGENHARIA ELÉTRICA",
                    "4459-ENGENHARIA ELÉTRICA",
                    "4443-ENGENHARIA ELÉTRICA /E1-ELETRÔNICA",
                    "4446-ENGENHARIA ELÉTRICA /E2-ELETROTÉCNICA",
                    "4445-ENGENHARIA ELÉTRICA/E3-COMPUTADORES",
                    "4449-ENGENHARIA ELÉTRICA/E4.TELECOMUNICAÇÕES",
                    "4442-ENGENHARIA MECÂNICA",
                    "4452-ENGENHARIA MECÂNICA"
                ],
                "txHorarioExtenso": "Sexta-feira, das 17:35 às 19:29",
                "vagas": 60,
                "vagasVeterano": 60,
                "vagasBixo": 0,
                "vagasExtra": 0,
                "vagasCentral": 0,
                "incluido": null,
                "nrPredio": "32A",
                "nrSala": "307",
                "professores": null,
                "tpVaga": "V",
                "tpTurma": "N"
            },
            {
                "cdDisciplina": 7013,
                "idTurmaAluno": 0,
                "idTurma": 506,
                "stMatricula": null,
                "codigo": 470,
                "txHorario": "5NP ",
                "horario": [
                    "5N",
                    "5P"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "4451-ENGENHARIA CIVIL",
                    "4450-ENGENHARIA DE COMPUTAÇÃO",
                    "4447-ENGENHARIA DE CONTROLE E AUTOMAÇÃO",
                    "4455-ENGENHARIA DE CONTROLE E AUTOMAÇÃO",
                    "4457-ENGENHARIA DE PRODUÇÃO",
                    "4458-ENGENHARIA DE PRODUÇÃO",
                    "4630-ENGENHARIA DE SOFTWARE",
                    "4453-ENGENHARIA ELÉTRICA",
                    "4459-ENGENHARIA ELÉTRICA",
                    "4443-ENGENHARIA ELÉTRICA /E1-ELETRÔNICA",
                    "4446-ENGENHARIA ELÉTRICA /E2-ELETROTÉCNICA",
                    "4445-ENGENHARIA ELÉTRICA/E3-COMPUTADORES",
                    "4449-ENGENHARIA ELÉTRICA/E4.TELECOMUNICAÇÕES",
                    "4442-ENGENHARIA MECÂNICA",
                    "4452-ENGENHARIA MECÂNICA"
                ],
                "txHorarioExtenso": "Quinta-feira, das 21:15 às 22:45",
                "vagas": 57,
                "vagasVeterano": 57,
                "vagasBixo": 0,
                "vagasExtra": 0,
                "vagasCentral": 0,
                "incluido": null,
                "nrPredio": "30D",
                "nrSala": "204",
                "professores": null,
                "tpVaga": "V",
                "tpTurma": "N"
            },
            {
                "cdDisciplina": 7013,
                "idTurmaAluno": 0,
                "idTurma": 504,
                "stMatricula": null,
                "codigo": 490,
                "txHorario": "4LM ",
                "horario": [
                    "4L",
                    "4M"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "4451-ENGENHARIA CIVIL",
                    "4450-ENGENHARIA DE COMPUTAÇÃO",
                    "4447-ENGENHARIA DE CONTROLE E AUTOMAÇÃO",
                    "4455-ENGENHARIA DE CONTROLE E AUTOMAÇÃO",
                    "4457-ENGENHARIA DE PRODUÇÃO",
                    "4458-ENGENHARIA DE PRODUÇÃO",
                    "4630-ENGENHARIA DE SOFTWARE",
                    "4453-ENGENHARIA ELÉTRICA",
                    "4459-ENGENHARIA ELÉTRICA",
                    "4443-ENGENHARIA ELÉTRICA /E1-ELETRÔNICA",
                    "4446-ENGENHARIA ELÉTRICA /E2-ELETROTÉCNICA",
                    "4445-ENGENHARIA ELÉTRICA/E3-COMPUTADORES",
                    "4449-ENGENHARIA ELÉTRICA/E4.TELECOMUNICAÇÕES",
                    "4442-ENGENHARIA MECÂNICA",
                    "4452-ENGENHARIA MECÂNICA"
                ],
                "txHorarioExtenso": "Quarta-feira, das 19:30 às 21:00",
                "vagas": 60,
                "vagasVeterano": 60,
                "vagasBixo": 0,
                "vagasExtra": 0,
                "vagasCentral": 0,
                "incluido": null,
                "nrPredio": "30B",
                "nrSala": "210",
                "professores": null,
                "tpVaga": "V",
                "tpTurma": "N"
            }
        ]
    },
    {
        "retorno": null,
        "mensagem": null,
        "cdDisciplina": 6700,
        "nmNome": "Geração E Utilização Do Vapor",
        "sgCodicred": "44449-04",
        "sgCodi": null,
        "sgCred": null,
        "cdNivel": 9,
        "tipoDisciplina": null,
        "idTipoDisciplina": 1,
        "nrCreditosPre": 0,
        "stStatus": null,
        "txCursado": null,
        "txPlanejado": null,
        "txCorequisito": [
            "10597"
        ],
        "cdCoRequisito": null,
        "disciplinasPreRequisito": "",
        "disciplinasSubstitutas": "\n44640-04 - Tópicos Especiais II - Eca",
        "disciplinasCoRequisitos": "\n4445E-04 - Máquinas Térmicas",
        "disciplinasRequisitosEspeciais": "",
        "tipoRequisito": [
            "COR",
            "SUB"
        ],
        "turmas": [
            {
                "cdDisciplina": 6700,
                "idTurmaAluno": 0,
                "idTurma": 191,
                "stMatricula": null,
                "codigo": 370,
                "txHorario": "2LM 4NP ",
                "horario": [
                    "2L",
                    "2M",
                    "4N",
                    "4P"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "4442-ENGENHARIA MECÂNICA",
                    "4452-ENGENHARIA MECÂNICA"
                ],
                "txHorarioExtenso": "Segunda-feira, das 19:30 às 21:00 e Quarta-feira, das 21:15 às 22:45",
                "vagas": 60,
                "vagasVeterano": 60,
                "vagasBixo": 0,
                "vagasExtra": 0,
                "vagasCentral": 0,
                "incluido": null,
                "nrPredio": "30B",
                "nrSala": "203",
                "professores": null,
                "tpVaga": "V",
                "tpTurma": "N"
            }
        ]
    },
    {
        "retorno": null,
        "mensagem": null,
        "cdDisciplina": 10606,
        "nmNome": "Controle Hidráulico E Pneumático",
        "sgCodicred": "4445R-04",
        "sgCodi": null,
        "sgCred": null,
        "cdNivel": 9,
        "tipoDisciplina": null,
        "idTipoDisciplina": 1,
        "nrCreditosPre": 0,
        "stStatus": null,
        "txCursado": null,
        "txPlanejado": null,
        "txCorequisito": [
            "6712"
        ],
        "cdCoRequisito": null,
        "disciplinasPreRequisito": "",
        "disciplinasSubstitutas": "",
        "disciplinasCoRequisitos": "\n4444L-04 - Mecânica dos Fluidos",
        "disciplinasRequisitosEspeciais": "",
        "tipoRequisito": [
            "COR",
            "SUB"
        ],
        "turmas": [
            {
                "cdDisciplina": 10606,
                "idTurmaAluno": 0,
                "idTurma": 281,
                "stMatricula": null,
                "codigo": 370,
                "txHorario": "2LM 3LM ",
                "horario": [
                    "2L",
                    "2M",
                    "3L",
                    "3M"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "4447-ENGENHARIA DE CONTROLE E AUTOMAÇÃO",
                    "4455-ENGENHARIA DE CONTROLE E AUTOMAÇÃO",
                    "4442-ENGENHARIA MECÂNICA",
                    "4452-ENGENHARIA MECÂNICA"
                ],
                "txHorarioExtenso": "Segunda-feira, das 19:30 às 21:00 e Terça-feira, das 19:30 às 21:00",
                "vagas": 20,
                "vagasVeterano": 20,
                "vagasBixo": 0,
                "vagasExtra": 0,
                "vagasCentral": 0,
                "incluido": null,
                "nrPredio": "30F",
                "nrSala": "117",
                "professores": null,
                "tpVaga": "V",
                "tpTurma": "N"
            },
            {
                "cdDisciplina": 10606,
                "idTurmaAluno": 0,
                "idTurma": 282,
                "stMatricula": null,
                "codigo": 360,
                "txHorario": "3JKLM ",
                "horario": [
                    "3J",
                    "3K",
                    "3L",
                    "3M"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "4447-ENGENHARIA DE CONTROLE E AUTOMAÇÃO",
                    "4455-ENGENHARIA DE CONTROLE E AUTOMAÇÃO",
                    "4442-ENGENHARIA MECÂNICA",
                    "4452-ENGENHARIA MECÂNICA"
                ],
                "txHorarioExtenso": "Terça-feira, das 17:35 às 21:00",
                "vagas": 20,
                "vagasVeterano": 20,
                "vagasBixo": 0,
                "vagasExtra": 0,
                "vagasCentral": 0,
                "incluido": null,
                "nrPredio": "30F",
                "nrSala": "117",
                "professores": null,
                "tpVaga": "V",
                "tpTurma": "N"
            },
            {
                "cdDisciplina": 10606,
                "idTurmaAluno": 0,
                "idTurma": 283,
                "stMatricula": null,
                "codigo": 350,
                "txHorario": "3LM 4NP ",
                "horario": [
                    "3L",
                    "3M",
                    "4N",
                    "4P"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "4447-ENGENHARIA DE CONTROLE E AUTOMAÇÃO",
                    "4455-ENGENHARIA DE CONTROLE E AUTOMAÇÃO",
                    "4442-ENGENHARIA MECÂNICA",
                    "4452-ENGENHARIA MECÂNICA"
                ],
                "txHorarioExtenso": "Terça-feira, das 19:30 às 21:00 e Quarta-feira, das 21:15 às 22:45",
                "vagas": 20,
                "vagasVeterano": 20,
                "vagasBixo": 0,
                "vagasExtra": 0,
                "vagasCentral": 0,
                "incluido": null,
                "nrPredio": "30D",
                "nrSala": "203",
                "professores": null,
                "tpVaga": "V",
                "tpTurma": "N"
            }
        ]
    },
    {
        "retorno": null,
        "mensagem": null,
        "cdDisciplina": 13451,
        "nmNome": "Humanismo E Cultura Religiosa",
        "sgCodicred": "11521-04",
        "sgCodi": null,
        "sgCred": null,
        "cdNivel": 5,
        "tipoDisciplina": null,
        "idTipoDisciplina": 1,
        "nrCreditosPre": 0,
        "stStatus": null,
        "txCursado": null,
        "txPlanejado": null,
        "txCorequisito": null,
        "cdCoRequisito": null,
        "disciplinasPreRequisito": "",
        "disciplinasSubstitutas": "\n11501-02 - Cultura Religiosa I\n11502-02 - Cultura Religiosa II",
        "disciplinasCoRequisitos": "",
        "disciplinasRequisitosEspeciais": "",
        "tipoRequisito": [
            "SUB"
        ],
        "turmas": [
            {
                "cdDisciplina": 13451,
                "idTurmaAluno": 0,
                "idTurma": 638,
                "stMatricula": null,
                "codigo": 128,
                "txHorario": "2EE1 4EE1 ",
                "horario": [
                    "2E",
                    "2E1",
                    "4E",
                    "4E1"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "4804-ARQUITETURA E URBANISMO",
                    "4604-CIÊNCIA DA COMPUTAÇÃO",
                    "4605-CIÊNCIA DA COMPUTAÇÃO",
                    "4606-CIÊNCIA DA COMPUTAÇÃO",
                    "4710-CIÊNCIAS AERONÁUTICAS (B)",
                    "4711-CIÊNCIAS AERONÁUTICAS (B)",
                    "4451-ENGENHARIA CIVIL",
                    "4450-ENGENHARIA DE COMPUTAÇÃO",
                    "4447-ENGENHARIA DE CONTROLE E AUTOMAÇÃO",
                    "4455-ENGENHARIA DE CONTROLE E AUTOMAÇÃO",
                    "4463-ENGENHARIA DE CONTROLE E AUTOMAÇÃO",
                    "4457-ENGENHARIA DE PRODUÇÃO",
                    "4458-ENGENHARIA DE PRODUÇÃO",
                    "4630-ENGENHARIA DE SOFTWARE",
                    "4453-ENGENHARIA ELÉTRICA",
                    "4459-ENGENHARIA ELÉTRICA",
                    "4464-ENGENHARIA ELÉTRICA - LF ELETRÔNICA",
                    "4465-ENGENHARIA ELÉTRICA - LF EM SISTEMAS DE ENERGIA ELÉTRICA",
                    "4443-ENGENHARIA ELÉTRICA /E1-ELETRÔNICA",
                    "4446-ENGENHARIA ELÉTRICA /E2-ELETROTÉCNICA",
                    "4445-ENGENHARIA ELÉTRICA/E3-COMPUTADORES",
                    "4449-ENGENHARIA ELÉTRICA/E4.TELECOMUNICAÇÕES",
                    "4442-ENGENHARIA MECÂNICA",
                    "4452-ENGENHARIA MECÂNICA",
                    "4454-ENGENHARIA QUÍMICA",
                    "4456-ENGENHARIA QUÍMICA",
                    "4622-SISTEMAS DE INFORMAÇÃO",
                    "4623-SISTEMAS DE INFORMAÇÃO",
                    "4624-SISTEMAS DE INFORMAÇÃO"
                ],
                "txHorarioExtenso": "Segunda-feira, das 11:35 às  e Quarta-feira, das 11:35 às ",
                "vagas": 60,
                "vagasVeterano": 60,
                "vagasBixo": 0,
                "vagasExtra": 0,
                "vagasCentral": 0,
                "incluido": null,
                "nrPredio": "32A",
                "nrSala": "313",
                "professores": null,
                "tpVaga": "V",
                "tpTurma": "N"
            },
            {
                "cdDisciplina": 13451,
                "idTurmaAluno": 0,
                "idTurma": 626,
                "stMatricula": null,
                "codigo": 257,
                "txHorario": "6LMNP ",
                "horario": [
                    "6L",
                    "6M",
                    "6N",
                    "6P"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "120L-CURSO SUPERIOR DE TECNOLOGIA EM ESCRITA CRIATIVA",
                    "120J-LETRAS - INGLÊS",
                    "120H-LETRAS - PORTUGUÊS"
                ],
                "txHorarioExtenso": "Sexta-feira, das 19:30 às 22:45",
                "vagas": 0,
                "vagasVeterano": 60,
                "vagasBixo": 0,
                "vagasExtra": 0,
                "vagasCentral": 0,
                "incluido": null,
                "nrPredio": "08A",
                "nrSala": "231",
                "professores": null,
                "tpVaga": "C",
                "tpTurma": "N"
            },
            {
                "cdDisciplina": 13451,
                "idTurmaAluno": 0,
                "idTurma": 620,
                "stMatricula": null,
                "codigo": 450,
                "txHorario": "6LMNP ",
                "horario": [
                    "6L",
                    "6M",
                    "6N",
                    "6P"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "4804-ARQUITETURA E URBANISMO",
                    "4604-CIÊNCIA DA COMPUTAÇÃO",
                    "4605-CIÊNCIA DA COMPUTAÇÃO",
                    "4606-CIÊNCIA DA COMPUTAÇÃO",
                    "4710-CIÊNCIAS AERONÁUTICAS (B)",
                    "4711-CIÊNCIAS AERONÁUTICAS (B)",
                    "4451-ENGENHARIA CIVIL",
                    "4450-ENGENHARIA DE COMPUTAÇÃO",
                    "4447-ENGENHARIA DE CONTROLE E AUTOMAÇÃO",
                    "4455-ENGENHARIA DE CONTROLE E AUTOMAÇÃO",
                    "4463-ENGENHARIA DE CONTROLE E AUTOMAÇÃO",
                    "4457-ENGENHARIA DE PRODUÇÃO",
                    "4458-ENGENHARIA DE PRODUÇÃO",
                    "4630-ENGENHARIA DE SOFTWARE",
                    "4453-ENGENHARIA ELÉTRICA",
                    "4459-ENGENHARIA ELÉTRICA",
                    "4464-ENGENHARIA ELÉTRICA - LF ELETRÔNICA",
                    "4465-ENGENHARIA ELÉTRICA - LF EM SISTEMAS DE ENERGIA ELÉTRICA",
                    "4443-ENGENHARIA ELÉTRICA /E1-ELETRÔNICA",
                    "4446-ENGENHARIA ELÉTRICA /E2-ELETROTÉCNICA",
                    "4445-ENGENHARIA ELÉTRICA/E3-COMPUTADORES",
                    "4449-ENGENHARIA ELÉTRICA/E4.TELECOMUNICAÇÕES",
                    "4442-ENGENHARIA MECÂNICA",
                    "4452-ENGENHARIA MECÂNICA",
                    "4454-ENGENHARIA QUÍMICA",
                    "4456-ENGENHARIA QUÍMICA",
                    "4622-SISTEMAS DE INFORMAÇÃO",
                    "4623-SISTEMAS DE INFORMAÇÃO",
                    "4624-SISTEMAS DE INFORMAÇÃO"
                ],
                "txHorarioExtenso": "Sexta-feira, das 19:30 às 22:45",
                "vagas": 60,
                "vagasVeterano": 60,
                "vagasBixo": 0,
                "vagasExtra": 0,
                "vagasCentral": 0,
                "incluido": null,
                "nrPredio": "50A",
                "nrSala": "402",
                "professores": null,
                "tpVaga": "V",
                "tpTurma": "N"
            },
            {
                "cdDisciplina": 13451,
                "idTurmaAluno": 0,
                "idTurma": 625,
                "stMatricula": null,
                "codigo": 259,
                "txHorario": "2JK 4JK ",
                "horario": [
                    "2J",
                    "2K",
                    "4J",
                    "4K"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "151A-CIÊNCIAS SOCIAIS",
                    "151B-CIÊNCIAS SOCIAIS",
                    "2355-COMUNICAÇÃO SOCIAL/JORNALISMO M",
                    "2341-COMUNICAÇÃO SOCIAL/JORNALISMO. N",
                    "2342-COMUNICAÇÃO SOCIAL/RELAÇÕES PUBLICAS",
                    "2346-COMUNICAÇÃO SOCIAL/RELAÇÕES PÚBLICAS",
                    "2348-COMUNICAÇÃO SOCIAL/RELAÇÕES PÚBLICAS",
                    "2352-COMUNICAÇÃO SOCIAL/RELAÇÕES PÚBLICAS",
                    "2318-CURSO SUPERIOR DE TECNOLOGIA EM PRODUÇÃO AUDIOVISUAL",
                    "2337-DESIGN - LF EM DESIGN DE COMUNICAÇÃO",
                    "2338-DESIGN - LF EM DESIGN DE PRODUTO",
                    "4211-FÍSICA - LF FÍSICA MÉDICA",
                    "4213-FÍSICA - LF GEOFÍSICA",
                    "4212-FÍSICA - LICENCIATURA",
                    "234A-JORNALISMO",
                    "234B-JORNALISMO",
                    "120H-LETRAS - PORTUGUÊS",
                    "234C-PUBLICIDADE E PROPAGANDA",
                    "234D-PUBLICIDADE E PROPAGANDA",
                    "234E-RELAÇÕES PÚBLICAS",
                    "234F-RELAÇÕES PÚBLICAS"
                ],
                "txHorarioExtenso": "Segunda-feira, das 17:35 às 19:29 e Quarta-feira, das 17:35 às 19:29",
                "vagas": 0,
                "vagasVeterano": 60,
                "vagasBixo": 0,
                "vagasExtra": 0,
                "vagasCentral": 0,
                "incluido": null,
                "nrPredio": "07A",
                "nrSala": "314",
                "professores": null,
                "tpVaga": "C",
                "tpTurma": "N"
            },
            {
                "cdDisciplina": 13451,
                "idTurmaAluno": 0,
                "idTurma": 641,
                "stMatricula": null,
                "codigo": 390,
                "txHorario": "4ABCD ",
                "horario": [
                    "4A",
                    "4B",
                    "4C",
                    "4D"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "3205-ODONTOLOGIA"
                ],
                "txHorarioExtenso": "Quarta-feira, das 08:00 às 11:30",
                "vagas": 0,
                "vagasVeterano": 60,
                "vagasBixo": 0,
                "vagasExtra": 0,
                "vagasCentral": 0,
                "incluido": null,
                "nrPredio": "50A",
                "nrSala": "403",
                "professores": null,
                "tpVaga": "C",
                "tpTurma": "N"
            },
            {
                "cdDisciplina": 13451,
                "idTurmaAluno": 0,
                "idTurma": 619,
                "stMatricula": null,
                "codigo": 458,
                "txHorario": "3FGHI ",
                "horario": [
                    "3F",
                    "3G",
                    "3H",
                    "3I"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "2436-DIREITO"
                ],
                "txHorarioExtenso": "Terça-feira, das 14:00 às 17:30",
                "vagas": 0,
                "vagasVeterano": 60,
                "vagasBixo": 0,
                "vagasExtra": 0,
                "vagasCentral": 0,
                "incluido": null,
                "nrPredio": "11A",
                "nrSala": "712",
                "professores": null,
                "tpVaga": "C",
                "tpTurma": "N"
            },
            {
                "cdDisciplina": 13451,
                "idTurmaAluno": 0,
                "idTurma": 618,
                "stMatricula": null,
                "codigo": 459,
                "txHorario": "3AB 5CD ",
                "horario": [
                    "3A",
                    "3B",
                    "5C",
                    "5D"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "2425-DIREITO"
                ],
                "txHorarioExtenso": "Terça-feira, das 08:00 às 09:40 e Quinta-feira, das 09:50 às 11:30",
                "vagas": 0,
                "vagasVeterano": 60,
                "vagasBixo": 0,
                "vagasExtra": 0,
                "vagasCentral": 0,
                "incluido": null,
                "nrPredio": "11A",
                "nrSala": "604",
                "professores": null,
                "tpVaga": "C",
                "tpTurma": "N"
            },
            {
                "cdDisciplina": 13451,
                "idTurmaAluno": 0,
                "idTurma": 617,
                "stMatricula": null,
                "codigo": 460,
                "txHorario": "5LMNP ",
                "horario": [
                    "5L",
                    "5M",
                    "5N",
                    "5P"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "4804-ARQUITETURA E URBANISMO",
                    "4604-CIÊNCIA DA COMPUTAÇÃO",
                    "4605-CIÊNCIA DA COMPUTAÇÃO",
                    "4606-CIÊNCIA DA COMPUTAÇÃO",
                    "4710-CIÊNCIAS AERONÁUTICAS (B)",
                    "4711-CIÊNCIAS AERONÁUTICAS (B)",
                    "4451-ENGENHARIA CIVIL",
                    "4450-ENGENHARIA DE COMPUTAÇÃO",
                    "4447-ENGENHARIA DE CONTROLE E AUTOMAÇÃO",
                    "4455-ENGENHARIA DE CONTROLE E AUTOMAÇÃO",
                    "4463-ENGENHARIA DE CONTROLE E AUTOMAÇÃO",
                    "4457-ENGENHARIA DE PRODUÇÃO",
                    "4458-ENGENHARIA DE PRODUÇÃO",
                    "4630-ENGENHARIA DE SOFTWARE",
                    "4453-ENGENHARIA ELÉTRICA",
                    "4459-ENGENHARIA ELÉTRICA",
                    "4464-ENGENHARIA ELÉTRICA - LF ELETRÔNICA",
                    "4465-ENGENHARIA ELÉTRICA - LF EM SISTEMAS DE ENERGIA ELÉTRICA",
                    "4443-ENGENHARIA ELÉTRICA /E1-ELETRÔNICA",
                    "4446-ENGENHARIA ELÉTRICA /E2-ELETROTÉCNICA",
                    "4445-ENGENHARIA ELÉTRICA/E3-COMPUTADORES",
                    "4449-ENGENHARIA ELÉTRICA/E4.TELECOMUNICAÇÕES",
                    "4442-ENGENHARIA MECÂNICA",
                    "4452-ENGENHARIA MECÂNICA",
                    "4454-ENGENHARIA QUÍMICA",
                    "4456-ENGENHARIA QUÍMICA",
                    "4622-SISTEMAS DE INFORMAÇÃO",
                    "4623-SISTEMAS DE INFORMAÇÃO",
                    "4624-SISTEMAS DE INFORMAÇÃO"
                ],
                "txHorarioExtenso": "Quinta-feira, das 19:30 às 22:45",
                "vagas": 60,
                "vagasVeterano": 60,
                "vagasBixo": 0,
                "vagasExtra": 0,
                "vagasCentral": 0,
                "incluido": null,
                "nrPredio": "50A",
                "nrSala": "413",
                "professores": null,
                "tpVaga": "V",
                "tpTurma": "N"
            },
            {
                "cdDisciplina": 13451,
                "idTurmaAluno": 0,
                "idTurma": 637,
                "stMatricula": null,
                "codigo": 140,
                "txHorario": "2LM 4LM ",
                "horario": [
                    "2L",
                    "2M",
                    "4L",
                    "4M"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "4804-ARQUITETURA E URBANISMO",
                    "4604-CIÊNCIA DA COMPUTAÇÃO",
                    "4605-CIÊNCIA DA COMPUTAÇÃO",
                    "4606-CIÊNCIA DA COMPUTAÇÃO",
                    "4710-CIÊNCIAS AERONÁUTICAS (B)",
                    "4711-CIÊNCIAS AERONÁUTICAS (B)",
                    "4451-ENGENHARIA CIVIL",
                    "4450-ENGENHARIA DE COMPUTAÇÃO",
                    "4447-ENGENHARIA DE CONTROLE E AUTOMAÇÃO",
                    "4455-ENGENHARIA DE CONTROLE E AUTOMAÇÃO",
                    "4463-ENGENHARIA DE CONTROLE E AUTOMAÇÃO",
                    "4457-ENGENHARIA DE PRODUÇÃO",
                    "4458-ENGENHARIA DE PRODUÇÃO",
                    "4630-ENGENHARIA DE SOFTWARE",
                    "4453-ENGENHARIA ELÉTRICA",
                    "4459-ENGENHARIA ELÉTRICA",
                    "4464-ENGENHARIA ELÉTRICA - LF ELETRÔNICA",
                    "4465-ENGENHARIA ELÉTRICA - LF EM SISTEMAS DE ENERGIA ELÉTRICA",
                    "4443-ENGENHARIA ELÉTRICA /E1-ELETRÔNICA",
                    "4446-ENGENHARIA ELÉTRICA /E2-ELETROTÉCNICA",
                    "4445-ENGENHARIA ELÉTRICA/E3-COMPUTADORES",
                    "4449-ENGENHARIA ELÉTRICA/E4.TELECOMUNICAÇÕES",
                    "4442-ENGENHARIA MECÂNICA",
                    "4452-ENGENHARIA MECÂNICA",
                    "4454-ENGENHARIA QUÍMICA",
                    "4456-ENGENHARIA QUÍMICA",
                    "4622-SISTEMAS DE INFORMAÇÃO",
                    "4623-SISTEMAS DE INFORMAÇÃO",
                    "4624-SISTEMAS DE INFORMAÇÃO"
                ],
                "txHorarioExtenso": "Segunda-feira, das 19:30 às 21:00 e Quarta-feira, das 19:30 às 21:00",
                "vagas": 60,
                "vagasVeterano": 60,
                "vagasBixo": 0,
                "vagasExtra": 0,
                "vagasCentral": 0,
                "incluido": null,
                "nrPredio": "50A",
                "nrSala": "408",
                "professores": null,
                "tpVaga": "V",
                "tpTurma": "N"
            },
            {
                "cdDisciplina": 13451,
                "idTurmaAluno": 0,
                "idTurma": 624,
                "stMatricula": null,
                "codigo": 269,
                "txHorario": "3JK 5JK ",
                "horario": [
                    "3J",
                    "3K",
                    "5J",
                    "5K"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "151A-CIÊNCIAS SOCIAIS",
                    "151B-CIÊNCIAS SOCIAIS",
                    "2355-COMUNICAÇÃO SOCIAL/JORNALISMO M",
                    "2341-COMUNICAÇÃO SOCIAL/JORNALISMO. N",
                    "2342-COMUNICAÇÃO SOCIAL/RELAÇÕES PUBLICAS",
                    "2346-COMUNICAÇÃO SOCIAL/RELAÇÕES PÚBLICAS",
                    "2348-COMUNICAÇÃO SOCIAL/RELAÇÕES PÚBLICAS",
                    "2352-COMUNICAÇÃO SOCIAL/RELAÇÕES PÚBLICAS",
                    "2318-CURSO SUPERIOR DE TECNOLOGIA EM PRODUÇÃO AUDIOVISUAL",
                    "2337-DESIGN - LF EM DESIGN DE COMUNICAÇÃO",
                    "2338-DESIGN - LF EM DESIGN DE PRODUTO",
                    "4211-FÍSICA - LF FÍSICA MÉDICA",
                    "4213-FÍSICA - LF GEOFÍSICA",
                    "4212-FÍSICA - LICENCIATURA",
                    "234A-JORNALISMO",
                    "234B-JORNALISMO",
                    "120H-LETRAS - PORTUGUÊS",
                    "234C-PUBLICIDADE E PROPAGANDA",
                    "234D-PUBLICIDADE E PROPAGANDA",
                    "234E-RELAÇÕES PÚBLICAS",
                    "234F-RELAÇÕES PÚBLICAS"
                ],
                "txHorarioExtenso": "Terça-feira, das 17:35 às 19:29 e Quinta-feira, das 17:35 às 19:29",
                "vagas": 0,
                "vagasVeterano": 60,
                "vagasBixo": 0,
                "vagasExtra": 0,
                "vagasCentral": 0,
                "incluido": null,
                "nrPredio": "07A",
                "nrSala": "314",
                "professores": null,
                "tpVaga": "C",
                "tpTurma": "N"
            },
            {
                "cdDisciplina": 13451,
                "idTurmaAluno": 0,
                "idTurma": 636,
                "stMatricula": null,
                "codigo": 145,
                "txHorario": "2LMNP ",
                "horario": [
                    "2L",
                    "2M",
                    "2N",
                    "2P"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "250T-ADMINISTRAÇÃO / LF ADMINISTRAÇÃO DE EMPRESAS",
                    "250U-ADMINISTRAÇÃO / LF COMÉRCIO INTERNACIONAL",
                    "250W-ADMINISTRAÇÃO / LF GESTÃO DE TECNOLOGIA DA INFORMAÇÃO",
                    "250X-ADMINISTRAÇÃO / LF MARKETING"
                ],
                "txHorarioExtenso": "Segunda-feira, das 19:30 às 22:45",
                "vagas": 10,
                "vagasVeterano": 50,
                "vagasBixo": 0,
                "vagasExtra": 0,
                "vagasCentral": 10,
                "incluido": null,
                "nrPredio": "50A",
                "nrSala": "608",
                "professores": null,
                "tpVaga": "C",
                "tpTurma": "N"
            },
            {
                "cdDisciplina": 13451,
                "idTurmaAluno": 0,
                "idTurma": 616,
                "stMatricula": null,
                "codigo": 469,
                "txHorario": "3CD 5AB ",
                "horario": [
                    "3C",
                    "3D",
                    "5A",
                    "5B"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "2425-DIREITO"
                ],
                "txHorarioExtenso": "Terça-feira, das 09:50 às 11:30 e Quinta-feira, das 08:00 às 09:40",
                "vagas": 0,
                "vagasVeterano": 60,
                "vagasBixo": 0,
                "vagasExtra": 0,
                "vagasCentral": 0,
                "incluido": null,
                "nrPredio": "11A",
                "nrSala": "514",
                "professores": null,
                "tpVaga": "C",
                "tpTurma": "N"
            },
            {
                "cdDisciplina": 13451,
                "idTurmaAluno": 0,
                "idTurma": 635,
                "stMatricula": null,
                "codigo": 149,
                "txHorario": "6FGHI ",
                "horario": [
                    "6F",
                    "6G",
                    "6H",
                    "6I"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "152C-HISTÓRIA",
                    "152D-HISTÓRIA",
                    "152E-HISTÓRIA",
                    "152F-HISTÓRIA"
                ],
                "txHorarioExtenso": "Sexta-feira, das 14:00 às 17:30",
                "vagas": 0,
                "vagasVeterano": 60,
                "vagasBixo": 0,
                "vagasExtra": 0,
                "vagasCentral": 0,
                "incluido": null,
                "nrPredio": "09A",
                "nrSala": "213",
                "professores": null,
                "tpVaga": "C",
                "tpTurma": "N"
            },
            {
                "cdDisciplina": 13451,
                "idTurmaAluno": 0,
                "idTurma": 615,
                "stMatricula": null,
                "codigo": 470,
                "txHorario": "3NP 4NP ",
                "horario": [
                    "3N",
                    "3P",
                    "4N",
                    "4P"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "4804-ARQUITETURA E URBANISMO",
                    "4604-CIÊNCIA DA COMPUTAÇÃO",
                    "4605-CIÊNCIA DA COMPUTAÇÃO",
                    "4606-CIÊNCIA DA COMPUTAÇÃO",
                    "4710-CIÊNCIAS AERONÁUTICAS (B)",
                    "4711-CIÊNCIAS AERONÁUTICAS (B)",
                    "4451-ENGENHARIA CIVIL",
                    "4450-ENGENHARIA DE COMPUTAÇÃO",
                    "4447-ENGENHARIA DE CONTROLE E AUTOMAÇÃO",
                    "4455-ENGENHARIA DE CONTROLE E AUTOMAÇÃO",
                    "4463-ENGENHARIA DE CONTROLE E AUTOMAÇÃO",
                    "4457-ENGENHARIA DE PRODUÇÃO",
                    "4458-ENGENHARIA DE PRODUÇÃO",
                    "4630-ENGENHARIA DE SOFTWARE",
                    "4453-ENGENHARIA ELÉTRICA",
                    "4459-ENGENHARIA ELÉTRICA",
                    "4464-ENGENHARIA ELÉTRICA - LF ELETRÔNICA",
                    "4465-ENGENHARIA ELÉTRICA - LF EM SISTEMAS DE ENERGIA ELÉTRICA",
                    "4443-ENGENHARIA ELÉTRICA /E1-ELETRÔNICA",
                    "4446-ENGENHARIA ELÉTRICA /E2-ELETROTÉCNICA",
                    "4445-ENGENHARIA ELÉTRICA/E3-COMPUTADORES",
                    "4449-ENGENHARIA ELÉTRICA/E4.TELECOMUNICAÇÕES",
                    "4442-ENGENHARIA MECÂNICA",
                    "4452-ENGENHARIA MECÂNICA",
                    "4454-ENGENHARIA QUÍMICA",
                    "4456-ENGENHARIA QUÍMICA",
                    "4622-SISTEMAS DE INFORMAÇÃO",
                    "4623-SISTEMAS DE INFORMAÇÃO",
                    "4624-SISTEMAS DE INFORMAÇÃO"
                ],
                "txHorarioExtenso": "Terça-feira, das 21:15 às 22:45 e Quarta-feira, das 21:15 às 22:45",
                "vagas": 60,
                "vagasVeterano": 60,
                "vagasBixo": 0,
                "vagasExtra": 0,
                "vagasCentral": 0,
                "incluido": null,
                "nrPredio": "50A",
                "nrSala": "404",
                "professores": null,
                "tpVaga": "V",
                "tpTurma": "N"
            },
            {
                "cdDisciplina": 13451,
                "idTurmaAluno": 0,
                "idTurma": 634,
                "stMatricula": null,
                "codigo": 150,
                "txHorario": "3JK 5JK ",
                "horario": [
                    "3J",
                    "3K",
                    "5J",
                    "5K"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "4804-ARQUITETURA E URBANISMO",
                    "4604-CIÊNCIA DA COMPUTAÇÃO",
                    "4605-CIÊNCIA DA COMPUTAÇÃO",
                    "4606-CIÊNCIA DA COMPUTAÇÃO",
                    "4710-CIÊNCIAS AERONÁUTICAS (B)",
                    "4711-CIÊNCIAS AERONÁUTICAS (B)",
                    "4451-ENGENHARIA CIVIL",
                    "4450-ENGENHARIA DE COMPUTAÇÃO",
                    "4447-ENGENHARIA DE CONTROLE E AUTOMAÇÃO",
                    "4455-ENGENHARIA DE CONTROLE E AUTOMAÇÃO",
                    "4463-ENGENHARIA DE CONTROLE E AUTOMAÇÃO",
                    "4457-ENGENHARIA DE PRODUÇÃO",
                    "4458-ENGENHARIA DE PRODUÇÃO",
                    "4630-ENGENHARIA DE SOFTWARE",
                    "4453-ENGENHARIA ELÉTRICA",
                    "4459-ENGENHARIA ELÉTRICA",
                    "4464-ENGENHARIA ELÉTRICA - LF ELETRÔNICA",
                    "4465-ENGENHARIA ELÉTRICA - LF EM SISTEMAS DE ENERGIA ELÉTRICA",
                    "4443-ENGENHARIA ELÉTRICA /E1-ELETRÔNICA",
                    "4446-ENGENHARIA ELÉTRICA /E2-ELETROTÉCNICA",
                    "4445-ENGENHARIA ELÉTRICA/E3-COMPUTADORES",
                    "4449-ENGENHARIA ELÉTRICA/E4.TELECOMUNICAÇÕES",
                    "4442-ENGENHARIA MECÂNICA",
                    "4452-ENGENHARIA MECÂNICA",
                    "4454-ENGENHARIA QUÍMICA",
                    "4456-ENGENHARIA QUÍMICA",
                    "4622-SISTEMAS DE INFORMAÇÃO",
                    "4623-SISTEMAS DE INFORMAÇÃO",
                    "4624-SISTEMAS DE INFORMAÇÃO"
                ],
                "txHorarioExtenso": "Terça-feira, das 17:35 às 19:29 e Quinta-feira, das 17:35 às 19:29",
                "vagas": 60,
                "vagasVeterano": 60,
                "vagasBixo": 0,
                "vagasExtra": 0,
                "vagasCentral": 0,
                "incluido": null,
                "nrPredio": "50A",
                "nrSala": "402",
                "professores": null,
                "tpVaga": "V",
                "tpTurma": "N"
            },
            {
                "cdDisciplina": 13451,
                "idTurmaAluno": 0,
                "idTurma": 623,
                "stMatricula": null,
                "codigo": 347,
                "txHorario": "2JK 5JK ",
                "horario": [
                    "2J",
                    "2K",
                    "5J",
                    "5K"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "1311-PSICOLOGIA"
                ],
                "txHorarioExtenso": "Segunda-feira, das 17:35 às 19:29 e Quinta-feira, das 17:35 às 19:29",
                "vagas": 0,
                "vagasVeterano": 60,
                "vagasBixo": 0,
                "vagasExtra": 0,
                "vagasCentral": 0,
                "incluido": null,
                "nrPredio": "11A",
                "nrSala": "606",
                "professores": null,
                "tpVaga": "C",
                "tpTurma": "N"
            },
            {
                "cdDisciplina": 13451,
                "idTurmaAluno": 0,
                "idTurma": 612,
                "stMatricula": null,
                "codigo": 670,
                "txHorario": "2ABCD ",
                "horario": [
                    "2A",
                    "2B",
                    "2C",
                    "2D"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "2553-ADMINISTRAÇÃO - LF INOVAÇÃO E EMPREENDEDORISMO",
                    "2556-CIÊNCIAS ECONÔMICAS - LF FINANÇAS"
                ],
                "txHorarioExtenso": "Segunda-feira, das 08:00 às 11:30",
                "vagas": 10,
                "vagasVeterano": 50,
                "vagasBixo": 0,
                "vagasExtra": 0,
                "vagasCentral": 10,
                "incluido": null,
                "nrPredio": "50A",
                "nrSala": "410",
                "professores": null,
                "tpVaga": "C",
                "tpTurma": "N"
            },
            {
                "cdDisciplina": 13451,
                "idTurmaAluno": 0,
                "idTurma": 622,
                "stMatricula": null,
                "codigo": 350,
                "txHorario": "4ABCD ",
                "horario": [
                    "4A",
                    "4B",
                    "4C",
                    "4D"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "3630-CURSO SUPERIOR DE TECNOLOGIA EM GASTRONOMIA"
                ],
                "txHorarioExtenso": "Quarta-feira, das 08:00 às 11:30",
                "vagas": 0,
                "vagasVeterano": 60,
                "vagasBixo": 0,
                "vagasExtra": 0,
                "vagasCentral": 0,
                "incluido": null,
                "nrPredio": "11A",
                "nrSala": "301",
                "professores": null,
                "tpVaga": "C",
                "tpTurma": "N"
            },
            {
                "cdDisciplina": 13451,
                "idTurmaAluno": 0,
                "idTurma": 633,
                "stMatricula": null,
                "codigo": 159,
                "txHorario": "3AB 5CD ",
                "horario": [
                    "3A",
                    "3B",
                    "5C",
                    "5D"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "2425-DIREITO"
                ],
                "txHorarioExtenso": "Terça-feira, das 08:00 às 09:40 e Quinta-feira, das 09:50 às 11:30",
                "vagas": 0,
                "vagasVeterano": 60,
                "vagasBixo": 0,
                "vagasExtra": 0,
                "vagasCentral": 0,
                "incluido": null,
                "nrPredio": "11A",
                "nrSala": "503",
                "professores": null,
                "tpVaga": "C",
                "tpTurma": "N"
            },
            {
                "cdDisciplina": 13451,
                "idTurmaAluno": 0,
                "idTurma": 621,
                "stMatricula": null,
                "codigo": 357,
                "txHorario": "3LM 5LM ",
                "horario": [
                    "3L",
                    "3M",
                    "5L",
                    "5M"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "1311-PSICOLOGIA"
                ],
                "txHorarioExtenso": "Terça-feira, das 19:30 às 21:00 e Quinta-feira, das 19:30 às 21:00",
                "vagas": 0,
                "vagasVeterano": 60,
                "vagasBixo": 0,
                "vagasExtra": 0,
                "vagasCentral": 0,
                "incluido": null,
                "nrPredio": "11A",
                "nrSala": "304",
                "professores": null,
                "tpVaga": "C",
                "tpTurma": "N"
            },
            {
                "cdDisciplina": 13451,
                "idTurmaAluno": 0,
                "idTurma": 632,
                "stMatricula": null,
                "codigo": 168,
                "txHorario": "2LM 4NP ",
                "horario": [
                    "2L",
                    "2M",
                    "4N",
                    "4P"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "4804-ARQUITETURA E URBANISMO",
                    "4604-CIÊNCIA DA COMPUTAÇÃO",
                    "4605-CIÊNCIA DA COMPUTAÇÃO",
                    "4606-CIÊNCIA DA COMPUTAÇÃO",
                    "4710-CIÊNCIAS AERONÁUTICAS (B)",
                    "4711-CIÊNCIAS AERONÁUTICAS (B)",
                    "4451-ENGENHARIA CIVIL",
                    "4450-ENGENHARIA DE COMPUTAÇÃO",
                    "4447-ENGENHARIA DE CONTROLE E AUTOMAÇÃO",
                    "4455-ENGENHARIA DE CONTROLE E AUTOMAÇÃO",
                    "4463-ENGENHARIA DE CONTROLE E AUTOMAÇÃO",
                    "4457-ENGENHARIA DE PRODUÇÃO",
                    "4458-ENGENHARIA DE PRODUÇÃO",
                    "4630-ENGENHARIA DE SOFTWARE",
                    "4453-ENGENHARIA ELÉTRICA",
                    "4459-ENGENHARIA ELÉTRICA",
                    "4464-ENGENHARIA ELÉTRICA - LF ELETRÔNICA",
                    "4465-ENGENHARIA ELÉTRICA - LF EM SISTEMAS DE ENERGIA ELÉTRICA",
                    "4443-ENGENHARIA ELÉTRICA /E1-ELETRÔNICA",
                    "4446-ENGENHARIA ELÉTRICA /E2-ELETROTÉCNICA",
                    "4445-ENGENHARIA ELÉTRICA/E3-COMPUTADORES",
                    "4449-ENGENHARIA ELÉTRICA/E4.TELECOMUNICAÇÕES",
                    "4442-ENGENHARIA MECÂNICA",
                    "4452-ENGENHARIA MECÂNICA",
                    "4454-ENGENHARIA QUÍMICA",
                    "4456-ENGENHARIA QUÍMICA",
                    "4622-SISTEMAS DE INFORMAÇÃO",
                    "4623-SISTEMAS DE INFORMAÇÃO",
                    "4624-SISTEMAS DE INFORMAÇÃO"
                ],
                "txHorarioExtenso": "Segunda-feira, das 19:30 às 21:00 e Quarta-feira, das 21:15 às 22:45",
                "vagas": 60,
                "vagasVeterano": 60,
                "vagasBixo": 0,
                "vagasExtra": 0,
                "vagasCentral": 0,
                "incluido": null,
                "nrPredio": "50A",
                "nrSala": "412",
                "professores": null,
                "tpVaga": "V",
                "tpTurma": "N"
            },
            {
                "cdDisciplina": 13451,
                "idTurmaAluno": 0,
                "idTurma": 631,
                "stMatricula": null,
                "codigo": 169,
                "txHorario": "3CD 5AB ",
                "horario": [
                    "3C",
                    "3D",
                    "5A",
                    "5B"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "2425-DIREITO"
                ],
                "txHorarioExtenso": "Terça-feira, das 09:50 às 11:30 e Quinta-feira, das 08:00 às 09:40",
                "vagas": 0,
                "vagasVeterano": 60,
                "vagasBixo": 0,
                "vagasExtra": 0,
                "vagasCentral": 0,
                "incluido": null,
                "nrPredio": "11A",
                "nrSala": "504",
                "professores": null,
                "tpVaga": "C",
                "tpTurma": "N"
            },
            {
                "cdDisciplina": 13451,
                "idTurmaAluno": 0,
                "idTurma": 628,
                "stMatricula": null,
                "codigo": 240,
                "txHorario": "6ABCD ",
                "horario": [
                    "6A",
                    "6B",
                    "6C",
                    "6D"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "3606-ENFERMAGEM",
                    "3607-ENFERMAGEM"
                ],
                "txHorarioExtenso": "Sexta-feira, das 08:00 às 11:30",
                "vagas": 0,
                "vagasVeterano": 60,
                "vagasBixo": 0,
                "vagasExtra": 0,
                "vagasCentral": 0,
                "incluido": null,
                "nrPredio": "80A",
                "nrSala": "302",
                "professores": null,
                "tpVaga": "C",
                "tpTurma": "N"
            },
            {
                "cdDisciplina": 13451,
                "idTurmaAluno": 0,
                "idTurma": 630,
                "stMatricula": null,
                "codigo": 179,
                "txHorario": "3NP 5LM ",
                "horario": [
                    "3N",
                    "3P",
                    "5L",
                    "5M"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "2415-DIREITO"
                ],
                "txHorarioExtenso": "Terça-feira, das 21:15 às 22:45 e Quinta-feira, das 19:30 às 21:00",
                "vagas": 0,
                "vagasVeterano": 60,
                "vagasBixo": 0,
                "vagasExtra": 0,
                "vagasCentral": 0,
                "incluido": null,
                "nrPredio": "11A",
                "nrSala": "703",
                "professores": null,
                "tpVaga": "C",
                "tpTurma": "N"
            },
            {
                "cdDisciplina": 13451,
                "idTurmaAluno": 0,
                "idTurma": 614,
                "stMatricula": null,
                "codigo": 568,
                "txHorario": "5LMNP ",
                "horario": [
                    "5L",
                    "5M",
                    "5N",
                    "5P"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "255A-ADMINISTRAÇÃO - LF EM ADMINISTRAÇÃO DE EMPRESAS",
                    "255B-ADMINISTRAÇÃO - LF EM LIDERANÇA E GESTÃO DE PESSOAS",
                    "255C-ADMINISTRAÇÃO - LF EM MARKETING",
                    "255D-ADMINISTRAÇÃO - LF EM NEGÓCIOS INTERNACIONAIS",
                    "2554-CIÊNCIAS CONTÁBEIS - LF CONTROLADORIA E TRIBUTOS",
                    "2555-CIÊNCIAS ECONÔMICAS - LF ECONOMIA"
                ],
                "txHorarioExtenso": "Quinta-feira, das 19:30 às 22:45",
                "vagas": 10,
                "vagasVeterano": 50,
                "vagasBixo": 0,
                "vagasExtra": 0,
                "vagasCentral": 10,
                "incluido": null,
                "nrPredio": "50A",
                "nrSala": "807",
                "professores": null,
                "tpVaga": "C",
                "tpTurma": "N"
            },
            {
                "cdDisciplina": 13451,
                "idTurmaAluno": 0,
                "idTurma": 613,
                "stMatricula": null,
                "codigo": 569,
                "txHorario": "3LMNP ",
                "horario": [
                    "3L",
                    "3M",
                    "3N",
                    "3P"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "255A-ADMINISTRAÇÃO - LF EM ADMINISTRAÇÃO DE EMPRESAS",
                    "255B-ADMINISTRAÇÃO - LF EM LIDERANÇA E GESTÃO DE PESSOAS",
                    "255C-ADMINISTRAÇÃO - LF EM MARKETING",
                    "255D-ADMINISTRAÇÃO - LF EM NEGÓCIOS INTERNACIONAIS",
                    "2554-CIÊNCIAS CONTÁBEIS - LF CONTROLADORIA E TRIBUTOS",
                    "2555-CIÊNCIAS ECONÔMICAS - LF ECONOMIA"
                ],
                "txHorarioExtenso": "Terça-feira, das 19:30 às 22:45",
                "vagas": 10,
                "vagasVeterano": 50,
                "vagasBixo": 0,
                "vagasExtra": 0,
                "vagasCentral": 10,
                "incluido": null,
                "nrPredio": "50A",
                "nrSala": "711",
                "professores": null,
                "tpVaga": "C",
                "tpTurma": "N"
            },
            {
                "cdDisciplina": 13451,
                "idTurmaAluno": 0,
                "idTurma": 627,
                "stMatricula": null,
                "codigo": 249,
                "txHorario": "3EE1 5EE1 ",
                "horario": [
                    "3E",
                    "3E1",
                    "5E",
                    "5E1"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "151A-CIÊNCIAS SOCIAIS",
                    "151B-CIÊNCIAS SOCIAIS",
                    "2355-COMUNICAÇÃO SOCIAL/JORNALISMO M",
                    "2341-COMUNICAÇÃO SOCIAL/JORNALISMO. N",
                    "2342-COMUNICAÇÃO SOCIAL/RELAÇÕES PUBLICAS",
                    "2346-COMUNICAÇÃO SOCIAL/RELAÇÕES PÚBLICAS",
                    "2348-COMUNICAÇÃO SOCIAL/RELAÇÕES PÚBLICAS",
                    "2352-COMUNICAÇÃO SOCIAL/RELAÇÕES PÚBLICAS",
                    "2318-CURSO SUPERIOR DE TECNOLOGIA EM PRODUÇÃO AUDIOVISUAL",
                    "2337-DESIGN - LF EM DESIGN DE COMUNICAÇÃO",
                    "2338-DESIGN - LF EM DESIGN DE PRODUTO",
                    "4211-FÍSICA - LF FÍSICA MÉDICA",
                    "4213-FÍSICA - LF GEOFÍSICA",
                    "4212-FÍSICA - LICENCIATURA",
                    "234A-JORNALISMO",
                    "234B-JORNALISMO",
                    "120H-LETRAS - PORTUGUÊS",
                    "234C-PUBLICIDADE E PROPAGANDA",
                    "234D-PUBLICIDADE E PROPAGANDA",
                    "234E-RELAÇÕES PÚBLICAS",
                    "234F-RELAÇÕES PÚBLICAS"
                ],
                "txHorarioExtenso": "Terça-feira, das 11:35 às  e Quinta-feira, das 11:35 às ",
                "vagas": 0,
                "vagasVeterano": 60,
                "vagasBixo": 0,
                "vagasExtra": 0,
                "vagasCentral": 0,
                "incluido": null,
                "nrPredio": "07A",
                "nrSala": "303",
                "professores": null,
                "tpVaga": "C",
                "tpTurma": "N"
            },
            {
                "cdDisciplina": 13451,
                "idTurmaAluno": 0,
                "idTurma": 642,
                "stMatricula": null,
                "codigo": 380,
                "txHorario": "4FGHI ",
                "horario": [
                    "4F",
                    "4G",
                    "4H",
                    "4I"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "3205-ODONTOLOGIA"
                ],
                "txHorarioExtenso": "Quarta-feira, das 14:00 às 17:30",
                "vagas": 0,
                "vagasVeterano": 60,
                "vagasBixo": 0,
                "vagasExtra": 0,
                "vagasCentral": 0,
                "incluido": null,
                "nrPredio": "50A",
                "nrSala": "413",
                "professores": null,
                "tpVaga": "C",
                "tpTurma": "N"
            },
            {
                "cdDisciplina": 13451,
                "idTurmaAluno": 0,
                "idTurma": 629,
                "stMatricula": null,
                "codigo": 189,
                "txHorario": "3LM 5NP ",
                "horario": [
                    "3L",
                    "3M",
                    "5N",
                    "5P"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "2415-DIREITO"
                ],
                "txHorarioExtenso": "Terça-feira, das 19:30 às 21:00 e Quinta-feira, das 21:15 às 22:45",
                "vagas": 0,
                "vagasVeterano": 60,
                "vagasBixo": 0,
                "vagasExtra": 0,
                "vagasCentral": 0,
                "incluido": null,
                "nrPredio": "11A",
                "nrSala": "503",
                "professores": null,
                "tpVaga": "C",
                "tpTurma": "N"
            },
            {
                "cdDisciplina": 13451,
                "idTurmaAluno": 0,
                "idTurma": 640,
                "stMatricula": null,
                "codigo": 125,
                "txHorario": "6LMNP ",
                "horario": [
                    "6L",
                    "6M",
                    "6N",
                    "6P"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "255A-ADMINISTRAÇÃO - LF EM ADMINISTRAÇÃO DE EMPRESAS",
                    "255B-ADMINISTRAÇÃO - LF EM LIDERANÇA E GESTÃO DE PESSOAS",
                    "255C-ADMINISTRAÇÃO - LF EM MARKETING",
                    "255D-ADMINISTRAÇÃO - LF EM NEGÓCIOS INTERNACIONAIS",
                    "2554-CIÊNCIAS CONTÁBEIS - LF CONTROLADORIA E TRIBUTOS",
                    "2555-CIÊNCIAS ECONÔMICAS - LF ECONOMIA"
                ],
                "txHorarioExtenso": "Sexta-feira, das 19:30 às 22:45",
                "vagas": 10,
                "vagasVeterano": 50,
                "vagasBixo": 0,
                "vagasExtra": 0,
                "vagasCentral": 10,
                "incluido": null,
                "nrPredio": "50A",
                "nrSala": "602",
                "professores": null,
                "tpVaga": "C",
                "tpTurma": "N"
            },
            {
                "cdDisciplina": 13451,
                "idTurmaAluno": 0,
                "idTurma": 639,
                "stMatricula": null,
                "codigo": 126,
                "txHorario": "4LM 5LM ",
                "horario": [
                    "4L",
                    "4M",
                    "5L",
                    "5M"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "3510-FARMÁCIA"
                ],
                "txHorarioExtenso": "Quarta-feira, das 19:30 às 21:00 e Quinta-feira, das 19:30 às 21:00",
                "vagas": 0,
                "vagasVeterano": 60,
                "vagasBixo": 0,
                "vagasExtra": 0,
                "vagasCentral": 0,
                "incluido": null,
                "nrPredio": "11A",
                "nrSala": "202",
                "professores": null,
                "tpVaga": "C",
                "tpTurma": "N"
            }
        ]
    },
    {
        "retorno": null,
        "mensagem": null,
        "cdDisciplina": 10630,
        "nmNome": "Eletrônica Básica - Em",
        "sgCodicred": "4453U-02",
        "sgCodi": null,
        "sgCred": null,
        "cdNivel": 6,
        "tipoDisciplina": null,
        "idTipoDisciplina": 1,
        "nrCreditosPre": 0,
        "stStatus": null,
        "txCursado": null,
        "txPlanejado": null,
        "txCorequisito": null,
        "cdCoRequisito": null,
        "disciplinasPreRequisito": "",
        "disciplinasSubstitutas": "\n4452G-04 - Eletrônica Analógica - Ec",
        "disciplinasCoRequisitos": "\n42187-04 - Eletromagnetismo",
        "disciplinasRequisitosEspeciais": "",
        "tipoRequisito": [
            "COR",
            "SUB"
        ],
        "turmas": [
            {
                "cdDisciplina": 10630,
                "idTurmaAluno": 0,
                "idTurma": 493,
                "stMatricula": null,
                "codigo": 480,
                "txHorario": "2NP ",
                "horario": [
                    "2N",
                    "2P"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "4452-ENGENHARIA MECÂNICA"
                ],
                "txHorarioExtenso": "Segunda-feira, das 21:15 às 22:45",
                "vagas": 60,
                "vagasVeterano": 60,
                "vagasBixo": 0,
                "vagasExtra": 0,
                "vagasCentral": 0,
                "incluido": null,
                "nrPredio": "30D",
                "nrSala": "307",
                "professores": null,
                "tpVaga": "V",
                "tpTurma": "N"
            }
        ]
    },
    {
        "retorno": null,
        "mensagem": null,
        "cdDisciplina": 6705,
        "nmNome": "Fundição",
        "sgCodicred": "4444D-02",
        "sgCodi": null,
        "sgCred": null,
        "cdNivel": 4,
        "tipoDisciplina": null,
        "idTipoDisciplina": 1,
        "nrCreditosPre": 0,
        "stStatus": null,
        "txCursado": null,
        "txPlanejado": null,
        "txCorequisito": null,
        "cdCoRequisito": null,
        "disciplinasPreRequisito": "",
        "disciplinasSubstitutas": "\n4446H-02 - Processos de Soldagem e Fundição",
        "disciplinasCoRequisitos": "",
        "disciplinasRequisitosEspeciais": "\n4444A-04 - Materiais Metálicos",
        "tipoRequisito": [
            "ESP",
            "SUB"
        ],
        "turmas": [
            {
                "cdDisciplina": 6705,
                "idTurmaAluno": 0,
                "idTurma": 720,
                "stMatricula": null,
                "codigo": 370,
                "txHorario": "2LM ",
                "horario": [
                    "2L",
                    "2M"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "4442-ENGENHARIA MECÂNICA",
                    "4452-ENGENHARIA MECÂNICA"
                ],
                "txHorarioExtenso": "Segunda-feira, das 19:30 às 21:00",
                "vagas": 60,
                "vagasVeterano": 60,
                "vagasBixo": 0,
                "vagasExtra": 0,
                "vagasCentral": 0,
                "incluido": null,
                "nrPredio": "30C",
                "nrSala": "307",
                "professores": null,
                "tpVaga": "V",
                "tpTurma": "N"
            }
        ]
    },
    {
        "retorno": null,
        "mensagem": null,
        "cdDisciplina": 6706,
        "nmNome": "Materiais Poliméricos",
        "sgCodicred": "4444E-02",
        "sgCodi": null,
        "sgCred": null,
        "cdNivel": 4,
        "tipoDisciplina": null,
        "idTipoDisciplina": 1,
        "nrCreditosPre": 0,
        "stStatus": null,
        "txCursado": null,
        "txPlanejado": null,
        "txCorequisito": null,
        "cdCoRequisito": null,
        "disciplinasPreRequisito": "\n4443S-04 - Ciência dos Materiais",
        "disciplinasSubstitutas": "",
        "disciplinasCoRequisitos": "",
        "disciplinasRequisitosEspeciais": "",
        "tipoRequisito": [
            "REQ",
            "SUB"
        ],
        "turmas": [
            {
                "cdDisciplina": 6706,
                "idTurmaAluno": 0,
                "idTurma": 194,
                "stMatricula": null,
                "codigo": 370,
                "txHorario": "5LM ",
                "horario": [
                    "5L",
                    "5M"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "4442-ENGENHARIA MECÂNICA",
                    "4452-ENGENHARIA MECÂNICA"
                ],
                "txHorarioExtenso": "Quinta-feira, das 19:30 às 21:00",
                "vagas": 60,
                "vagasVeterano": 60,
                "vagasBixo": 0,
                "vagasExtra": 0,
                "vagasCentral": 0,
                "incluido": null,
                "nrPredio": "30C",
                "nrSala": "301",
                "professores": null,
                "tpVaga": "V",
                "tpTurma": "N"
            }
        ]
    },
    {
        "retorno": null,
        "mensagem": null,
        "cdDisciplina": 6480,
        "nmNome": "Resistência Dos Materiais I - Em",
        "sgCodicred": "4421R-04",
        "sgCodi": null,
        "sgCred": null,
        "cdNivel": 5,
        "tipoDisciplina": null,
        "idTipoDisciplina": 1,
        "nrCreditosPre": 0,
        "stStatus": null,
        "txCursado": null,
        "txPlanejado": null,
        "txCorequisito": null,
        "cdCoRequisito": null,
        "disciplinasPreRequisito": "",
        "disciplinasSubstitutas": "\n44201-04 - Resistência dos Materiais I\n4421C-04 - Isostática\n44201-04 - Resistência dos Materiais I",
        "disciplinasCoRequisitos": "",
        "disciplinasRequisitosEspeciais": "\n4444A-04 - Materiais Metálicos\n42188-04 - Mecânica Fundamental",
        "tipoRequisito": [
            "ESP",
            "SUB"
        ],
        "turmas": [
            {
                "cdDisciplina": 6480,
                "idTurmaAluno": 0,
                "idTurma": 1542,
                "stMatricula": null,
                "codigo": 460,
                "txHorario": "2JK 5LM ",
                "horario": [
                    "2J",
                    "2K",
                    "5L",
                    "5M"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "4452-ENGENHARIA MECÂNICA"
                ],
                "txHorarioExtenso": "Segunda-feira, das 17:35 às 19:29 e Quinta-feira, das 19:30 às 21:00",
                "vagas": 60,
                "vagasVeterano": 60,
                "vagasBixo": 0,
                "vagasExtra": 0,
                "vagasCentral": 0,
                "incluido": null,
                "nrPredio": "30D",
                "nrSala": "203",
                "professores": null,
                "tpVaga": "V",
                "tpTurma": "N"
            }
        ]
    },
    {
        "retorno": null,
        "mensagem": null,
        "cdDisciplina": 6712,
        "nmNome": "Mecânica Dos Fluidos",
        "sgCodicred": "4444L-04",
        "sgCodi": null,
        "sgCred": null,
        "cdNivel": 5,
        "tipoDisciplina": null,
        "idTipoDisciplina": 1,
        "nrCreditosPre": 0,
        "stStatus": null,
        "txCursado": null,
        "txPlanejado": null,
        "txCorequisito": null,
        "cdCoRequisito": 10606,
        "disciplinasPreRequisito": "",
        "disciplinasSubstitutas": "\n4480K-06 - Fenomenos de Transporte I\n44295-04 - Mecânica dos Fluidos\n4444N-04 - Fenômenos de Transporte - Eca",
        "disciplinasCoRequisitos": "",
        "disciplinasRequisitosEspeciais": "\n95305-04 - Matemática Aplicada\n4444H-04 - Termodinâmica Aplicada",
        "tipoRequisito": [
            "ESP",
            "SUB"
        ],
        "turmas": [
            {
                "cdDisciplina": 6712,
                "idTurmaAluno": 0,
                "idTurma": 1713,
                "stMatricula": null,
                "codigo": 390,
                "txHorario": "2JK 4NP ",
                "horario": [
                    "2J",
                    "2K",
                    "4N",
                    "4P"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "4452-ENGENHARIA MECÂNICA"
                ],
                "txHorarioExtenso": "Segunda-feira, das 17:35 às 19:29 e Quarta-feira, das 21:15 às 22:45",
                "vagas": 20,
                "vagasVeterano": 20,
                "vagasBixo": 0,
                "vagasExtra": 0,
                "vagasCentral": 0,
                "incluido": null,
                "nrPredio": "30F",
                "nrSala": "114",
                "professores": null,
                "tpVaga": "V",
                "tpTurma": "N"
            },
            {
                "cdDisciplina": 6712,
                "idTurmaAluno": 0,
                "idTurma": 1714,
                "stMatricula": null,
                "codigo": 380,
                "txHorario": "2LM 4NP ",
                "horario": [
                    "2L",
                    "2M",
                    "4N",
                    "4P"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "4452-ENGENHARIA MECÂNICA"
                ],
                "txHorarioExtenso": "Segunda-feira, das 19:30 às 21:00 e Quarta-feira, das 21:15 às 22:45",
                "vagas": 20,
                "vagasVeterano": 20,
                "vagasBixo": 0,
                "vagasExtra": 0,
                "vagasCentral": 0,
                "incluido": null,
                "nrPredio": "30F",
                "nrSala": "114",
                "professores": null,
                "tpVaga": "V",
                "tpTurma": "N"
            }
        ]
    },
    {
        "retorno": null,
        "mensagem": null,
        "cdDisciplina": 6713,
        "nmNome": "Soldagem",
        "sgCodicred": "4444M-04",
        "sgCodi": null,
        "sgCred": null,
        "cdNivel": 5,
        "tipoDisciplina": null,
        "idTipoDisciplina": 1,
        "nrCreditosPre": 0,
        "stStatus": null,
        "txCursado": null,
        "txPlanejado": null,
        "txCorequisito": null,
        "cdCoRequisito": null,
        "disciplinasPreRequisito": "",
        "disciplinasSubstitutas": "",
        "disciplinasCoRequisitos": "",
        "disciplinasRequisitosEspeciais": "\n4444A-04 - Materiais Metálicos",
        "tipoRequisito": [
            "ESP",
            "SUB"
        ],
        "turmas": [
            {
                "cdDisciplina": 6713,
                "idTurmaAluno": 0,
                "idTurma": 199,
                "stMatricula": null,
                "codigo": 370,
                "txHorario": "3LM 4LM ",
                "horario": [
                    "3L",
                    "3M",
                    "4L",
                    "4M"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "4442-ENGENHARIA MECÂNICA",
                    "4452-ENGENHARIA MECÂNICA"
                ],
                "txHorarioExtenso": "Terça-feira, das 19:30 às 21:00 e Quarta-feira, das 19:30 às 21:00",
                "vagas": 20,
                "vagasVeterano": 20,
                "vagasBixo": 0,
                "vagasExtra": 0,
                "vagasCentral": 0,
                "incluido": null,
                "nrPredio": "30B",
                "nrSala": "202",
                "professores": null,
                "tpVaga": "V",
                "tpTurma": "N"
            },
            {
                "cdDisciplina": 6713,
                "idTurmaAluno": 0,
                "idTurma": 197,
                "stMatricula": null,
                "codigo": 470,
                "txHorario": "3LM 5NP ",
                "horario": [
                    "3L",
                    "3M",
                    "5N",
                    "5P"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "4442-ENGENHARIA MECÂNICA",
                    "4452-ENGENHARIA MECÂNICA"
                ],
                "txHorarioExtenso": "Terça-feira, das 19:30 às 21:00 e Quinta-feira, das 21:15 às 22:45",
                "vagas": 20,
                "vagasVeterano": 20,
                "vagasBixo": 0,
                "vagasExtra": 0,
                "vagasCentral": 0,
                "incluido": null,
                "nrPredio": "30B",
                "nrSala": "202",
                "professores": null,
                "tpVaga": "V",
                "tpTurma": "N"
            },
            {
                "cdDisciplina": 6713,
                "idTurmaAluno": 0,
                "idTurma": 198,
                "stMatricula": null,
                "codigo": 380,
                "txHorario": "2NP 3LM ",
                "horario": [
                    "2N",
                    "2P",
                    "3L",
                    "3M"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "4442-ENGENHARIA MECÂNICA",
                    "4452-ENGENHARIA MECÂNICA"
                ],
                "txHorarioExtenso": "Segunda-feira, das 21:15 às 22:45 e Terça-feira, das 19:30 às 21:00",
                "vagas": 20,
                "vagasVeterano": 20,
                "vagasBixo": 0,
                "vagasExtra": 0,
                "vagasCentral": 0,
                "incluido": null,
                "nrPredio": "30F",
                "nrSala": "112",
                "professores": null,
                "tpVaga": "V",
                "tpTurma": "N"
            }
        ]
    },
    {
        "retorno": null,
        "mensagem": null,
        "cdDisciplina": 10588,
        "nmNome": "Transferência De Calor",
        "sgCodicred": "4444T-04",
        "sgCodi": null,
        "sgCred": null,
        "cdNivel": 6,
        "tipoDisciplina": null,
        "idTipoDisciplina": 1,
        "nrCreditosPre": 0,
        "stStatus": null,
        "txCursado": null,
        "txPlanejado": null,
        "txCorequisito": null,
        "cdCoRequisito": null,
        "disciplinasPreRequisito": "\n4444H-04 - Termodinâmica Aplicada",
        "disciplinasSubstitutas": "\n4480L-06 - Fenomenos de Transporte II",
        "disciplinasCoRequisitos": "",
        "disciplinasRequisitosEspeciais": "\n95305-04 - Matemática Aplicada",
        "tipoRequisito": [
            "REQ",
            "ESP",
            "SUB"
        ],
        "turmas": [
            {
                "cdDisciplina": 10588,
                "idTurmaAluno": 0,
                "idTurma": 580,
                "stMatricula": null,
                "codigo": 370,
                "txHorario": "4LM 5LM ",
                "horario": [
                    "4L",
                    "4M",
                    "5L",
                    "5M"
                ],
                "tipo": "",
                "txDescricaoTipo": "Pres",
                "txTurmaCurriculo": [
                    "4442-ENGENHARIA MECÂNICA",
                    "4452-ENGENHARIA MECÂNICA"
                ],
                "txHorarioExtenso": "Quarta-feira, das 19:30 às 21:00 e Quinta-feira, das 19:30 às 21:00",
                "vagas": 60,
                "vagasVeterano": 60,
                "vagasBixo": 0,
                "vagasExtra": 0,
                "vagasCentral": 0,
                "incluido": null,
                "nrPredio": "30D",
                "nrSala": "201",
                "professores": null,
                "tpVaga": "V",
                "tpTurma": "N"
            }
        ]
    }
]