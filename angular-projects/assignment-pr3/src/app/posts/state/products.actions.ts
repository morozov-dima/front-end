import { createAction, props } from "@ngrx/store";
import { Product } from "./products.interface";

export const loadProducts = createAction(
    '[Product Page] Load'
);

export const loadProductsSuccess = createAction(
    '[Product Page] Load Success',
    props<{ products: Product[] }>()
);

export const loadProductsFailure = createAction(
    '[Product Page] Load Failure',
    props<{ error: string }>()
);