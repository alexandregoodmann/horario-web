import { Component, OnInit } from '@angular/core';
import { Cadeira } from '../model/cadeira';
import { Quadro } from '../model/quadro';
import { QuadroService } from '../service/quadro.service';
import { RestService } from '../service/rest.service';

@Component({
  selector: 'app-quadro',
  templateUrl: './quadro.component.html',
  styleUrls: ['./quadro.component.css']
})
export class QuadroComponent implements OnInit {

  private quadros: Quadro[] = [];
  private sugestoes: Cadeira[] = [];

  constructor(
    private rest: RestService,
    private quadroService: QuadroService) { }

  ngOnInit() {
    this.quadros = this.quadroService.montarQuadros();
    console.log(this.quadros);
  }

  showSugestoes(dia: number) {

    let cadeiras = new Map<string, Cadeira>();
    this.sugestoes = new Array<Cadeira>();

    /*
    this.rest.quadros.subscribe(data => {
      data.forEach(quadro => {
        let periodos = quadro.periodos.filter(o => o.periodo === periodo.periodo);
        periodos.forEach(per => {
          switch (dia) {
            case 2:
              if (per.segunda.codigo !== '' && per.segunda.codigo !== periodo.segunda.codigo) {
                cadeiras.set(per.segunda.codigo, per.segunda);
              }
              break;
            case 3:
              if (per.terca.codigo !== '' && per.terca.codigo !== periodo.terca.codigo) {
                cadeiras.set(per.terca.codigo, per.terca);
              }
              break;
            case 4:
              if (per.quarta.codigo !== '' && per.quarta.codigo !== periodo.quarta.codigo) {
                cadeiras.set(per.quarta.codigo, per.quarta);
              }
              break;
            case 5:
              if (per.quinta.codigo !== '' && per.quinta.codigo !== periodo.quinta.codigo) {
                cadeiras.set(per.quinta.codigo, per.quinta);
              }
              break;
            case 6:
              if (per.sexta.codigo !== '' && per.sexta.codigo !== periodo.sexta.codigo) {
                cadeiras.set(per.sexta.codigo, per.sexta);
              }
              break;
            default:
              break;
          }
        });
      })
    });
*/

    cadeiras.forEach(data => {
      this.sugestoes.push(data);
    });

    console.log(this.sugestoes);
  }

}
