import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { catchError, map, tap } from "rxjs";
import { HandleErrorService } from "src/app/shared/error/error.service";
import { State } from "src/app/state/app.reducer";
import { User } from "./users.interface";

@Injectable({
    providedIn: 'root'
})

export class UsersService {
    constructor(
        private http: HttpClient,
        private store: Store<State>,
        private handleErrorService: HandleErrorService) {}


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
                map(() => {
                    // in real app, our back-end server will return id of user
                    // that was deleted. right now for test we just return 'userId'
                    // that we get.
                    return currentUser;
                }),
                catchError(this.handleErrorService.handleError)
            )
    }



    deleteUser(userId: number) {
        const url = `https://jsonplaceholder.typicode.com/users/${userId}`;
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }; 
        return this.http.delete<number>(url, httpOptions)
        .pipe(
            map(() => {
                    // in real app, our back-end server will return id of user
                    // that was deleted. right now for test we just return 'userId'
                    // that we get.
                    return userId;
                }
            ),
            catchError(this.handleErrorService.handleError)
        );
    }




    createUser(user: User){
        const url = 'https://jsonplaceholder.typicode.com/users/';
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };
        
        // Product Id must be null for the Web API to assign an Id
        // this wasy we can copy existing object and change some object value,
        // in our example this is 'id' that instead '0' now will be 'null'.
        // and this data we will send to server.
        const newProduct = { ...user, id: null};

        return this.http.post<User>(url, newProduct, httpOptions)
            .pipe(
                map((user) => {
                    // in real app, our back-end server will return added user
                    // right now for test we just return 'newProduct'
                    // that we get.
                    const newProductTmp: User = { ...user, id: 100};
                    return newProductTmp;
                    }
                ),
                catchError(this.handleErrorService.handleError)
            )
    }

    


}

