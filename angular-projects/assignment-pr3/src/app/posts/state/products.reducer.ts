import { state } from "@angular/animations";
import { createReducer, on } from "@ngrx/store";

import * as productActions from './products.actions';
import { ProductState } from "./products.interface";


const initialState: ProductState = {
    products: [],
    error: ''
};

export const productReducer = createReducer<ProductState>(
    initialState,
    on(
        productActions.loadProductsSuccess,
        (state,action): ProductState => {
            return {
                ...state,
                products: action.products
            }
        }
    ),
    on(
        productActions.loadProductsFailure,
        (state, action): ProductState => {
            return {
                ...state,
                error: action.error
            }
        }

    )
);
