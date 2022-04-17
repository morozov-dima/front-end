import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable } from "rxjs";
import { HandleErrorService } from "../error/error.service";
import { Posts } from "./general-data.interface";

@Injectable({
    providedIn: 'root'
})

export class GeneralDataService {

    constructor(
        private http: HttpClient, 
        private handleErrorService: HandleErrorService
        ) {}

    getPosts() {
        const url = 'https://jsonplaceholder.typicode.com/posts?_limit=10';
        return this.http.get<Posts[]>(url).pipe(
            catchError(this.handleErrorService.handleError)
        );
    }

}