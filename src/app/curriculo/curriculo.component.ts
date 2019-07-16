import { Component, OnInit } from '@angular/core';
import { NivelService } from '../service/nivel.service';

@Component({
  selector: 'app-curriculo',
  templateUrl: './curriculo.component.html',
  styleUrls: ['./curriculo.component.css']
})
export class CurriculoComponent implements OnInit {

  constructor(
    private nivelService: NivelService
  ) { }

  ngOnInit() {
    console.log(this.nivelService.getCurriculo());
  }

}
