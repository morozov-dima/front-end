import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class GetData {

    constructor(private http: HttpClient) {}

    getData() {
        const url = 'https://jsonplaceholder.typicode.com/posts?_limit=3';
        return this.http.get(url).pipe(
            map(() => {
                

                const highlights = [
                    {
                        from: 7,
                        to: 10
                    },
                    {
                        from: 37,
                        to: 41
                    }
                ]
                
                return highlights;






            })
        );
    }
}