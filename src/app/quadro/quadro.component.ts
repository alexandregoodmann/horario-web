import { Component, OnInit } from '@angular/core';
import { Quadro } from '../model/quadro';
import { QuadroService } from '../service/quadro.service';

@Component({
  selector: 'app-quadro',
  templateUrl: './quadro.component.html',
  styleUrls: ['./quadro.component.css']
})
export class QuadroComponent implements OnInit {

  private quadros: Quadro[] = [];

  constructor(private quadroService: QuadroService) { }

  ngOnInit() {
    this.quadroService.quadrosObservable.subscribe(data => {
      console.log(data);
      this.quadros = data;
    }); 
  }

}