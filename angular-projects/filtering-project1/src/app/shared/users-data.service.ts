import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { UserData } from './user.data.interface';

@Injectable({
    providedIn: 'root'
})

export class UsersData {
    constructor(
        private http: HttpClient
    ) {}


    getUsers(): Observable<UserData[]> {
        const url = '../../assets/user-data.api.json';
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                 Authorization: 'my-auth-token'
            })
        }
        return this.http.get<UserData[]>(url, httpOptions);
    }

}