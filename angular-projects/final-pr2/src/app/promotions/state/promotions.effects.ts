import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { PromotionsService } from './promotions.service';
import { PromotionPageActions, PromotionApiActions } from './actions';
import { catchError, map, mergeMap, of } from 'rxjs';

@Injectable()
export class PromotionEffects {
  constructor(
    private promotionsService: PromotionsService,
    private actions$: Actions
  ) {}



  loadPromotions$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(PromotionPageActions.loadPromotions),
      mergeMap(() =>
        this.promotionsService.getPromotions().pipe(
          map((promotions) =>
            PromotionApiActions.loadPromotionsSuccess({ promotions })
          ),
          catchError((error) =>
            of(PromotionApiActions.loadPromotionsFailure({ error }))
          )
        )
      )
    );
  });

  
}
