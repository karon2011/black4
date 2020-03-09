import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient
  ) { }

  getAllUsers() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
  }

  /** GET Users from the server */
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/users`)
      .pipe(
        catchError(this.handleError<User[]>('getUsers', []))
      );
  }

  getUserById(id: number) {
    return this.http.get(`${environment.apiUrl}/users/${id}`);
  }

  register(user: User) {
    return this.http.post(`${environment.apiUrl}/register`, user);
  }

  update(user: User) {
    return this.http.put(`${environment.apiUrl}/users/${user.id}`, user);
  }

  delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/users/${id}`);
  }

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
