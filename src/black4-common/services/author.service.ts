import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AlertService } from './alert.service';
import { Author } from '../models/author';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    // token ?
    // 'Authorization': 'my-auth-token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthorService {



  constructor(
    // private alertService: AlertService,
    private http: HttpClient
  ) { }

  /** GET Authors from the server */
  getAllAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>(`${environment.apiUrl}/authors`)
      .pipe(
        catchError(this.handleError<Author[]>('getAuthors', []))
      );
  }

  getAuthorById(authorId: number): Observable<Author> {
    return this.http.get<Author>(`${environment.apiUrl}/authors/${authorId}`)
      .pipe(
        catchError(this.handleError<Author>(`getAuthors id=${authorId}`))
      );
  }

  updateAuthor(authorId: number, author: Author): Observable<Author> {
    return this.http.put<Author>(`${environment.apiUrl}/authors/${authorId}/edit`, author, httpOptions)
      .pipe(
        catchError(this.handleError<Author>(`getAuthors id=${authorId}`))
      )
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  // /** Log a HeroService message with the MessageService */
  // private log(message: string) {
  //   this.alertService.add(`HeroService: ${message}`);
  // }
}
