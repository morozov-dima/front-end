import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { Todos } from "./todo-interface";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})

export class TodoDataService {
    constructor(private http: HttpClient) {}
    apiKey: string = environment.apiKey;

    fetchToDos(): Observable<Todos[]>{
        const url = 'https://jsonplaceholder.typicode.com/todos/?_limit=5';
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            params: new HttpParams().set('apiKey', this.apiKey)
        };
        return this.http.get<Todos[]>(url, httpOptions).pipe(
            catchError(this.handleError)
        );
    }



    saveTodos(todosList: Todos[]) {
        const url = 'https://jsonplaceholder.typicode.com/todos';
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            params: new HttpParams().set('apiKey', this.apiKey)
        };
        return this.http.post(url, todosList, httpOptions).pipe(
            catchError(this.handleError)
        );
    }    




    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
          console.error('An error occurred:', error.error);
        } else {
          console.error(
            `Backend returned code ${error.status}, body was: `, error.error);
        }
        return throwError(() => new Error('Something bad happened; please try again later.'));
      }


}