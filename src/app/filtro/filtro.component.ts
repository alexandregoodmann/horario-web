import { Component, OnInit } from '@angular/core';
import { Periodo } from '../model/periodo';
import { GradeService } from '../service/grade.service';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit {

  private periodos: Periodo[] = [];

  constructor(private gradeService: GradeService) {}

  ngOnInit() {
    this.gradeService.periodoObservable.subscribe(data => {
      this.periodos = data;
    });
  }

  atualizar() {
    console.log(this.periodos);
  }

  mudar(periodo: Periodo) {
    if (periodo.checked) {
      periodo.checked = false;
    } else {
      periodo.checked = true;
    }
  }

}