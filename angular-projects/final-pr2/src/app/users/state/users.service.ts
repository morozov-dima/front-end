import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map } from "rxjs";
import { HandleErrorService } from "src/app/shared/error/error.service";
import { User } from "./users.interface";

@Injectable({
    providedIn: 'root'
})

export class UsersService {
    constructor(private http: HttpClient, private handleErrorService: HandleErrorService) {}


    getUsers() {
        const url = 'https://jsonplaceholder.typicode.com/users/?_limit5';
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Key': 'DFDFDFDFDFD34343DDSDSDS'
            })
        };
        return this.http.get<User[]>(url, httpOptions).pipe(
            map((responseData) => {
                const userArray: User[] = [];
                for (const key in responseData) {
                    if (responseData.hasOwnProperty(key)) {
                        userArray.push({ ...responseData[key], network: 'best games' });
                    }
                }
                return userArray;
            }),
            catchError(this.handleErrorService.handleError)
        );
    }

}

