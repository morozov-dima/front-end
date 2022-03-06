import { Action } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredient.model";



// we can import everything from that file with the '*'
// we will add alias here 'ShoppingListActions' to group all the 
// things that are imported from that file into one object.
import * as ShoppingListActions from "./shopping-list.actions";





// here we define interface, we also can define this interface in different file.
export interface State {
    ingredients: Ingredient[];
    editedIngredient: Ingredient;
    editedIngredientIndex: number;
}


// here we define interface, we also can define this interface in different file.
export interface AppState {
    shoppingList: State;
}





// *************** initial State begin ****************
// we create constant for initial state. and this constant
// should be JavaScript object.
// now 'initialState' will be of type 'State'
const initialState: State = {
    ingredients: [
            new Ingredient('Apples', 5),
            new Ingredient('Tomatoes', 10)
          ],

    editedIngredient: null,
    editedIngredientIndex: -1    
};
// *************** initial State end ****************








// **************** Reducer function begin ****************
// Reducer it is just a function that we need export.
// first argument - current state.
// second argument - action that triggers the reducer and in the end, the 
// state update.
//
// we can set 'initialState' as a default value to 'state', because you can 
// assign default values to arguments - this is TypeScript or next-gen Javascript feature.
// 'ShoppingListActions.AddIngredient' name of our action.
export function shoppingListReducer(
    // now our 'state' also will be of type 'State'
    state: State = initialState,
    
    // The first 'ShoppingListActions' is simply the alias we are using in the top for
    // our bundled import.
    // The '.ShoppingListActions' then refers to this union type we have.
    action: ShoppingListActions.ShoppingListActions
    ) {
    switch (action.type) {






        // 'ADD_INGREDIENT' const that imported from 'shopping-list.actions.ts'
        // We can check different types of avtions.
        case ShoppingListActions.ADD_INGREDIENT:
            return {
                // we copy all the old state, always copy the old state, then 
                // overwrite what you want to change.
                ...state,
                // we also want to copy all 'ingredients'
                // because inside 'AddIngredient' action we have 'payload'
                ingredients: [...state.ingredients, action.payload]
            };







        case ShoppingListActions.ADD_INGREDIENTS:
                // we need return object 
                return {
                    // it is recommended that you always copy the old state first, 
                    // so all the properties of the old state
                    ...state,

                    ingredients: [...state.ingredients, ...action.payload]
                };   







        case ShoppingListActions.UPDATE_INGREDIENT:
            // this way we can get ingredient
            const ingredient = state.ingredients[action.payload.index];    
            const updatedIngredient = {
                 // we copy the old ingredients
                 ...ingredient,
                 
                 // copy action.payload.ingredient
                 ...action.payload.ingredient

            };    

            // we will copy ingredient elements from my old state.
            // it is a new array with the data of the old states array.
            const updatedIngredients = [...state.ingredients];

            updatedIngredients[action.payload.index] = updatedIngredient;

            return {
                // copy existing state
                ...state,
                ingredients: updatedIngredients
            };    









        case ShoppingListActions.DELETE_INGREDIENT:
             return {
                 // we return the copy of the old state
                 ...state,

                 // filter will always return a new array, so it will automatically
                 // give us a copy and filter is a function built into Javascript
                 ingredients: state.ingredients.filter((ig, igIndex) => {
                     return igIndex !== action.payload;
                 })
             };  
             
             



          case ShoppingListActions.START_EDIT:
              return {
                  // copy the state
                  ...state,
                  editedIngredientIndex: action.payload,
                  // here we use SPREAD operator
                  // and this now copies that ingredient which I am getting from my ingredients array.
                  editedIngredient: {...state.ingredients[action.payload]}
              };   





           case ShoppingListActions.STOP_EDIT:
               return {
                   // copy the state
                   ...state,
                   // set to initial values we had before.
                   editedIngredient: null,
                    // set to initial values we had before.
                   editedIngredientIndex: -1

               };   




               

            // if we have dafault case
            // here we simply return the unchanged state and that will be our initial state.
            default:
                return state;
    }
}
// **************** Reducer function end ****************








