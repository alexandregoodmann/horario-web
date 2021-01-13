import { Component, OnInit } from '@angular/core';
import { Nivel } from '../model/nivel';
import { NivelService } from '../service/nivel.service';

@Component({
  selector: 'app-curriculo',
  templateUrl: './curriculo.component.html',
  styleUrls: ['./curriculo.component.css']
})
export class CurriculoComponent implements OnInit {

  niveis: Nivel[] = [];
  disciplinas = 0;
  cursadas = 0;
  cursado = 0;

  constructor(
    private nivelService: NivelService
  ) { }

  ngOnInit() {
    this.niveis = this.nivelService.getNiveis();
    this.getResumo();
  }

  getResumo() {
    this.niveis.forEach(n => {
      this.disciplinas = this.disciplinas + n.disciplinas.length;
      n.disciplinas.forEach(d => {
        this.cursadas = (d.situacao === 'CURSADO') ? this.cursadas + 1 : this.cursadas;
      })
    });
    this.cursado = this.cursadas / this.disciplinas;
  }

}