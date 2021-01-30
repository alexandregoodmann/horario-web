import { Injectable } from '@angular/core';
import { Disciplina } from '../model/disciplina';
import { Nivel } from '../model/nivel';

@Injectable({
  providedIn: 'root'
})
export class NivelService {

  getNiveis() {

    let mapa = this.getCurriculo();
    let niveis = new Array<Nivel>();

    mapa.forEach((v, k) => {
      let nivel = new Nivel();
      nivel.nivel = k;
      nivel.disciplinas = v;
      niveis.push(nivel);
    });

    return niveis;
  }

  private parseObjToDisciplina(obj: any): Disciplina {
    let dis = new Disciplina();
    dis.ch = obj.CH;
    dis.codigo = obj.CODIGO;
    dis.disciplina = obj.DISCIPLINA;
    dis.situacao = obj.SITUACAO;
    return dis;
  }

  private getCurriculo() {
    let mapa: Map<number, Array<Disciplina>> = new Map<number, Array<Disciplina>>();
    for (let i = 1; i <= 10; i++) {
      mapa.set(i, new Array<Disciplina>());
    }

    CURRICULO_RITTER.curriculo.forEach(o => {
      let disciplinas = mapa.get(Number.parseInt(o.SEMESTRE));
      disciplinas.push(this.parseObjToDisciplina(o));
    });

    return mapa;
  }
}

const CURRICULO_RITTER = {
  curriculo: [
    {
      "SEMESTRE": "1",
      "CODIGO": "AIM0105",
      "DISCIPLINA": "ALGORITMOS E PROGRAMACAO",
      "CH": "66",
      "SITUACAO": "CURSADO"
    },
    {
      "SEMESTRE": "1",
      "CODIGO": "AIM0205",
      "DISCIPLINA": "COMUNICACAO",
      "CH": "88",
      "SITUACAO": "CURSADO"
    },
    {
      "SEMESTRE": "1",
      "CODIGO": "AIM1824",
      "DISCIPLINA": "DESENHO TÉCNICO E COMPUTACIONAL",
      "CH": "99",
      "SITUACAO": "CURSADO"
    },
    {
      "SEMESTRE": "1",
      "CODIGO": "AIM1825",
      "DISCIPLINA": "ENGENHARIA E INOVAÇÃO",
      "CH": "66",
      "SITUACAO": "CURSADO"
    },
    {
      "SEMESTRE": "1",
      "CODIGO": "AIM1826",
      "DISCIPLINA": "ESTATÍSTICA E PROBABILIDADE APLICADA",
      "CH": "66",
      "SITUACAO": "CURSADO"
    },
    {
      "SEMESTRE": "2",
      "CODIGO": "AIM1827",
      "DISCIPLINA": "CÁLCULO APLICADO - UMA VARIÁVEL",
      "CH": "66",
      "SITUACAO": "CURSADO"
    },
    {
      "SEMESTRE": "2",
      "CODIGO": "AIM1830",
      "DISCIPLINA": "CRIATIVIDADE, IDEAÇÃO E RESOLUÇÃO DE PROBLEMAS",
      "CH": "66",
      "SITUACAO": "DISPENSA"
    },
    {
      "SEMESTRE": "2",
      "CODIGO": "AIM0504",
      "DISCIPLINA": "GESTAO DAS ORGANIZACOES",
      "CH": "88",
      "SITUACAO": "CURSADO"
    },
    {
      "SEMESTRE": "2",
      "CODIGO": "AIM1828",
      "DISCIPLINA": "LABORATÓRIO DE MATEMÁTICA E FÍSICA",
      "CH": "66",
      "SITUACAO": "CURSADO"
    },
    {
      "SEMESTRE": "2",
      "CODIGO": "AIM1853",
      "DISCIPLINA": "METROLOGIA",
      "CH": "33",
      "SITUACAO": "CURSADO"
    },
    {
      "SEMESTRE": "2",
      "CODIGO": "AIM1829",
      "DISCIPLINA": "QUÍMICA GERAL E CIÊNCIAS DOS MATERIAIS",
      "CH": "66",
      "SITUACAO": "CURSADO"
    },
    {
      "SEMESTRE": "3",
      "CODIGO": "AIM1832",
      "DISCIPLINA": "CÁLCULO APLICADO – VÁRIAS VARIÁVEIS",
      "CH": "66",
      "SITUACAO": "CURSADO"
    },
    {
      "SEMESTRE": "3",
      "CODIGO": "AIM1831",
      "DISCIPLINA": "CÁLCULO NUMÉRICO COMPUTACIONAL",
      "CH": "33",
      "SITUACAO": "CURSADO"
    },
    {
      "SEMESTRE": "3",
      "CODIGO": "AIM1835",
      "DISCIPLINA": "DESENVOLVIMENTO INTEGRADO DE PRODUTOS",
      "CH": "33",
      "SITUACAO": "CURSADO"
    },
    {
      "SEMESTRE": "3",
      "CODIGO": "AIM1836",
      "DISCIPLINA": "ESTATÍSTICA APLICADA AO DATA SCIENCE",
      "CH": "88",
      "SITUACAO": "DISPENSA"
    },
    {
      "SEMESTRE": "3",
      "CODIGO": "AIM1833",
      "DISCIPLINA": "FÍSICA - DINÂMICA E TERMODINÂMICA",
      "CH": "66",
      "SITUACAO": "CURSADO"
    },
    {
      "SEMESTRE": "3",
      "CODIGO": "AIM1834",
      "DISCIPLINA": "MECÂNICA DOS SÓLIDOS - ESTÁTICA",
      "CH": "66",
      "SITUACAO": "CURSADO"
    },
    {
      "SEMESTRE": "3",
      "CODIGO": "AIM0895",
      "DISCIPLINA": "PROJETOS DE ENGENHARIA",
      "CH": "66",
      "SITUACAO": "CURSADO"
    },
    {
      "SEMESTRE": "4",
      "CODIGO": "AIM1839",
      "DISCIPLINA": "ÁLGEBRA LINEAR COMPUTACIONAL",
      "CH": "66",
      "SITUACAO": "CURSADO"
    },
    {
      "SEMESTRE": "4",
      "CODIGO": "AIM1837",
      "DISCIPLINA": "EMPREENDEDORISMO TECNOLÓGICO",
      "CH": "33",
      "SITUACAO": "CURSADO"
    },
    {
      "SEMESTRE": "4",
      "CODIGO": "AIM0435",
      "DISCIPLINA": "FENOMENOS DE TRANSPORTE",
      "CH": "33",
      "SITUACAO": "MATRICULADO"
    },
    {
      "SEMESTRE": "4",
      "CODIGO": "AIM1838",
      "DISCIPLINA": "FÍSICA - ONDAS, ELETRICIDADE E MAGNETISMO",
      "CH": "66",
      "SITUACAO": "CURSADO"
    },
    {
      "SEMESTRE": "4",
      "CODIGO": "AIM0814",
      "DISCIPLINA": "PRATICAS INDUSTRIAIS",
      "CH": "66",
      "SITUACAO": "CURSADO"
    },
    {
      "SEMESTRE": "4",
      "CODIGO": "AIM1840",
      "DISCIPLINA": "SEGURANÇA E SAÚDE DO TRABALHO",
      "CH": "88",
      "SITUACAO": "CURSADO"
    },
    {
      "SEMESTRE": "4",
      "CODIGO": "AIM0957",
      "DISCIPLINA": "SELECAO DE MATERIAIS MECANICOS",
      "CH": "33",
      "SITUACAO": "CURSADO"
    },
    {
      "SEMESTRE": "5",
      "CODIGO": "AIM0261",
      "DISCIPLINA": "DESENVOLVIMENTO HUMANO E SOCIAL",
      "CH": "88",
      "SITUACAO": "CURSADO"
    },
    {
      "SEMESTRE": "5",
      "CODIGO": "AIM0674",
      "DISCIPLINA": "MATERIAIS PARA ENGENHARIA MECANICA",
      "CH": "66",
      "SITUACAO": "CURSADO"
    },
    {
      "SEMESTRE": "5",
      "CODIGO": "AIM0677",
      "DISCIPLINA": "MECANICA DOS FLUIDOS",
      "CH": "66",
      "SITUACAO": "CURSADO"
    },
    {
      "SEMESTRE": "5",
      "CODIGO": "AIM0827",
      "DISCIPLINA": "PROCESSOS DE CONFORMACAO MECANICA",
      "CH": "66",
      "SITUACAO": "MATRICULADO",
    },
    {
      "SEMESTRE": "5",
      "CODIGO": "AIM0936",
      "DISCIPLINA": "RESISTENCIA DOS MATERIAIS",
      "CH": "66",
      "SITUACAO": "CURSADO"
    },
    {
      "SEMESTRE": "6",
      "CODIGO": "AIM0122",
      "DISCIPLINA": "ANTROPOLOGIA E CULTURA BRASILEIRA",
      "CH": "88",
      "SITUACAO": "CURSADO"
    },
    {
      "SEMESTRE": "6",
      "CODIGO": "AIM0326",
      "DISCIPLINA": "ELEMENTOS DE MAQUINAS",
      "CH": "66",
      "SITUACAO": "MATRICULADO"
    },
    {
      "SEMESTRE": "6",
      "CODIGO": "AIM1856",
      "DISCIPLINA": "ENGENHARIA DE MANUTENÇÃO E CONFIABILIDADE",
      "CH": "66",
      "SITUACAO": "CURSADO"
    },
    {
      "SEMESTRE": "6",
      "CODIGO": "AIM0661",
      "DISCIPLINA": "MAQUINAS HIDRAULICAS",
      "CH": "66",
      "SITUACAO": "CURSADO"
    },
    {
      "SEMESTRE": "6",
      "CODIGO": "AIM1039",
      "DISCIPLINA": "TERMODINAMICA",
      "CH": "66",
      "SITUACAO": "CURSADO"
    },
    {
      "SEMESTRE": "7",
      "CODIGO": "AIM0327",
      "DISCIPLINA": "ELEMENTOS DE MECANISMOS",
      "CH": "66",
      "SITUACAO": "CURSADO"
    },
    {
      "SEMESTRE": "7",
      "CODIGO": "AIM0658",
      "DISCIPLINA": "MANUFATURA ASSISTIDA POR COMPUTADOR",
      "CH": "66",
      "SITUACAO": "CURSADO"
    },
    {
      "SEMESTRE": "7",
      "CODIGO": "AIM0680",
      "DISCIPLINA": "MECANICA VIBRATORIA",
      "CH": "66",
      "SITUACAO": "CURSADO"
    },
    {
      "SEMESTRE": "7",
      "CODIGO": "AIM0987",
      "DISCIPLINA": "SISTEMAS HIDRAULICOS E PNEUMATICOS",
      "CH": "66",
      "SITUACAO": "MATRICULADO"
    },
    {
      "SEMESTRE": "8",
      "CODIGO": "AIM0500",
      "DISCIPLINA": "GESTAO DA PRODUCAO",
      "CH": "66",
      "SITUACAO": "CURSADO"
    },
    {
      "SEMESTRE": "8",
      "CODIGO": "AIM1846",
      "DISCIPLINA": "PRÉ-PROJETO FINAL DE CURSO EM ENGENHARIA",
      "CH": "66",
      "SITUACAO": "CURSADO"
    },
    {
      "SEMESTRE": "8",
      "CODIGO": "AIM0931",
      "DISCIPLINA": "REFRIGERACAO E AR CONDICIONADO",
      "CH": "66",
      "SITUACAO": "CURSADO"
    },
    {
      "SEMESTRE": "8",
      "CODIGO": "AIM0992",
      "DISCIPLINA": "SISTEMAS TERMICOS",
      "CH": "66",
      "SITUACAO": "CURSADO"
    },
    {
      "SEMESTRE": "8",
      "CODIGO": "AIM1859",
      "DISCIPLINA": "TÉCNICAS CONEXAS E SOLDAGEM",
      "CH": "33",
      "SITUACAO": "CURSADO"
    },
    {
      "SEMESTRE": "8",
      "CODIGO": "AIM1012",
      "DISCIPLINA": "TECNOLOGIAS VEICULARES",
      "CH": "33",
      "SITUACAO": "CURSADO"
    },
    {
      "SEMESTRE": "9",
      "CODIGO": "AIM1849",
      "DISCIPLINA": "ESTÁGIO SUPERVISIONADO EM ENGENHARIA",
      "CH": "180",
      "SITUACAO": "MATRICULADO"
    },
    {
      "SEMESTRE": "9",
      "CODIGO": "AIM0662",
      "DISCIPLINA": "MAQUINAS TERMICAS",
      "CH": "66",
      "SITUACAO": "CURSADO"
    },
    {
      "SEMESTRE": "9",
      "CODIGO": "AIM0744",
      "DISCIPLINA": "OPTATIVA I",
      "CH": "66",
      "SITUACAO": "CURSADO"
    },
    {
      "SEMESTRE": "9",
      "CODIGO": "AIM0865",
      "DISCIPLINA": "PROJETO DE MECANISMO",
      "CH": "66",
      "SITUACAO": "MATRICULADO"
    },
    {
      "SEMESTRE": "9",
      "CODIGO": "AIM1848",
      "DISCIPLINA": "PROJETO FINAL DE CURSO EM ENGENHARIA",
      "CH": "132",
      "SITUACAO": "MATRICULADO"
    },
    {
      "SEMESTRE": "10",
      "CODIGO": "AIM0335",
      "DISCIPLINA": "ENGENHARIA ASSISTIDA POR COMPUTADOR",
      "CH": "66",
      "SITUACAO": "CURSADO"
    },
    {
      "SEMESTRE": "10",
      "CODIGO": "AIM0748",
      "DISCIPLINA": "OPTATIVA II",
      "CH": "66",
      "SITUACAO": "DISPENSA"
    },
    {
      "SEMESTRE": "10",
      "CODIGO": "AIM1860",
      "DISCIPLINA": "SISTEMAS AUTOMATIZADOS NA INDÚSTRIA 4.0",
      "CH": "66",
      "SITUACAO": "CURSADO"
    },
    {
      "SEMESTRE": "10",
      "CODIGO": "AIM0000",
      "DISCIPLINA": "ATIVIDADES COMPLEMENTARES",
      "CH": "255",
      "SITUACAO": "MATRICULADO"
    }
  ]
}