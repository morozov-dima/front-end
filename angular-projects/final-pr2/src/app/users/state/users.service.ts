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






    updateUser(currentUser: User) {
       const url = `https://jsonplaceholder.typicode.com/users/${currentUser.id}/?_limit5`;
       const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type':  'application/json'
            })
        };
        // we use 'put' method when we need update some data in server.
        return this.http.put<User>(url, currentUser, httpOptions)
            .pipe(
                map((responseData) => {
                    console.log(responseData);
                    responseData.network = 'best games updated'
                    return responseData;
                }),
                catchError(this.handleErrorService.handleError)
            )
    }






    


}

