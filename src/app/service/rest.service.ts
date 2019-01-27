import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Quadro } from '../model/quadro';
import { Filtro } from '../model/filtro';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  private endpoint = 'http://localhost:8080';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  /*
  getQuadros(): Observable<any> {
    this.http.get
    return this.http.get(this.endpoint + '/quadros', {, this.httpOptions }).pipe(
      map(this.extractData), catchError(this.handleError<any>('getQuadros()'))
    );
  }*/

  getQuadros(filtro: Filtro): Observable<Quadro[]> {

    console.log('--->>>' + JSON.stringify(filtro));
    
    const options = filtro ?
      { params: new HttpParams().set('filtro', JSON.stringify(filtro)) } : {};

    return this.http.get<Quadro[]>(this.endpoint + '/quadros', options)
      .pipe(
        catchError(this.handleError<Quadro[]>('getQuadros', []))
      );
  }

  getCadeiras(): Observable<any> {
    return this.http.get(this.endpoint + '/cadeiras').pipe(
      map(this.extractData));
  }

  getDisciplinas(): Observable<any> {
    return this.http.get(this.endpoint + '/disciplinas').pipe(
      map(this.extractData));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
