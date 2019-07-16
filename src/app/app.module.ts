import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QuadroComponent } from './quadro/quadro.component';
import { HttpClientModule } from '@angular/common/http';
import { FiltroComponent } from './filtro/filtro.component';
import { CurriculoComponent } from './curriculo/curriculo.component';
@NgModule({
  declarations: [
    AppComponent,
    QuadroComponent,
    FiltroComponent,
    CurriculoComponent,
  ],
  imports: [
    BrowserModule,
    ClarityModule,
    BrowserAnimationsModule,
    HttpClientModule 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
