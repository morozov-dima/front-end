import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { State } from "src/app/state/app.reducer";
import { PromotionPageActions } from "../state/actions";
import { Promotion } from "../state/promotions.interface";
import { getPromotions } from "../state/promotions.selectors";


@Component({
    selector: 'app-promotion-shell',
    templateUrl: './promotion-shell.component.html',
    styleUrls: ['./promotion-shell.component.css']
})

export class PromotionShellComponent implements OnInit {
    promotions$!: Observable<Promotion[] | null>;

    constructor(
        private store: Store<State> ) {}

    ngOnInit(): void {
       // this.promotions$ = this.promotionsService.getPromotions();
       this.store.dispatch(PromotionPageActions.loadPromotions());
        this.promotions$ = this.store.select(getPromotions);









     }

}
