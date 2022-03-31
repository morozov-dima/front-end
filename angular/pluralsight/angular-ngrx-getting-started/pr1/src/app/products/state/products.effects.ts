import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { ProductService } from '../product.service';

import * as ProductActions from './products.actions';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  loadProducts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(ProductActions.loadProducts),
      /*
      *  switchMap:
      *  Cancels the current subscription/request and can cause race condition
      *  Use for get requests or cancelable requests like searches.
      *
      *
      *  concatMap:
      *  Runs subscriptions/requests in order and is less performant.
      *  Use for get, post and put requests when order is important.
      *
      * 
      *  mergeMap:
      *  Runs subscriptions/requests in parallel.
      *  Use for get, put, post and delete methods when order is not important.
      *
      * 
      *  exhaustMap:
      *  Ignores all subsequent subscriptions/requests until it completes.
      *  Use for login when you do not want more requests until the initial one is 
      *  complete.
      *
      *   
      */
      mergeMap(() =>
        this.productService.getProducts().pipe(
          map((products) => ProductActions.loadProductsSuccess({ products })),
          catchError((error) =>
            of(ProductActions.loadProductsFailure({ error }))
          )
        )
      )
    );
  });
}
