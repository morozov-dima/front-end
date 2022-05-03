import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, delay, filter, interval, skip, Subject, Subscription, take, takeWhile } from "rxjs";

interface Todos {
    userId: number;
    id: number;
    title: string;
    completed: string;
}


@Injectable({
    providedIn: 'root'
})

export class UserDataService{

    // here we use Subject for component communication.
    subjectTodos = new Subject<Todos>();

    constructor(private http: HttpClient) {}

    getUserData() {
        const url = 'https://jsonplaceholder.typicode.com/todos/';
        const httpOptions = {
            params: new HttpParams().set('_limit', 10),
            headers: new HttpHeaders({
                Authorization: 'my-auth-token'
            })
        };
        return this.http.get<Todos[]>(url, httpOptions);
    }


    startEmitUserData() {
        this.getUserData().subscribe((items) => {
           
            




            let index: number = 0;
            
            // set interval with 1 sec
            interval(3000)
            .pipe(
                // take 6 objects from response
                take(6)
            )
            // subscribe to the rxjs interval
            .subscribe(() => {
                // send data with Subject
                this.subjectTodos.next(items[index]);

                // move to the next array item
                index++;
            }); 

        });

    }
    

}