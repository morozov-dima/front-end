import { Action } from "@ngrx/store";
import { Ingredient } from "../../shared/ingredient.model";


// string identifiers
export const ADD_INGREDIENT = 'ADD_INGREDIENT';
export const ADD_INGREDIENTS = 'ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = 'UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = 'DELETE_INGREDIENT';
export const START_EDIT = 'START_EDIT';
export const STOP_EDIT = 'STOP_EDIT';






// Action definition. Our Action has a 'type' and has a 'payload'
// 'AddIngredient' is a object.
export class AddIngredient implements Action {
   // we add readonly property. That is TypeScript feature which
   // indicates to TypeScript that this must never be changed from 
   // outside.
   // The 'Action' interface only forces you to add a "type" property!
   readonly type = ADD_INGREDIENT;


   constructor(public payload: Ingredient) {}
}






export class AddIngredients implements Action {
   // our class has readonly type
   readonly type = ADD_INGREDIENTS;

   // our class have a constructor
   // type will be 'Ingredient[]' because we add more Ingredients at once.
   constructor(public payload: Ingredient[]) {}
}







export class UpdateIngredient implements Action {
   readonly type = UPDATE_INGREDIENT;
   constructor(public payload: Ingredient ) {}
}






export class DeleteIngredient implements Action {
   readonly type = DELETE_INGREDIENT;
}





export class StartEdit implements Action {
   // our class need readonly 'type' property
   readonly type = START_EDIT;

   // we will add constructor with public 'payload'
   // our 'payload' will be just number of the ingredient I want to edit.
   constructor(public payload: number) {}
}





export class StopEdit implements Action {
   readonly type = STOP_EDIT;

}






// *********************** type declaration begin **************************
// you can create your own type in TypeScript
// so you create a union of the different action types you want to
// support in this part of your store.
//
// This is a TypeScript feature, this simply says the type of shopping list
// actions is 'AddIngredient' or 'AddIngredients'
export type ShoppingListActions = 
            AddIngredient | 
            AddIngredients | 
            UpdateIngredient | 
            DeleteIngredient | 
            StartEdit |
            StopEdit;

// *********************** type declaration begin **************************


