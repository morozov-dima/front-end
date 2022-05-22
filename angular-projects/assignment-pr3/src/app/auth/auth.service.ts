import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable } from "rxjs";
import { LoggerService } from "../logger/logger.service";
import { User } from "./auth.interface";

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    constructor(
        private http: HttpClient,
        private loggerService: LoggerService
    ) {}

    login(email: string, password: string): Observable<User> {
        console.log('login');
        
        const url = 'https://jsonplaceholder.typicode.com/posts/?_limit=4';
        return this.http.get<any>(url).pipe(
            map(response => {
                const newRespone: User = {
                    email: 'mytest@gmail.com',
                    token: 'DFSDFSDFSDF232323FGHGFHGIOIUOIUOIUOI',
                    userId: '10011',
                    tokenExpirationDate: '10000' 
                };
                return newRespone;
            }),
            catchError(this.loggerService.handleError)
        );
    }

}