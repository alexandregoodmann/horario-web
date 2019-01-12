import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LercadeiraComponent } from './lercadeira/lercadeira.component';
import { PeriodoComponent } from './periodo/periodo.component';
import { CadeiraComponent } from './cadeira/cadeira.component';
import { QuadroComponent } from './quadro/quadro.component';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    LercadeiraComponent,
    PeriodoComponent,
    CadeiraComponent,
    QuadroComponent,
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
