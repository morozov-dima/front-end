import { ProductState } from "../products/state/products.interface";
import { UserState } from "../user/state/user.interface";


export interface State {
    products: ProductState;  
    users: UserState;  
}