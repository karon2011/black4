import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { map, first } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs/operators';
@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        console.log("currentUserSubject", this.currentUserSubject);
        
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<User>(`${environment.apiUrl}/login_check`, { username, password })
            .pipe(
                map(data => {
                    console.log("data in AuthenticationService", data);

                    // login successful if there's a jwt token in the response
                    if (data && data.token) {
                        console.log("data ???", data);
                        let jwtData = data.token.split('.')[1];
                        let decodedJwtJsonData = window.atob(jwtData)
                        let decodedJwtData = JSON.parse(decodedJwtJsonData)

                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem('currentUser', JSON.stringify(decodedJwtData));
                        this.currentUserSubject.next(decodedJwtData);
                    }
                    // localStorage.setItem('currentUser', JSON.stringify(data));
                    return data;
                }));
    }

    // getUserRoles(user: User): Observable<User> {
    //     return this.http.get<User>(`${environment.apiUrl}/users/${user.id}/roles`).pipe(
    //         take(1),
    //         map(role => {
    //             user.role = role;
    //             return user;
    //         })
    //     )
    // }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    getToken() {
        return localStorage.getItem('token');
    }
}
