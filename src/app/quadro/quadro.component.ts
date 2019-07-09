import { Component, OnInit } from '@angular/core';
import { Quadro } from '../model/quadro';
import { GradeService } from '../service/grade.service';

@Component({
  selector: 'app-quadro',
  templateUrl: './quadro.component.html',
  styleUrls: ['./quadro.component.css']
})
export class QuadroComponent implements OnInit {

  private quadros: Quadro[] = [];

  constructor(private gradeService: GradeService) { }

  ngOnInit() {
    this.quadros = this.gradeService.montaQuadros();
    console.log(this.quadros);
  }

}