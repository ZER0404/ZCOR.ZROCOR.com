import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../_models/user';
import { AlertService } from './alert.service';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
// public isloggedIn:boolean=false;

    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private alertService: AlertService,private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }


    public get loggedIn(): boolean{
        return this.currentUser !==  null;
      }


      register(email: string, password: string) {

        return this.http.post<any>(`http://localhost:8080/auth/register`, { email, password })
            .pipe(map(user => {

                console.log(user);
                // login successful if there's a jwt token in the response http://localhost:3000
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                    this.alertService.success(' Successfully registered');
                }

                return user;
            }));



    }

    login(email: string, password: string) {
        return this.http.post<any>(`http://localhost:8080/auth/authenticate`, { email, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response http://localhost:3000
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                    this.alertService.success(' Successfully login');
                }

                return user;
            }));
    }


logout() {
    // remove user from local storage to log user out
    this.currentUserSubject.next(null);

}

}
