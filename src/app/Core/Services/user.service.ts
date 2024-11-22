import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { User } from '../Models/User';

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) { }

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${environment.UserMicroservice}/users`);
    }
    
    getUserById(id: string): Observable<User> {
        return this.http.get<User>(`${environment.UserMicroservice}/users/${id}`);
    }    

}
