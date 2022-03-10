// this type should be imported from '@ngrx/store'
import { Action } from '@ngrx/store';


import { Ingredient } from '../../shared/ingredient.model';


// here we declare our constants (string identifiers)
export const ADD_INGREDIENT = '[Shopping List] Add Ingredient';
export const ADD_INGREDIENTS = '[Shopping List] Add Ingredients';
export const UPDATE_INGREDIENT = '[Shopping List] Update Ingredient';
export const DELETE_INGREDIENT = '[Shopping List] Delete Ingredient';
export const START_EDIT = '[Shopping List] Start Edit';
export const STOP_EDIT = '[Shopping List] Stop Edit';








// 1. 'AddIngredient' action, this is just a class. it has a 'type' and it has a 'payload'.
export class AddIngredient implements Action {
  // 1. we must add 'type' property and this type is the identifier of this action.
  // 2. we can add 'readonly', this is a TypeScript feature which indicates to TypeScript
  //    that this must never be changed from outside.
  readonly type = ADD_INGREDIENT;

  // 1. we will pass 'payload' into current 'constructor' function.
  // 2. now this has to be public because of course I want to be able to access the 'payload'
  //    from inside my reducer.
  constructor(public payload: Ingredient) {}
}







// 1. 'AddIngredients' action. this is class that we export
export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS;

  // in 'payload' we will get array of 'Ingredient', because we will add multiple
  // ingredients at once.
  constructor(public payload: Ingredient[]) {}
}







export class UpdateIngredient implements Action {
  readonly type = UPDATE_INGREDIENT;

  constructor(public payload: Ingredient ) {}
}






export class DeleteIngredient implements Action {
  readonly type = DELETE_INGREDIENT;
}





// 'StartEdit' action
export class StartEdit implements Action {
  readonly type = START_EDIT;
  // in our payload we add number of ingredient I wawnt to edit
  constructor(public payload: number) {}
}







export class StopEdit implements Action {
  readonly type = STOP_EDIT;
}






// 1. here we create 'union type' of the different action types you want to
//    support in this part of your store.
// 2. and we will export this 'union type'.
export type ShoppingListActions =
    AddIngredient
  | AddIngredients
  | UpdateIngredient
  | DeleteIngredient
  | StartEdit
  | StopEdit;
