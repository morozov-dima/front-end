import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs";
import { HandleErrorService } from "src/app/shared/handle-error.service";
import { PostsResponse } from "./promotions.interface";

@Injectable({
    providedIn: 'root'
})

export class PromotionsService {

    constructor(
        private http: HttpClient, 
        private handleErrorService: HandleErrorService
        ) {}

    getPosts() {
        const url = 'https://jsonplaceholder.typicode.com/posts?_limit=10';
        return this.http.get<PostsResponse[]>(url)
        .pipe(
            catchError(this.handleErrorService.handleError)
        );
    }





}