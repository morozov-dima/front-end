import { createAction, props } from "@ngrx/store";
import { Product } from "./products.interface";



export const toggleProductCode = createAction(
    '[Product] Toggle Product Code'
);



export const setProductCode = createAction(
    '[Product] Set Current Product',
    // 'trigger' this is data that we send to our reducer.
    props<{ trigger: string }>()
);




export const loadProductsSuccess = createAction(
    '[Product API] Load Success',
    props<{ products: Product[] }>()
);


export const loadProducts = createAction(
    '[Product Page] Load'
  );



  export const loadProductsFailure = createAction(
    '[Product API] Load Fail',
    props<{ error: string }>()
);












// export const setCurrentProduct = createAction(
//     '[Product Page] Set Current Product',
//     props<{ currentProductId: number }>()
//   );
  
//   export const clearCurrentProduct = createAction(
//     '[Product Page] Clear Current Product'
//   );
  
//   export const initializeCurrentProduct = createAction(
//     '[Product Page] Initialize Current Product'
//   );




  
//   export const updateProduct = createAction(
//     '[Product Page] Update Product',
//     props<{ product: Product }>()
//   );
  
  
//   export const createProduct = createAction(
//     '[Product Page] Create Product',
//     props<{ product: Product }>()
//   );
  
  
//   export const deleteProduct = createAction(
//     '[Product Page] Delete Product',
//     props<{ productId: number }>()
//   );
  