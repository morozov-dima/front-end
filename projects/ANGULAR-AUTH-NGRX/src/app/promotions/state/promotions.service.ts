import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";
import { HandleErrorService } from '../../shared/error/error.service';
import { Promotion } from "./promotions.interface";


@Injectable({
    providedIn: 'root'
})

export class PromotionsService {
    constructor( private http: HttpClient, private handleErrorService: HandleErrorService ) {}

    getPromotions(): Observable<Promotion[]> {
        const url = 'https://jsonplaceholder.typicode.com/posts?_limit=6';
        // TO DO - Add interceptor
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'KEY': 'DFGHJTR445354FDGFIIJ565GHGHG'
            })
        };
        return this.http.get<Promotion[]>(url, httpOptions)
            .pipe(
                catchError(this.handleErrorService.handleError)
            );
    }


}