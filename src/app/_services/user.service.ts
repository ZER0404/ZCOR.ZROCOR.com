import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models';

@Injectable({ providedIn: 'root' })
export class UserService {
     apiUrl: String = 'http://localhost:3000';

    constructor(private http: HttpClient) { }
 findByEmail(email: String) {
     return  this.http.get<User[]>(`${this.apiUrl}/users/${email}`);
 }
//  isloggedIn(){
//      return this.
//  }
    getAll() {
        return this.http.get<User[]>(`${this.apiUrl}/users`);
    }
    getById(id: number) {
        return this.http.get(`${this.apiUrl}/users/${id}`);
    }

    register(user: User) {
        return this.http.post(`${this.apiUrl}/auth/register`, user);
    }

    update(user: User) {
        return this.http.put(`${this.apiUrl}/users/${user.id}`, user);
    }

    delete(id: number) {
        return this.http.delete(`${this.apiUrl}/users/${id}`);
    }
}
