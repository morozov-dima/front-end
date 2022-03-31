import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductState } from "./products.interface";
// import { ProductState } from "./products.reducer";

// selectors
const getProductFeatureState = createFeatureSelector<ProductState>('products');

export const getShowProductCode = createSelector(
    getProductFeatureState,
    state => state.showProductCode
); 



export const getShowProductCodeTrigger = createSelector(
    getProductFeatureState,
    state => state.trigger
); 



export const getProducts = createSelector(
    getProductFeatureState,
    state => state.products
); 



export const getError = createSelector(
    getProductFeatureState,
    state => state.error
); 
