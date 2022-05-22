import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductState } from "./products.interface";

const getProductsFeatureState = createFeatureSelector<ProductState>('products');


export const getProducts = createSelector(
    getProductsFeatureState,
    state => state.products
);

