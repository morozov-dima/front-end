import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";
import { LoggerService } from "../logger/logger.service";
import { Comments } from "./comments.interface";

@Injectable()

export class CommentsService {
    constructor(
        private http: HttpClient,
        private loggerService: LoggerService
    ) {}

    getCommnets(): Observable<Comments[]> {
        const url = 'https://jsonplaceholder.typicode.com/posts/1/comments/';
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: 'my-auth-token'
            })
        };
        return this.http.get<Comments[]>(url, httpOptions).pipe(
            catchError(this.loggerService.handleError)
        );
    }

}