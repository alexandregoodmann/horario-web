import { Injectable } from '@angular/core';
import { Disciplina } from '../model/disciplina';

@Injectable({
  providedIn: 'root'
})
export class NivelService {

  private parseDisciplina(d): Disciplina {
    let disc = new Disciplina();
    disc.nivel = d.cdNivel;
    disc.nmDisciplina = d.nmNome;
    disc.sgCodCred = d.sgCodi + '-' + d.sgCred;
    return disc;
  }

  getCurriculo() {

    let mapa: Map<number, Disciplina[]> = new Map<number, Disciplina[]>();

    //monta a lista de disciplinas
    let lista = [...PLANEJAMENTO];
    lista.forEach(l => {
      l.planejamentoList.forEach(p => {
        p.disciplinaDtoList.forEach(d => {

          let disciplinas = mapa.get(d.cdNivel);
          if (disciplinas === undefined) {
            disciplinas = new Array<Disciplina>();
          }
          disciplinas.push(this.parseDisciplina(d));
          mapa.set(d.cdNivel, disciplinas);

        });
      });
    });

    //ordena a lisa por nível
    /*
    disciplinas.sort(function (a, b) {
      if (a.nivel > b.nivel) {
        return 1;
      }
      if (a.nivel < b.nivel) {
        return -1;
      }
      return 0;
    });*/

    //separa disciplinas por nível
    console.log(mapa);

  }

}

const PLANEJAMENTO = [{
  "planejamentoList": [
    {
      "txSemestre": "2019/2",
      "cdPeriodo": 239,
      "nrTotalCreditos": 44,
      "disciplinaDtoList": [
        {
          "retorno": null,
          "mensagem": null,
          "cdDisciplina": 10606,
          "nmNome": "Controle Hidráulico e Pneumático",
          "sgCodicred": null,
          "sgCodi": "4445R",
          "sgCred": "04",
          "cdNivel": 9,
          "tipoDisciplina": "Curricular",
          "idTipoDisciplina": null,
          "nrCreditosPre": 0,
          "stStatus": null,
          "txCursado": null,
          "txPlanejado": null,
          "txCorequisito": null,
          "cdCoRequisito": null,
          "disciplinasPreRequisito": "",
          "disciplinasSubstitutas": "",
          "disciplinasCoRequisitos": "\n4444L-04 - Mecânica dos Fluidos",
          "disciplinasRequisitosEspeciais": "",
          "tipoRequisito": [],
          "turmas": [],
          "txTipoDisciplina": null,
          "cdGrupo": "00",
          "cdTipoDisciplina": 1,
          "qtCargaHoraria": 60,
          "temPreRequisito": false,
          "temCoRequisito": true,
          "temRequisitoEspecial": false,
          "temSubstituta": false,
          "listTipoPedidoAluno": [
            {
              "idTipoPedidoAluno": 1,
              "txTipoPedidoAluno": "Disciplina Substituta",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            },
            {
              "idTipoPedidoAluno": 2,
              "txTipoPedidoAluno": "Quebra de Requisito",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": true
            }
          ]
        },
        {
          "retorno": null,
          "mensagem": null,
          "cdDisciplina": 6878,
          "nmNome": "Eletrotécnica - Em",
          "sgCodicred": null,
          "sgCodi": "4453G",
          "sgCred": "02",
          "cdNivel": 4,
          "tipoDisciplina": "Curricular",
          "idTipoDisciplina": null,
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
          "tipoRequisito": [],
          "turmas": [],
          "txTipoDisciplina": null,
          "cdGrupo": "00",
          "cdTipoDisciplina": 1,
          "qtCargaHoraria": 30,
          "temPreRequisito": false,
          "temCoRequisito": true,
          "temRequisitoEspecial": false,
          "temSubstituta": false,
          "listTipoPedidoAluno": [
            {
              "idTipoPedidoAluno": 1,
              "txTipoPedidoAluno": "Disciplina Substituta",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            },
            {
              "idTipoPedidoAluno": 2,
              "txTipoPedidoAluno": "Quebra de Requisito",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": true
            }
          ]
        },
        {
          "retorno": null,
          "mensagem": null,
          "cdDisciplina": 10630,
          "nmNome": "Eletrônica Básica - Em",
          "sgCodicred": null,
          "sgCodi": "4453U",
          "sgCred": "02",
          "cdNivel": 6,
          "tipoDisciplina": "Curricular",
          "idTipoDisciplina": null,
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
          "tipoRequisito": [],
          "turmas": [],
          "txTipoDisciplina": null,
          "cdGrupo": "00",
          "cdTipoDisciplina": 1,
          "qtCargaHoraria": 30,
          "temPreRequisito": false,
          "temCoRequisito": true,
          "temRequisitoEspecial": false,
          "temSubstituta": true,
          "listTipoPedidoAluno": [
            {
              "idTipoPedidoAluno": 1,
              "txTipoPedidoAluno": "Disciplina Substituta",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": true
            },
            {
              "idTipoPedidoAluno": 2,
              "txTipoPedidoAluno": "Quebra de Requisito",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": true
            }
          ]
        },
        {
          "retorno": null,
          "mensagem": null,
          "cdDisciplina": 27828,
          "nmNome": "Engenharia Econômica",
          "sgCodicred": null,
          "sgCodi": "4471X",
          "sgCred": "02",
          "cdNivel": 8,
          "tipoDisciplina": "Curricular",
          "idTipoDisciplina": null,
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
          "tipoRequisito": [],
          "turmas": [],
          "txTipoDisciplina": null,
          "cdGrupo": "00",
          "cdTipoDisciplina": 1,
          "qtCargaHoraria": 30,
          "temPreRequisito": false,
          "temCoRequisito": false,
          "temRequisitoEspecial": false,
          "temSubstituta": true,
          "listTipoPedidoAluno": [
            {
              "idTipoPedidoAluno": 1,
              "txTipoPedidoAluno": "Disciplina Substituta",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": true
            },
            {
              "idTipoPedidoAluno": 2,
              "txTipoPedidoAluno": "Quebra de Requisito",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            }
          ]
        },
        {
          "retorno": null,
          "mensagem": null,
          "cdDisciplina": 6705,
          "nmNome": "Fundição",
          "sgCodicred": null,
          "sgCodi": "4444D",
          "sgCred": "02",
          "cdNivel": 4,
          "tipoDisciplina": "Curricular",
          "idTipoDisciplina": null,
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
          "tipoRequisito": [],
          "turmas": [],
          "txTipoDisciplina": null,
          "cdGrupo": "00",
          "cdTipoDisciplina": 1,
          "qtCargaHoraria": 30,
          "temPreRequisito": false,
          "temCoRequisito": false,
          "temRequisitoEspecial": true,
          "temSubstituta": true,
          "listTipoPedidoAluno": [
            {
              "idTipoPedidoAluno": 1,
              "txTipoPedidoAluno": "Disciplina Substituta",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": true
            },
            {
              "idTipoPedidoAluno": 2,
              "txTipoPedidoAluno": "Quebra de Requisito",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            }
          ]
        },
        {
          "retorno": null,
          "mensagem": null,
          "cdDisciplina": 6700,
          "nmNome": "Geração e Utilização do Vapor",
          "sgCodicred": null,
          "sgCodi": "44449",
          "sgCred": "04",
          "cdNivel": 9,
          "tipoDisciplina": "Curricular",
          "idTipoDisciplina": null,
          "nrCreditosPre": 0,
          "stStatus": null,
          "txCursado": null,
          "txPlanejado": null,
          "txCorequisito": null,
          "cdCoRequisito": null,
          "disciplinasPreRequisito": "",
          "disciplinasSubstitutas": "\n44640-04 - Tópicos Especiais II - Eca",
          "disciplinasCoRequisitos": "\n4445E-04 - Máquinas Térmicas",
          "disciplinasRequisitosEspeciais": "",
          "tipoRequisito": [],
          "turmas": [],
          "txTipoDisciplina": null,
          "cdGrupo": "00",
          "cdTipoDisciplina": 1,
          "qtCargaHoraria": 60,
          "temPreRequisito": false,
          "temCoRequisito": true,
          "temRequisitoEspecial": false,
          "temSubstituta": true,
          "listTipoPedidoAluno": [
            {
              "idTipoPedidoAluno": 1,
              "txTipoPedidoAluno": "Disciplina Substituta",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": true
            },
            {
              "idTipoPedidoAluno": 2,
              "txTipoPedidoAluno": "Quebra de Requisito",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": true
            }
          ]
        },
        {
          "retorno": null,
          "mensagem": null,
          "cdDisciplina": 7013,
          "nmNome": "Gestão Empresarial para Engenharia",
          "sgCodicred": null,
          "sgCodi": "44721",
          "sgCred": "02",
          "cdNivel": 6,
          "tipoDisciplina": "Curricular",
          "idTipoDisciplina": null,
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
          "tipoRequisito": [],
          "turmas": [],
          "txTipoDisciplina": null,
          "cdGrupo": "00",
          "cdTipoDisciplina": 1,
          "qtCargaHoraria": 30,
          "temPreRequisito": false,
          "temCoRequisito": false,
          "temRequisitoEspecial": false,
          "temSubstituta": true,
          "listTipoPedidoAluno": [
            {
              "idTipoPedidoAluno": 1,
              "txTipoPedidoAluno": "Disciplina Substituta",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": true
            },
            {
              "idTipoPedidoAluno": 2,
              "txTipoPedidoAluno": "Quebra de Requisito",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            }
          ]
        },
        {
          "retorno": null,
          "mensagem": null,
          "cdDisciplina": 13451,
          "nmNome": "Humanismo e Cultura Religiosa",
          "sgCodicred": null,
          "sgCodi": "11521",
          "sgCred": "04",
          "cdNivel": 5,
          "tipoDisciplina": "Curricular",
          "idTipoDisciplina": null,
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
          "tipoRequisito": [],
          "turmas": [],
          "txTipoDisciplina": null,
          "cdGrupo": "00",
          "cdTipoDisciplina": 1,
          "qtCargaHoraria": 60,
          "temPreRequisito": false,
          "temCoRequisito": false,
          "temRequisitoEspecial": false,
          "temSubstituta": true,
          "listTipoPedidoAluno": [
            {
              "idTipoPedidoAluno": 1,
              "txTipoPedidoAluno": "Disciplina Substituta",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": true
            },
            {
              "idTipoPedidoAluno": 2,
              "txTipoPedidoAluno": "Quebra de Requisito",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            }
          ]
        },
        {
          "retorno": null,
          "mensagem": null,
          "cdDisciplina": 6706,
          "nmNome": "Materiais Poliméricos",
          "sgCodicred": null,
          "sgCodi": "4444E",
          "sgCred": "02",
          "cdNivel": 4,
          "tipoDisciplina": "Curricular",
          "idTipoDisciplina": null,
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
          "tipoRequisito": [],
          "turmas": [],
          "txTipoDisciplina": null,
          "cdGrupo": "00",
          "cdTipoDisciplina": 1,
          "qtCargaHoraria": 30,
          "temPreRequisito": true,
          "temCoRequisito": false,
          "temRequisitoEspecial": false,
          "temSubstituta": false,
          "listTipoPedidoAluno": [
            {
              "idTipoPedidoAluno": 1,
              "txTipoPedidoAluno": "Disciplina Substituta",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            },
            {
              "idTipoPedidoAluno": 2,
              "txTipoPedidoAluno": "Quebra de Requisito",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            }
          ]
        },
        {
          "retorno": null,
          "mensagem": null,
          "cdDisciplina": 6712,
          "nmNome": "Mecânica dos Fluidos",
          "sgCodicred": null,
          "sgCodi": "4444L",
          "sgCred": "04",
          "cdNivel": 5,
          "tipoDisciplina": "Curricular",
          "idTipoDisciplina": null,
          "nrCreditosPre": 0,
          "stStatus": null,
          "txCursado": null,
          "txPlanejado": null,
          "txCorequisito": null,
          "cdCoRequisito": null,
          "disciplinasPreRequisito": "",
          "disciplinasSubstitutas": "\n4480K-06 - Fenomenos de Transporte I\n44295-04 - Mecânica dos Fluidos\n4444N-04 - Fenômenos de Transporte - Eca",
          "disciplinasCoRequisitos": "",
          "disciplinasRequisitosEspeciais": "\n95305-04 - Matemática Aplicada\n4444H-04 - Termodinâmica Aplicada",
          "tipoRequisito": [],
          "turmas": [],
          "txTipoDisciplina": null,
          "cdGrupo": "00",
          "cdTipoDisciplina": 1,
          "qtCargaHoraria": 60,
          "temPreRequisito": false,
          "temCoRequisito": false,
          "temRequisitoEspecial": true,
          "temSubstituta": true,
          "listTipoPedidoAluno": [
            {
              "idTipoPedidoAluno": 1,
              "txTipoPedidoAluno": "Disciplina Substituta",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": true
            },
            {
              "idTipoPedidoAluno": 2,
              "txTipoPedidoAluno": "Quebra de Requisito",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            }
          ]
        },
        {
          "retorno": null,
          "mensagem": null,
          "cdDisciplina": 10597,
          "nmNome": "Máquinas Térmicas",
          "sgCodicred": null,
          "sgCodi": "4445E",
          "sgCred": "04",
          "cdNivel": 8,
          "tipoDisciplina": "Curricular",
          "idTipoDisciplina": null,
          "nrCreditosPre": 0,
          "stStatus": null,
          "txCursado": null,
          "txPlanejado": null,
          "txCorequisito": null,
          "cdCoRequisito": null,
          "disciplinasPreRequisito": "\n4444H-04 - Termodinâmica Aplicada",
          "disciplinasSubstitutas": "",
          "disciplinasCoRequisitos": "",
          "disciplinasRequisitosEspeciais": "",
          "tipoRequisito": [],
          "turmas": [],
          "txTipoDisciplina": null,
          "cdGrupo": "00",
          "cdTipoDisciplina": 1,
          "qtCargaHoraria": 60,
          "temPreRequisito": true,
          "temCoRequisito": false,
          "temRequisitoEspecial": false,
          "temSubstituta": false,
          "listTipoPedidoAluno": [
            {
              "idTipoPedidoAluno": 1,
              "txTipoPedidoAluno": "Disciplina Substituta",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            },
            {
              "idTipoPedidoAluno": 2,
              "txTipoPedidoAluno": "Quebra de Requisito",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            }
          ]
        },
        {
          "retorno": null,
          "mensagem": null,
          "cdDisciplina": 6480,
          "nmNome": "Resistência dos Materiais I - Em",
          "sgCodicred": null,
          "sgCodi": "4421R",
          "sgCred": "04",
          "cdNivel": 5,
          "tipoDisciplina": "Curricular",
          "idTipoDisciplina": null,
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
          "tipoRequisito": [],
          "turmas": [],
          "txTipoDisciplina": null,
          "cdGrupo": null,
          "cdTipoDisciplina": 1,
          "qtCargaHoraria": 60,
          "temPreRequisito": false,
          "temCoRequisito": false,
          "temRequisitoEspecial": true,
          "temSubstituta": true,
          "listTipoPedidoAluno": [
            {
              "idTipoPedidoAluno": 1,
              "txTipoPedidoAluno": "Disciplina Substituta",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": true
            },
            {
              "idTipoPedidoAluno": 2,
              "txTipoPedidoAluno": "Quebra de Requisito",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            }
          ]
        },
        {
          "retorno": null,
          "mensagem": null,
          "cdDisciplina": 10588,
          "nmNome": "Transferência de Calor",
          "sgCodicred": null,
          "sgCodi": "4444T",
          "sgCred": "04",
          "cdNivel": 6,
          "tipoDisciplina": "Curricular",
          "idTipoDisciplina": null,
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
          "tipoRequisito": [],
          "turmas": [],
          "txTipoDisciplina": null,
          "cdGrupo": "00",
          "cdTipoDisciplina": 1,
          "qtCargaHoraria": 60,
          "temPreRequisito": true,
          "temCoRequisito": false,
          "temRequisitoEspecial": true,
          "temSubstituta": true,
          "listTipoPedidoAluno": [
            {
              "idTipoPedidoAluno": 1,
              "txTipoPedidoAluno": "Disciplina Substituta",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": true
            },
            {
              "idTipoPedidoAluno": 2,
              "txTipoPedidoAluno": "Quebra de Requisito",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            }
          ]
        },
        {
          "retorno": null,
          "mensagem": null,
          "cdDisciplina": 10586,
          "nmNome": "Vibrações Mecânicas",
          "sgCodicred": null,
          "sgCodi": "4444R",
          "sgCred": "04",
          "cdNivel": 6,
          "tipoDisciplina": "Curricular",
          "idTipoDisciplina": null,
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
          "tipoRequisito": [],
          "turmas": [],
          "txTipoDisciplina": null,
          "cdGrupo": "00",
          "cdTipoDisciplina": 1,
          "qtCargaHoraria": 60,
          "temPreRequisito": true,
          "temCoRequisito": false,
          "temRequisitoEspecial": false,
          "temSubstituta": false,
          "listTipoPedidoAluno": [
            {
              "idTipoPedidoAluno": 1,
              "txTipoPedidoAluno": "Disciplina Substituta",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            },
            {
              "idTipoPedidoAluno": 2,
              "txTipoPedidoAluno": "Quebra de Requisito",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            }
          ]
        }
      ]
    },
    {
      "txSemestre": "2020/1",
      "cdPeriodo": 241,
      "nrTotalCreditos": 18,
      "disciplinaDtoList": [
        {
          "retorno": null,
          "mensagem": null,
          "cdDisciplina": 10590,
          "nmNome": "Conformação Mecânica",
          "sgCodicred": null,
          "sgCodi": "4444V",
          "sgCred": "04",
          "cdNivel": 7,
          "tipoDisciplina": "Curricular",
          "idTipoDisciplina": null,
          "nrCreditosPre": 0,
          "stStatus": null,
          "txCursado": null,
          "txPlanejado": null,
          "txCorequisito": null,
          "cdCoRequisito": null,
          "disciplinasPreRequisito": "\n4444A-04 - Materiais Metálicos",
          "disciplinasSubstitutas": "",
          "disciplinasCoRequisitos": "",
          "disciplinasRequisitosEspeciais": "\n4421R-04 - Resistência dos Materiais I - Em",
          "tipoRequisito": [],
          "turmas": [],
          "txTipoDisciplina": null,
          "cdGrupo": "00",
          "cdTipoDisciplina": 1,
          "qtCargaHoraria": 60,
          "temPreRequisito": true,
          "temCoRequisito": false,
          "temRequisitoEspecial": true,
          "temSubstituta": false,
          "listTipoPedidoAluno": [
            {
              "idTipoPedidoAluno": 1,
              "txTipoPedidoAluno": "Disciplina Substituta",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            },
            {
              "idTipoPedidoAluno": 2,
              "txTipoPedidoAluno": "Quebra de Requisito",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": true
            }
          ]
        },
        {
          "retorno": null,
          "mensagem": null,
          "cdDisciplina": 10585,
          "nmNome": "Engenharia da Qualidade",
          "sgCodicred": null,
          "sgCodi": "4444P",
          "sgCred": "02",
          "cdNivel": 6,
          "tipoDisciplina": "Curricular",
          "idTipoDisciplina": null,
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
          "tipoRequisito": [],
          "turmas": [],
          "txTipoDisciplina": null,
          "cdGrupo": "00",
          "cdTipoDisciplina": 1,
          "qtCargaHoraria": 30,
          "temPreRequisito": false,
          "temCoRequisito": false,
          "temRequisitoEspecial": true,
          "temSubstituta": true,
          "listTipoPedidoAluno": [
            {
              "idTipoPedidoAluno": 1,
              "txTipoPedidoAluno": "Disciplina Substituta",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            },
            {
              "idTipoPedidoAluno": 2,
              "txTipoPedidoAluno": "Quebra de Requisito",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            }
          ]
        },
        {
          "retorno": null,
          "mensagem": null,
          "cdDisciplina": 10587,
          "nmNome": "Escoamentos Viscosos",
          "sgCodicred": null,
          "sgCodi": "4444S",
          "sgCred": "02",
          "cdNivel": 6,
          "tipoDisciplina": "Curricular",
          "idTipoDisciplina": null,
          "nrCreditosPre": 0,
          "stStatus": null,
          "txCursado": null,
          "txPlanejado": null,
          "txCorequisito": null,
          "cdCoRequisito": null,
          "disciplinasPreRequisito": "\n95305-04 - Matemática Aplicada",
          "disciplinasSubstitutas": "\n4480K-06 - Fenomenos de Transporte I",
          "disciplinasCoRequisitos": "",
          "disciplinasRequisitosEspeciais": "\n4444L-04 - Mecânica dos Fluidos",
          "tipoRequisito": [],
          "turmas": [],
          "txTipoDisciplina": null,
          "cdGrupo": "00",
          "cdTipoDisciplina": 1,
          "qtCargaHoraria": 30,
          "temPreRequisito": true,
          "temCoRequisito": false,
          "temRequisitoEspecial": true,
          "temSubstituta": true,
          "listTipoPedidoAluno": [
            {
              "idTipoPedidoAluno": 1,
              "txTipoPedidoAluno": "Disciplina Substituta",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            },
            {
              "idTipoPedidoAluno": 2,
              "txTipoPedidoAluno": "Quebra de Requisito",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": true
            }
          ]
        },
        {
          "retorno": null,
          "mensagem": null,
          "cdDisciplina": 7431,
          "nmNome": "Ferramentas Computacionais",
          "sgCodicred": null,
          "sgCodi": "4610T",
          "sgCred": "02",
          "cdNivel": 3,
          "tipoDisciplina": "Curricular",
          "idTipoDisciplina": null,
          "nrCreditosPre": 0,
          "stStatus": null,
          "txCursado": null,
          "txPlanejado": null,
          "txCorequisito": null,
          "cdCoRequisito": null,
          "disciplinasPreRequisito": "",
          "disciplinasSubstitutas": "\n4610P-04 - Laboratório de Programação I - Ec\n4613A-06 - Algoritmos e Programacao I",
          "disciplinasCoRequisitos": "",
          "disciplinasRequisitosEspeciais": "",
          "tipoRequisito": [],
          "turmas": [],
          "txTipoDisciplina": null,
          "cdGrupo": "00",
          "cdTipoDisciplina": 1,
          "qtCargaHoraria": 30,
          "temPreRequisito": false,
          "temCoRequisito": false,
          "temRequisitoEspecial": false,
          "temSubstituta": true,
          "listTipoPedidoAluno": [
            {
              "idTipoPedidoAluno": 1,
              "txTipoPedidoAluno": "Disciplina Substituta",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            },
            {
              "idTipoPedidoAluno": 2,
              "txTipoPedidoAluno": "Quebra de Requisito",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            }
          ]
        },
        {
          "retorno": null,
          "mensagem": null,
          "cdDisciplina": 10583,
          "nmNome": "Resistência dos Materiais II - Em",
          "sgCodicred": null,
          "sgCodi": "4423G",
          "sgCred": "04",
          "cdNivel": 6,
          "tipoDisciplina": "Curricular",
          "idTipoDisciplina": null,
          "nrCreditosPre": 0,
          "stStatus": null,
          "txCursado": null,
          "txPlanejado": null,
          "txCorequisito": null,
          "cdCoRequisito": null,
          "disciplinasPreRequisito": "",
          "disciplinasSubstitutas": "\n44201-04 - Resistência dos Materiais I\n44202-04 - Resistência dos Materiais II",
          "disciplinasCoRequisitos": "",
          "disciplinasRequisitosEspeciais": "\n4421R-04 - Resistência dos Materiais I - Em",
          "tipoRequisito": [],
          "turmas": [],
          "txTipoDisciplina": null,
          "cdGrupo": "00",
          "cdTipoDisciplina": 1,
          "qtCargaHoraria": 60,
          "temPreRequisito": false,
          "temCoRequisito": false,
          "temRequisitoEspecial": true,
          "temSubstituta": true,
          "listTipoPedidoAluno": [
            {
              "idTipoPedidoAluno": 1,
              "txTipoPedidoAluno": "Disciplina Substituta",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            },
            {
              "idTipoPedidoAluno": 2,
              "txTipoPedidoAluno": "Quebra de Requisito",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            }
          ]
        },
        {
          "retorno": null,
          "mensagem": null,
          "cdDisciplina": 6713,
          "nmNome": "Soldagem",
          "sgCodicred": null,
          "sgCodi": "4444M",
          "sgCred": "04",
          "cdNivel": 5,
          "tipoDisciplina": "Curricular",
          "idTipoDisciplina": null,
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
          "tipoRequisito": [],
          "turmas": [],
          "txTipoDisciplina": null,
          "cdGrupo": "00",
          "cdTipoDisciplina": 1,
          "qtCargaHoraria": 60,
          "temPreRequisito": false,
          "temCoRequisito": false,
          "temRequisitoEspecial": true,
          "temSubstituta": false,
          "listTipoPedidoAluno": [
            {
              "idTipoPedidoAluno": 1,
              "txTipoPedidoAluno": "Disciplina Substituta",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            },
            {
              "idTipoPedidoAluno": 2,
              "txTipoPedidoAluno": "Quebra de Requisito",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            }
          ]
        }
      ]
    },
    {
      "txSemestre": "2020/2",
      "cdPeriodo": 242,
      "nrTotalCreditos": 18,
      "disciplinaDtoList": [
        {
          "retorno": null,
          "mensagem": null,
          "cdDisciplina": 10589,
          "nmNome": "Elementos de Máquinas",
          "sgCodicred": null,
          "sgCodi": "4444U",
          "sgCred": "04",
          "cdNivel": 7,
          "tipoDisciplina": "Curricular",
          "idTipoDisciplina": null,
          "nrCreditosPre": 0,
          "stStatus": null,
          "txCursado": null,
          "txPlanejado": null,
          "txCorequisito": null,
          "cdCoRequisito": null,
          "disciplinasPreRequisito": "\n4444J-04 - Mecanismos e Dinâmica de Máquinas",
          "disciplinasSubstitutas": "",
          "disciplinasCoRequisitos": "\n4444Y-04 - Resistência dos Materiais III",
          "disciplinasRequisitosEspeciais": "\n4444A-04 - Materiais Metálicos",
          "tipoRequisito": [],
          "turmas": [],
          "txTipoDisciplina": null,
          "cdGrupo": "00",
          "cdTipoDisciplina": 1,
          "qtCargaHoraria": 60,
          "temPreRequisito": true,
          "temCoRequisito": true,
          "temRequisitoEspecial": true,
          "temSubstituta": false,
          "listTipoPedidoAluno": [
            {
              "idTipoPedidoAluno": 1,
              "txTipoPedidoAluno": "Disciplina Substituta",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            },
            {
              "idTipoPedidoAluno": 2,
              "txTipoPedidoAluno": "Quebra de Requisito",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            }
          ]
        },
        {
          "retorno": null,
          "mensagem": null,
          "cdDisciplina": 10596,
          "nmNome": "Fenômenos de Convecção",
          "sgCodicred": null,
          "sgCodi": "4445D",
          "sgCred": "02",
          "cdNivel": 7,
          "tipoDisciplina": "Curricular",
          "idTipoDisciplina": null,
          "nrCreditosPre": 0,
          "stStatus": null,
          "txCursado": null,
          "txPlanejado": null,
          "txCorequisito": null,
          "cdCoRequisito": null,
          "disciplinasPreRequisito": "\n4444L-04 - Mecânica dos Fluidos",
          "disciplinasSubstitutas": "\n4480L-06 - Fenomenos de Transporte II",
          "disciplinasCoRequisitos": "",
          "disciplinasRequisitosEspeciais": "\n4444S-02 - Escoamentos Viscosos\n4444T-04 - Transferência de Calor",
          "tipoRequisito": [],
          "turmas": [],
          "txTipoDisciplina": null,
          "cdGrupo": "00",
          "cdTipoDisciplina": 1,
          "qtCargaHoraria": 30,
          "temPreRequisito": true,
          "temCoRequisito": false,
          "temRequisitoEspecial": true,
          "temSubstituta": true,
          "listTipoPedidoAluno": [
            {
              "idTipoPedidoAluno": 1,
              "txTipoPedidoAluno": "Disciplina Substituta",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            },
            {
              "idTipoPedidoAluno": 2,
              "txTipoPedidoAluno": "Quebra de Requisito",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            }
          ]
        },
        {
          "retorno": null,
          "mensagem": null,
          "cdDisciplina": 10594,
          "nmNome": "Manutenção Industrial",
          "sgCodicred": null,
          "sgCodi": "4445A",
          "sgCred": "02",
          "cdNivel": 7,
          "tipoDisciplina": "Curricular",
          "idTipoDisciplina": null,
          "nrCreditosPre": 0,
          "stStatus": null,
          "txCursado": null,
          "txPlanejado": null,
          "txCorequisito": null,
          "cdCoRequisito": null,
          "disciplinasPreRequisito": "",
          "disciplinasSubstitutas": "",
          "disciplinasCoRequisitos": "\n4444U-04 - Elementos de Máquinas",
          "disciplinasRequisitosEspeciais": "",
          "tipoRequisito": [],
          "turmas": [],
          "txTipoDisciplina": null,
          "cdGrupo": "00",
          "cdTipoDisciplina": 1,
          "qtCargaHoraria": 30,
          "temPreRequisito": false,
          "temCoRequisito": true,
          "temRequisitoEspecial": false,
          "temSubstituta": false,
          "listTipoPedidoAluno": [
            {
              "idTipoPedidoAluno": 1,
              "txTipoPedidoAluno": "Disciplina Substituta",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            },
            {
              "idTipoPedidoAluno": 2,
              "txTipoPedidoAluno": "Quebra de Requisito",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            }
          ]
        },
        {
          "retorno": null,
          "mensagem": null,
          "cdDisciplina": 10593,
          "nmNome": "Resistência dos Materiais III",
          "sgCodicred": null,
          "sgCodi": "4444Y",
          "sgCred": "04",
          "cdNivel": 7,
          "tipoDisciplina": "Curricular",
          "idTipoDisciplina": null,
          "nrCreditosPre": 0,
          "stStatus": null,
          "txCursado": null,
          "txPlanejado": null,
          "txCorequisito": null,
          "cdCoRequisito": null,
          "disciplinasPreRequisito": "",
          "disciplinasSubstitutas": "",
          "disciplinasCoRequisitos": "",
          "disciplinasRequisitosEspeciais": "\n4423G-04 - Resistência dos Materiais II - Em",
          "tipoRequisito": [],
          "turmas": [],
          "txTipoDisciplina": null,
          "cdGrupo": "00",
          "cdTipoDisciplina": 1,
          "qtCargaHoraria": 60,
          "temPreRequisito": false,
          "temCoRequisito": false,
          "temRequisitoEspecial": true,
          "temSubstituta": false,
          "listTipoPedidoAluno": [
            {
              "idTipoPedidoAluno": 1,
              "txTipoPedidoAluno": "Disciplina Substituta",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            },
            {
              "idTipoPedidoAluno": 2,
              "txTipoPedidoAluno": "Quebra de Requisito",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            }
          ]
        },
        {
          "retorno": null,
          "mensagem": null,
          "cdDisciplina": 10595,
          "nmNome": "Sistemas Fluidomecânicos",
          "sgCodicred": null,
          "sgCodi": "4445B",
          "sgCred": "04",
          "cdNivel": 7,
          "tipoDisciplina": "Curricular",
          "idTipoDisciplina": null,
          "nrCreditosPre": 0,
          "stStatus": null,
          "txCursado": null,
          "txPlanejado": null,
          "txCorequisito": null,
          "cdCoRequisito": null,
          "disciplinasPreRequisito": "\n4444L-04 - Mecânica dos Fluidos",
          "disciplinasSubstitutas": "",
          "disciplinasCoRequisitos": "",
          "disciplinasRequisitosEspeciais": "",
          "tipoRequisito": [],
          "turmas": [],
          "txTipoDisciplina": null,
          "cdGrupo": "00",
          "cdTipoDisciplina": 1,
          "qtCargaHoraria": 60,
          "temPreRequisito": true,
          "temCoRequisito": false,
          "temRequisitoEspecial": false,
          "temSubstituta": false,
          "listTipoPedidoAluno": [
            {
              "idTipoPedidoAluno": 1,
              "txTipoPedidoAluno": "Disciplina Substituta",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            },
            {
              "idTipoPedidoAluno": 2,
              "txTipoPedidoAluno": "Quebra de Requisito",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            }
          ]
        },
        {
          "retorno": null,
          "mensagem": null,
          "cdDisciplina": 10688,
          "nmNome": "Ética e Exercício Profissional da Engenharia",
          "sgCodicred": null,
          "sgCodi": "44792",
          "sgCred": "02",
          "cdNivel": 7,
          "tipoDisciplina": "Curricular",
          "idTipoDisciplina": null,
          "nrCreditosPre": 120,
          "stStatus": null,
          "txCursado": null,
          "txPlanejado": null,
          "txCorequisito": null,
          "cdCoRequisito": null,
          "disciplinasPreRequisito": "",
          "disciplinasSubstitutas": "\n4481S-04 - Trab. de Conc. de Curso II - Eq (Proj. Proc.)",
          "disciplinasCoRequisitos": "",
          "disciplinasRequisitosEspeciais": "",
          "tipoRequisito": [],
          "turmas": [],
          "txTipoDisciplina": null,
          "cdGrupo": "00",
          "cdTipoDisciplina": 1,
          "qtCargaHoraria": 30,
          "temPreRequisito": false,
          "temCoRequisito": false,
          "temRequisitoEspecial": false,
          "temSubstituta": true,
          "listTipoPedidoAluno": [
            {
              "idTipoPedidoAluno": 1,
              "txTipoPedidoAluno": "Disciplina Substituta",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            },
            {
              "idTipoPedidoAluno": 2,
              "txTipoPedidoAluno": "Quebra de Requisito",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            }
          ]
        }
      ]
    },
    {
      "txSemestre": "2021/1",
      "cdPeriodo": 243,
      "nrTotalCreditos": 20,
      "disciplinaDtoList": [
        {
          "retorno": null,
          "mensagem": null,
          "cdDisciplina": 10600,
          "nmNome": "Engenharia de Controle",
          "sgCodicred": null,
          "sgCodi": "4445H",
          "sgCred": "02",
          "cdNivel": 8,
          "tipoDisciplina": "Curricular",
          "idTipoDisciplina": null,
          "nrCreditosPre": 0,
          "stStatus": null,
          "txCursado": null,
          "txPlanejado": null,
          "txCorequisito": null,
          "cdCoRequisito": null,
          "disciplinasPreRequisito": "",
          "disciplinasSubstitutas": "\n44635-02 - Modelagem de Sistemas Dinâmicos",
          "disciplinasCoRequisitos": "",
          "disciplinasRequisitosEspeciais": "\n4444R-04 - Vibrações Mecânicas",
          "tipoRequisito": [],
          "turmas": [],
          "txTipoDisciplina": null,
          "cdGrupo": "00",
          "cdTipoDisciplina": 1,
          "qtCargaHoraria": 30,
          "temPreRequisito": false,
          "temCoRequisito": false,
          "temRequisitoEspecial": true,
          "temSubstituta": true,
          "listTipoPedidoAluno": [
            {
              "idTipoPedidoAluno": 1,
              "txTipoPedidoAluno": "Disciplina Substituta",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            },
            {
              "idTipoPedidoAluno": 2,
              "txTipoPedidoAluno": "Quebra de Requisito",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            }
          ]
        },
        {
          "retorno": null,
          "mensagem": null,
          "cdDisciplina": 27829,
          "nmNome": "Engenharia e Segurança do Trabalho",
          "sgCodicred": null,
          "sgCodi": "4471Y",
          "sgCred": "02",
          "cdNivel": 8,
          "tipoDisciplina": "Curricular",
          "idTipoDisciplina": null,
          "nrCreditosPre": 120,
          "stStatus": null,
          "txCursado": null,
          "txPlanejado": null,
          "txCorequisito": null,
          "cdCoRequisito": null,
          "disciplinasPreRequisito": "",
          "disciplinasSubstitutas": "\n44713-02 - Engenharia e Segurança do Trabalho",
          "disciplinasCoRequisitos": "",
          "disciplinasRequisitosEspeciais": "",
          "tipoRequisito": [],
          "turmas": [],
          "txTipoDisciplina": null,
          "cdGrupo": "00",
          "cdTipoDisciplina": 1,
          "qtCargaHoraria": 30,
          "temPreRequisito": false,
          "temCoRequisito": false,
          "temRequisitoEspecial": false,
          "temSubstituta": true,
          "listTipoPedidoAluno": [
            {
              "idTipoPedidoAluno": 1,
              "txTipoPedidoAluno": "Disciplina Substituta",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            },
            {
              "idTipoPedidoAluno": 2,
              "txTipoPedidoAluno": "Quebra de Requisito",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            }
          ]
        },
        {
          "retorno": null,
          "mensagem": null,
          "cdDisciplina": 10599,
          "nmNome": "Instrumentação e Medição",
          "sgCodicred": null,
          "sgCodi": "4445G",
          "sgCred": "04",
          "cdNivel": 8,
          "tipoDisciplina": "Curricular",
          "idTipoDisciplina": null,
          "nrCreditosPre": 0,
          "stStatus": null,
          "txCursado": null,
          "txPlanejado": null,
          "txCorequisito": null,
          "cdCoRequisito": null,
          "disciplinasPreRequisito": "",
          "disciplinasSubstitutas": "",
          "disciplinasCoRequisitos": "",
          "disciplinasRequisitosEspeciais": "\n4453U-02 - Eletrônica Básica - Em",
          "tipoRequisito": [],
          "turmas": [],
          "txTipoDisciplina": null,
          "cdGrupo": "00",
          "cdTipoDisciplina": 1,
          "qtCargaHoraria": 60,
          "temPreRequisito": false,
          "temCoRequisito": false,
          "temRequisitoEspecial": true,
          "temSubstituta": false,
          "listTipoPedidoAluno": [
            {
              "idTipoPedidoAluno": 1,
              "txTipoPedidoAluno": "Disciplina Substituta",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            },
            {
              "idTipoPedidoAluno": 2,
              "txTipoPedidoAluno": "Quebra de Requisito",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            }
          ]
        },
        {
          "retorno": null,
          "mensagem": null,
          "cdDisciplina": 10601,
          "nmNome": "Integração Mecânica Experimental",
          "sgCodicred": null,
          "sgCodi": "4445J",
          "sgCred": "02",
          "cdNivel": 8,
          "tipoDisciplina": "Curricular",
          "idTipoDisciplina": null,
          "nrCreditosPre": 150,
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
          "turmas": [],
          "txTipoDisciplina": null,
          "cdGrupo": "00",
          "cdTipoDisciplina": 1,
          "qtCargaHoraria": 30,
          "temPreRequisito": false,
          "temCoRequisito": false,
          "temRequisitoEspecial": false,
          "temSubstituta": false,
          "listTipoPedidoAluno": [
            {
              "idTipoPedidoAluno": 1,
              "txTipoPedidoAluno": "Disciplina Substituta",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            },
            {
              "idTipoPedidoAluno": 2,
              "txTipoPedidoAluno": "Quebra de Requisito",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            }
          ]
        },
        {
          "retorno": null,
          "mensagem": null,
          "cdDisciplina": 10598,
          "nmNome": "Mecânica do Contínuo",
          "sgCodicred": null,
          "sgCodi": "4445F",
          "sgCred": "02",
          "cdNivel": 8,
          "tipoDisciplina": "Curricular",
          "idTipoDisciplina": null,
          "nrCreditosPre": 0,
          "stStatus": null,
          "txCursado": null,
          "txPlanejado": null,
          "txCorequisito": null,
          "cdCoRequisito": null,
          "disciplinasPreRequisito": "",
          "disciplinasSubstitutas": "",
          "disciplinasCoRequisitos": "",
          "disciplinasRequisitosEspeciais": "\n4444S-02 - Escoamentos Viscosos\n4444Y-04 - Resistência dos Materiais III",
          "tipoRequisito": [],
          "turmas": [],
          "txTipoDisciplina": null,
          "cdGrupo": "00",
          "cdTipoDisciplina": 1,
          "qtCargaHoraria": 30,
          "temPreRequisito": false,
          "temCoRequisito": false,
          "temRequisitoEspecial": true,
          "temSubstituta": false,
          "listTipoPedidoAluno": [
            {
              "idTipoPedidoAluno": 1,
              "txTipoPedidoAluno": "Disciplina Substituta",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            },
            {
              "idTipoPedidoAluno": 2,
              "txTipoPedidoAluno": "Quebra de Requisito",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            }
          ]
        },
        {
          "retorno": null,
          "mensagem": null,
          "cdDisciplina": 10603,
          "nmNome": "Sistemas de Compressao Industrial",
          "sgCodicred": null,
          "sgCodi": "4445M",
          "sgCred": "04",
          "cdNivel": 8,
          "tipoDisciplina": "Curricular",
          "idTipoDisciplina": null,
          "nrCreditosPre": 0,
          "stStatus": null,
          "txCursado": null,
          "txPlanejado": null,
          "txCorequisito": null,
          "cdCoRequisito": null,
          "disciplinasPreRequisito": "\n4445B-04 - Sistemas Fluidomecânicos",
          "disciplinasSubstitutas": "",
          "disciplinasCoRequisitos": "",
          "disciplinasRequisitosEspeciais": "\n4444U-04 - Elementos de Máquinas",
          "tipoRequisito": [],
          "turmas": [],
          "txTipoDisciplina": null,
          "cdGrupo": "00",
          "cdTipoDisciplina": 1,
          "qtCargaHoraria": 60,
          "temPreRequisito": true,
          "temCoRequisito": false,
          "temRequisitoEspecial": true,
          "temSubstituta": false,
          "listTipoPedidoAluno": [
            {
              "idTipoPedidoAluno": 1,
              "txTipoPedidoAluno": "Disciplina Substituta",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            },
            {
              "idTipoPedidoAluno": 2,
              "txTipoPedidoAluno": "Quebra de Requisito",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            }
          ]
        },
        {
          "retorno": null,
          "mensagem": null,
          "cdDisciplina": 6597,
          "nmNome": "Trocadores de Calor",
          "sgCodicred": null,
          "sgCodi": "4440H",
          "sgCred": "04",
          "cdNivel": 8,
          "tipoDisciplina": "Curricular",
          "idTipoDisciplina": null,
          "nrCreditosPre": 0,
          "stStatus": null,
          "txCursado": null,
          "txPlanejado": null,
          "txCorequisito": null,
          "cdCoRequisito": null,
          "disciplinasPreRequisito": "",
          "disciplinasSubstitutas": "\n44639-04 - Tópicos Especiais I - Eca",
          "disciplinasCoRequisitos": "\n4445D-02 - Fenômenos de Convecção",
          "disciplinasRequisitosEspeciais": "",
          "tipoRequisito": [],
          "turmas": [],
          "txTipoDisciplina": null,
          "cdGrupo": "00",
          "cdTipoDisciplina": 1,
          "qtCargaHoraria": 60,
          "temPreRequisito": false,
          "temCoRequisito": true,
          "temRequisitoEspecial": false,
          "temSubstituta": true,
          "listTipoPedidoAluno": [
            {
              "idTipoPedidoAluno": 1,
              "txTipoPedidoAluno": "Disciplina Substituta",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            },
            {
              "idTipoPedidoAluno": 2,
              "txTipoPedidoAluno": "Quebra de Requisito",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            }
          ]
        }
      ]
    },
    {
      "txSemestre": "2021/2",
      "cdPeriodo": 244,
      "nrTotalCreditos": 24,
      "disciplinaDtoList": [
        {
          "retorno": null,
          "mensagem": null,
          "cdDisciplina": 10605,
          "nmNome": "Automação Industrial - Em",
          "sgCodicred": null,
          "sgCodi": "4445P",
          "sgCred": "02",
          "cdNivel": 9,
          "tipoDisciplina": "Curricular",
          "idTipoDisciplina": null,
          "nrCreditosPre": 0,
          "stStatus": null,
          "txCursado": null,
          "txPlanejado": null,
          "txCorequisito": null,
          "cdCoRequisito": null,
          "disciplinasPreRequisito": "",
          "disciplinasSubstitutas": "\n4454H-04 - Automacao\n44632-04 - Análise de Sistemas de Controle\n44637-04 - Automação",
          "disciplinasCoRequisitos": "",
          "disciplinasRequisitosEspeciais": "\n4445H-02 - Engenharia de Controle",
          "tipoRequisito": [],
          "turmas": [],
          "txTipoDisciplina": null,
          "cdGrupo": "00",
          "cdTipoDisciplina": 1,
          "qtCargaHoraria": 30,
          "temPreRequisito": false,
          "temCoRequisito": false,
          "temRequisitoEspecial": true,
          "temSubstituta": true,
          "listTipoPedidoAluno": [
            {
              "idTipoPedidoAluno": 1,
              "txTipoPedidoAluno": "Disciplina Substituta",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            },
            {
              "idTipoPedidoAluno": 2,
              "txTipoPedidoAluno": "Quebra de Requisito",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            }
          ]
        },
        {
          "retorno": null,
          "mensagem": null,
          "cdDisciplina": 10613,
          "nmNome": "Controle de Qualidade Industrial",
          "sgCodicred": null,
          "sgCodi": "4446B",
          "sgCred": "02",
          "cdNivel": 10,
          "tipoDisciplina": "Curricular",
          "idTipoDisciplina": null,
          "nrCreditosPre": 190,
          "stStatus": null,
          "txCursado": null,
          "txPlanejado": null,
          "txCorequisito": null,
          "cdCoRequisito": null,
          "disciplinasPreRequisito": "",
          "disciplinasSubstitutas": "\n4481L-04 - Gestao de Qualidade - Eq",
          "disciplinasCoRequisitos": "",
          "disciplinasRequisitosEspeciais": "",
          "tipoRequisito": [],
          "turmas": [],
          "txTipoDisciplina": null,
          "cdGrupo": "00",
          "cdTipoDisciplina": 1,
          "qtCargaHoraria": 30,
          "temPreRequisito": false,
          "temCoRequisito": false,
          "temRequisitoEspecial": false,
          "temSubstituta": true,
          "listTipoPedidoAluno": [
            {
              "idTipoPedidoAluno": 1,
              "txTipoPedidoAluno": "Disciplina Substituta",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            },
            {
              "idTipoPedidoAluno": 2,
              "txTipoPedidoAluno": "Quebra de Requisito",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            }
          ]
        },
        {
          "retorno": null,
          "mensagem": null,
          "cdDisciplina": 27839,
          "nmNome": "Engenharia Ambiental I",
          "sgCodicred": null,
          "sgCodi": "4481Y",
          "sgCred": "02",
          "cdNivel": 10,
          "tipoDisciplina": "Curricular",
          "idTipoDisciplina": null,
          "nrCreditosPre": 170,
          "stStatus": null,
          "txCursado": null,
          "txPlanejado": null,
          "txCorequisito": null,
          "cdCoRequisito": null,
          "disciplinasPreRequisito": "",
          "disciplinasSubstitutas": "\n4444F-02 - Recursos Energéticos e Ambiente\n4441D-04 - Recursos Energeticos\n4470U-02 - Gestao Ambiental I",
          "disciplinasCoRequisitos": "",
          "disciplinasRequisitosEspeciais": "",
          "tipoRequisito": [],
          "turmas": [],
          "txTipoDisciplina": null,
          "cdGrupo": "00",
          "cdTipoDisciplina": 1,
          "qtCargaHoraria": 30,
          "temPreRequisito": false,
          "temCoRequisito": false,
          "temRequisitoEspecial": false,
          "temSubstituta": true,
          "listTipoPedidoAluno": [
            {
              "idTipoPedidoAluno": 1,
              "txTipoPedidoAluno": "Disciplina Substituta",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            },
            {
              "idTipoPedidoAluno": 2,
              "txTipoPedidoAluno": "Quebra de Requisito",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            }
          ]
        },
        {
          "retorno": null,
          "mensagem": null,
          "cdDisciplina": 10607,
          "nmNome": "Engenharia Assist. por Computador (Cae)",
          "sgCodicred": null,
          "sgCodi": "4445T",
          "sgCred": "02",
          "cdNivel": 9,
          "tipoDisciplina": "Curricular",
          "idTipoDisciplina": null,
          "nrCreditosPre": 0,
          "stStatus": null,
          "txCursado": null,
          "txPlanejado": null,
          "txCorequisito": null,
          "cdCoRequisito": null,
          "disciplinasPreRequisito": "",
          "disciplinasSubstitutas": "",
          "disciplinasCoRequisitos": "\n4445F-02 - Mecânica do Contínuo",
          "disciplinasRequisitosEspeciais": "\n4444X-02 - Projeto Mec. Assist. por Computador (Cad)",
          "tipoRequisito": [],
          "turmas": [],
          "txTipoDisciplina": null,
          "cdGrupo": "00",
          "cdTipoDisciplina": 1,
          "qtCargaHoraria": 30,
          "temPreRequisito": false,
          "temCoRequisito": true,
          "temRequisitoEspecial": true,
          "temSubstituta": false,
          "listTipoPedidoAluno": [
            {
              "idTipoPedidoAluno": 1,
              "txTipoPedidoAluno": "Disciplina Substituta",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            },
            {
              "idTipoPedidoAluno": 2,
              "txTipoPedidoAluno": "Quebra de Requisito",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            }
          ]
        },
        {
          "retorno": null,
          "mensagem": null,
          "cdDisciplina": 10609,
          "nmNome": "Estágio Supervisionado - em (190 Hrs)",
          "sgCodicred": null,
          "sgCodi": "4445V",
          "sgCred": "02",
          "cdNivel": 9,
          "tipoDisciplina": "Curricular",
          "idTipoDisciplina": null,
          "nrCreditosPre": 180,
          "stStatus": null,
          "txCursado": null,
          "txPlanejado": null,
          "txCorequisito": null,
          "cdCoRequisito": null,
          "disciplinasPreRequisito": "",
          "disciplinasSubstitutas": "\n4456W-02 - Estágio Supervisionado - Ec (190 Hrs)\n4422Y-02 - Estagio Supervisionado - Ecivil (190 Hrs)\n4457N-02 - Estágio Supervisionado - Ee (190 Hrs)\n4471H-02 - Estagio Supervisionado - Ep (190 Hrs)\n4481B-02 - Estagio Supervisionado - Eq (190 Hrs)\n44641-02 - Estágio Supervisionado - Eca (190 Hrs)",
          "disciplinasCoRequisitos": "",
          "disciplinasRequisitosEspeciais": "",
          "tipoRequisito": [],
          "turmas": [],
          "txTipoDisciplina": null,
          "cdGrupo": "00",
          "cdTipoDisciplina": 1,
          "qtCargaHoraria": 190,
          "temPreRequisito": false,
          "temCoRequisito": false,
          "temRequisitoEspecial": false,
          "temSubstituta": true,
          "listTipoPedidoAluno": [
            {
              "idTipoPedidoAluno": 1,
              "txTipoPedidoAluno": "Disciplina Substituta",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            },
            {
              "idTipoPedidoAluno": 2,
              "txTipoPedidoAluno": "Quebra de Requisito",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            }
          ]
        },
        {
          "retorno": null,
          "mensagem": null,
          "cdDisciplina": 6627,
          "nmNome": "Projeto de Produto",
          "sgCodicred": null,
          "sgCodi": "4441F",
          "sgCred": "04",
          "cdNivel": 10,
          "tipoDisciplina": "Curricular",
          "idTipoDisciplina": null,
          "nrCreditosPre": 170,
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
          "turmas": [],
          "txTipoDisciplina": null,
          "cdGrupo": "00",
          "cdTipoDisciplina": 1,
          "qtCargaHoraria": 60,
          "temPreRequisito": false,
          "temCoRequisito": false,
          "temRequisitoEspecial": false,
          "temSubstituta": false,
          "listTipoPedidoAluno": [
            {
              "idTipoPedidoAluno": 1,
              "txTipoPedidoAluno": "Disciplina Substituta",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            },
            {
              "idTipoPedidoAluno": 2,
              "txTipoPedidoAluno": "Quebra de Requisito",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            }
          ]
        },
        {
          "retorno": null,
          "mensagem": null,
          "cdDisciplina": 10610,
          "nmNome": "Projeto Mecânico",
          "sgCodicred": null,
          "sgCodi": "4445W",
          "sgCred": "04",
          "cdNivel": 9,
          "tipoDisciplina": "Curricular",
          "idTipoDisciplina": null,
          "nrCreditosPre": 0,
          "stStatus": null,
          "txCursado": null,
          "txPlanejado": null,
          "txCorequisito": null,
          "cdCoRequisito": null,
          "disciplinasPreRequisito": "",
          "disciplinasSubstitutas": "",
          "disciplinasCoRequisitos": "",
          "disciplinasRequisitosEspeciais": "\n4444U-04 - Elementos de Máquinas\n4444X-02 - Projeto Mec. Assist. por Computador (Cad)",
          "tipoRequisito": [],
          "turmas": [],
          "txTipoDisciplina": null,
          "cdGrupo": "00",
          "cdTipoDisciplina": 1,
          "qtCargaHoraria": 60,
          "temPreRequisito": false,
          "temCoRequisito": false,
          "temRequisitoEspecial": true,
          "temSubstituta": false,
          "listTipoPedidoAluno": [
            {
              "idTipoPedidoAluno": 1,
              "txTipoPedidoAluno": "Disciplina Substituta",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            },
            {
              "idTipoPedidoAluno": 2,
              "txTipoPedidoAluno": "Quebra de Requisito",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            }
          ]
        },
        {
          "retorno": null,
          "mensagem": null,
          "cdDisciplina": 10608,
          "nmNome": "Refrigeração e Ar Condicionado",
          "sgCodicred": null,
          "sgCodi": "4445U",
          "sgCred": "04",
          "cdNivel": 9,
          "tipoDisciplina": "Curricular",
          "idTipoDisciplina": null,
          "nrCreditosPre": 0,
          "stStatus": null,
          "txCursado": null,
          "txPlanejado": null,
          "txCorequisito": null,
          "cdCoRequisito": null,
          "disciplinasPreRequisito": "",
          "disciplinasSubstitutas": "",
          "disciplinasCoRequisitos": "\n4445M-04 - Sistemas de Compressao Industrial",
          "disciplinasRequisitosEspeciais": "",
          "tipoRequisito": [],
          "turmas": [],
          "txTipoDisciplina": null,
          "cdGrupo": "00",
          "cdTipoDisciplina": 1,
          "qtCargaHoraria": 60,
          "temPreRequisito": false,
          "temCoRequisito": true,
          "temRequisitoEspecial": false,
          "temSubstituta": false,
          "listTipoPedidoAluno": [
            {
              "idTipoPedidoAluno": 1,
              "txTipoPedidoAluno": "Disciplina Substituta",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            },
            {
              "idTipoPedidoAluno": 2,
              "txTipoPedidoAluno": "Quebra de Requisito",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            }
          ]
        },
        {
          "retorno": null,
          "mensagem": null,
          "cdDisciplina": 10612,
          "nmNome": "Trabalho de Conclusão de Curso - Em",
          "sgCodicred": null,
          "sgCodi": "4446A",
          "sgCred": "02",
          "cdNivel": 10,
          "tipoDisciplina": "Curricular",
          "idTipoDisciplina": null,
          "nrCreditosPre": 200,
          "stStatus": null,
          "txCursado": null,
          "txPlanejado": null,
          "txCorequisito": null,
          "cdCoRequisito": null,
          "disciplinasPreRequisito": "",
          "disciplinasSubstitutas": "\n4621E-02 - Trabalho de Conclusão de Curso - Ec\n4423D-02 - Trabalho de Conclusão de Curso - Ecivil\n4457Y-02 - Trabalho de Conclusao de Curso (Ee)\n4481R-02 - Trabalho de Conclusao de Curso I - Eq\n44642-02 - Trabalho de Conclusão de Curso - Eca\n4471T-02 - Trabalho de Conclusao de Curso - Ep",
          "disciplinasCoRequisitos": "",
          "disciplinasRequisitosEspeciais": "",
          "tipoRequisito": [],
          "turmas": [],
          "txTipoDisciplina": null,
          "cdGrupo": "00",
          "cdTipoDisciplina": 1,
          "qtCargaHoraria": 30,
          "temPreRequisito": false,
          "temCoRequisito": false,
          "temRequisitoEspecial": false,
          "temSubstituta": true,
          "listTipoPedidoAluno": [
            {
              "idTipoPedidoAluno": 1,
              "txTipoPedidoAluno": "Disciplina Substituta",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            },
            {
              "idTipoPedidoAluno": 2,
              "txTipoPedidoAluno": "Quebra de Requisito",
              "stAtivo": "S",
              "stSolicitado": false,
              "stPodeSolicitar": false
            }
          ]
        }
      ]
    },
    {
      "txSemestre": "2022/1",
      "cdPeriodo": 245,
      "nrTotalCreditos": 0,
      "disciplinaDtoList": []
    }
  ],
  "periodoList": [
    {
      "cdPeriodo": 239,
      "txPeriodo": "2019/2"
    },
    {
      "cdPeriodo": 241,
      "txPeriodo": "2020/1"
    },
    {
      "cdPeriodo": 242,
      "txPeriodo": "2020/2"
    },
    {
      "cdPeriodo": 243,
      "txPeriodo": "2021/1"
    },
    {
      "cdPeriodo": 244,
      "txPeriodo": "2021/2"
    },
    {
      "cdPeriodo": 245,
      "txPeriodo": "2022/1"
    }
  ],
  "maxDisciplinaSemestre": 14
}]