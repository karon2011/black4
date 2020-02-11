import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  // private usersUrl = 'api/users';
  private usersUrl = 'http://127.0.0.1:8000/users';


  constructor(
    private http: HttpClient
  ) { }

  getAll() {
    return this.http.get<User[]>(`${config.apiUrl}/users`);
  }

  /** GET Users from the server */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl)
      .pipe(
        // tap(_ => this.log('fetched heroes')),
        catchError(this.handleError<User[]>('getUsers', []))
      );
  }

  // getById(id: number) {
  //   return this.http.get(`${config.apiUrl}/users/${id}`);
  // }

  register(user: User) {
    return this.http.post(`${config.apiUrl}/users/register`, user);
  }

  // update(user: User) {
  //   return this.http.put(`${config.apiUrl}/users/${user.id}`, user);
  // }

  // delete(id: number) {
  //   return this.http.delete(`${config.apiUrl}/users/${id}`);
  // }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    }
  }
}
