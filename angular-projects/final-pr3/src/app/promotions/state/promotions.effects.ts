import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, mergeMap, of } from "rxjs";
import { PromotionsApiActions, PromotionsPageActions } from "./actions";
import { PromotionsService } from "./promotions.service";

@Injectable()

export class PromotionsEffects {
    constructor(
        private actions$: Actions,
        private promotionsService: PromotionsService
    ) {}



     LoadPosts$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(PromotionsPageActions.LoadPosts),
            mergeMap(() => 
                this.promotionsService.getPosts().pipe(
                    map((posts) => PromotionsApiActions.LoadPostsSuccess({posts})),
                    catchError((error) => of(PromotionsApiActions.LoadPostsFail(error)))
                )
            )
        )
     });


}