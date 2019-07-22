import { Component, OnInit } from '@angular/core';
import { Disciplina } from '../model/disciplina';
import { NivelService } from '../service/nivel.service';

@Component({
  selector: 'app-curriculo',
  templateUrl: './curriculo.component.html',
  styleUrls: ['./curriculo.component.css']
})
export class CurriculoComponent implements OnInit {

  mapa: Map<number, Array<any>> = new Map<number, Array<any>>();

  constructor(
    private nivelService: NivelService
  ) { }

  ngOnInit() {
    this.mapa = this.nivelService.getCurriculo();
  }

  requisitos(di: Disciplina) {
    di.clazz = di.clazz + ' selecionado';
    let dependencias = this.nivelService.getDependencias(di.sgCodicred);
    dependencias.forEach(dep => {
      let nivel = this.mapa.get(dep.cdNivel);
      nivel.forEach(disciplina => {
        if (dep.sgCodicred === disciplina.sgCodicred) {
          disciplina.clazz = disciplina.clazz + ' marcado'
        }
      });
    });
  }


}