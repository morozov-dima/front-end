import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { Todo } from "./todo.interface";


@Injectable({
    providedIn: 'root'
})

export class UserData {
    constructor(private http: HttpClient) {}

    fetchToDos(): Observable<Todo[]> {
        const url = 'https://jsonplaceholder.typicode.com/todos';
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json'
            })
        };
        return this.http.get<Todo[]>(url, httpOptions).pipe(
            catchError(this.handleError)
        );
    }


    saveToDos(todo: Todo[]) {
        const url = 'https://jsonplaceholder.typicode.com/todos';
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json'
            })
        };
        return this.http.post<Todo[]>(url, todo, httpOptions).pipe(
            catchError(this.handleError)
        );
    }



    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            console.log('An error occured:', error.error);
        } else {
            console.log(`Backend returned code ${error.status}, body was: `, error.error);
        }
        return throwError(() => new Error('Something bad happend; please try again later.'));
     }  


}