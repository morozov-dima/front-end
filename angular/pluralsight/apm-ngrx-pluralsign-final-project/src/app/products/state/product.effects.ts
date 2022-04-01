import { Injectable } from '@angular/core';

import { mergeMap, map, catchError, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProductService } from '../product.service';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductApiActions, ProductPageActions } from './actions'

@Injectable()
export class ProductEffects {

  constructor(private actions$: Actions, private productService: ProductService) { }


  /*
  *  switchMap:
  *  Cancels the current subscription/request and can cause race condition
  *  Use for get requests or cancelable requests like searches.
  *
  *  concatMap:
  *  Runs subscriptions/requests in order and is less performant.
  *  Use for get, post and put requests when order is important.
  * 
  *  mergeMap:
  *  Runs subscriptions/requests in parallel.
  *  Use for get, put, post and delete methods when order is not important.
  * 
  *  exhaustMap:
  *  Ignores all subsequent subscriptions/requests until it completes.
  *  Use for login when you do not want more requests until the initial one is 
  *  complete.
  *   
  */

  

  loadProducts$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ProductPageActions.loadProducts),
        mergeMap(() => this.productService.getProducts()
          .pipe(
            map(products => ProductApiActions.loadProductsSuccess({ products })),
            catchError(error => of(ProductApiActions.loadProductsFailure({ error })))
          )
        )
      );
  });




  updateProduct$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ProductPageActions.updateProduct),
        concatMap(action =>
          this.productService.updateProduct(action.product)
            .pipe(
              map(product => ProductApiActions.updateProductSuccess({ product })),
              catchError(error => of(ProductApiActions.updateProductFailure({ error })))
            )
        )
      );
  });




  createProduct$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ProductPageActions.createProduct),
        concatMap(action =>
          this.productService.createProduct(action.product)
            .pipe(
              map(product => ProductApiActions.createProductSuccess({ product })),
              catchError(error => of(ProductApiActions.createProductFailure({ error })))
            )
        )
      );
  });




  deleteProduct$ = createEffect(() => {
    return this.actions$
      .pipe(
        ofType(ProductPageActions.deleteProduct),
        mergeMap(action =>
          this.productService.deleteProduct(action.productId).pipe(
            map(() => ProductApiActions.deleteProductSuccess({ productId: action.productId })),
            catchError(error => of(ProductApiActions.deleteProductFailure({ error })))
          )
        )
      );
  });



}
