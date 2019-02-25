import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Filtro } from '../model/filtro';
import { Quadro } from '../model/quadro';

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

  private quadrosSource = new BehaviorSubject<Array<Quadro>>(new Array<Quadro>());
  quadros = this.quadrosSource.asObservable();

  setQuadroSource(quadros: Quadro[]) {
    this.quadrosSource.next(quadros);
  }

  getQuadros(filtro: Filtro) {
    return this.http.post(this.endpoint + '/quadros', filtro);
  }

  getCadeiras(): Observable<any> {
    return this.http.get(this.endpoint + '/cadeiras').pipe(
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
