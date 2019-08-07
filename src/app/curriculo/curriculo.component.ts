import { Component, OnInit } from '@angular/core';
import { Disciplina } from '../model/disciplina';
import { Nivel } from '../model/nivel';
import { NivelService } from '../service/nivel.service';

@Component({
  selector: 'app-curriculo',
  templateUrl: './curriculo.component.html',
  styleUrls: ['./curriculo.component.css']
})
export class CurriculoComponent implements OnInit {

  niveis: Nivel[] = [];
  cursados: number = 0;
  creditos: number = 0;

  constructor(
    private nivelService: NivelService
  ) { }

  ngOnInit() {
    this.niveis = this.nivelService.getNiveis();
    this.niveis.forEach(n => {
      this.creditos = this.creditos + n.creditos;
      this.cursados = this.cursados + n.cursados;
    });
  }

  requisitos(di: Disciplina) {
    di.clazz = di.clazz + ' selecionado';
    let dependencias = this.nivelService.getDependencias(di.sgCodicred);
    dependencias.forEach(dep => {
      let nivel = this.niveis[dep.cdNivel - 1];
      nivel.disciplinas.forEach(disciplina => {
        if (dep.sgCodicred === disciplina.sgCodicred) {
          disciplina.clazz = disciplina.clazz + ' marcado'
        }
      });
    });
  }


}