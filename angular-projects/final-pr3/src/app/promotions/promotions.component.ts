import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { PromotionsPageActions } from "./state/actions";
import { getPosts } from "./state/promotions.selector";

@Component({
    selector: 'app-promotions',
    templateUrl: './promotions.component.html',
    styleUrls: ['./promotions.component.css']
})

export class PromotionsComponent implements OnInit {
    constructor(
        private http: HttpClient,
        private store: Store
    ) {}
    

     ngOnInit(): void {
        this.store.dispatch(PromotionsPageActions.LoadPosts());


        this.store.select(getPosts).subscribe(
            (response) => {
                console.log(response);
            }
        ); 
     }   


}