import { createReducer, on } from "@ngrx/store";

// here we use alias 'productsActions'
import * as productsActions from './products.actions';
import { ProductState } from "./products.interface";







// initial State (default values) for producrts slice
const initialState: ProductState = {
    showProductCode: true,
    trigger: 'default text',
    currentProductId: null,
    products: [],
    error: ''
};









// reducer function for products slice
export const productReducer = createReducer<ProductState>(
    initialState,
   on(
      // call to action 
      productsActions.toggleProductCode,
      // 'return type' is the 'ProductState'
      (state): ProductState => {
          return {
              ...state,
              showProductCode: !state.showProductCode
          }
      }
   ),
   on(
    // call to action 
    productsActions.setProductCode,
    // here we set second parameter 'action'
    (state, action): ProductState => {
        return {
            // we copy the existing state
            ...state,
            // 'action.trigger' this is data that we set inside our component
            // store will updated with the new state.
            trigger: action.trigger
        }
    }
 ),
    on(
       productsActions.loadProductsSuccess,
       (state, action): ProductState => {
            return {
               ...state,
               products: action.products,
               error: '' 
            }
       }
    ),
    on(
        productsActions.loadProductsFailure,
        (state, action): ProductState => {
             return {
                ...state,
                // if error appear we set products array to empty.
                products: [],
                error: action.error 
             }
        }
     )   
);




