import { Action } from '@ngrx/store';

import { Recipe } from '../recipe.model';



// 1. here we use a technique called prefixing
// 2. recommended especially for bigger apps.
// 3. here I just implement a pattern you will also find in the official
//    NgRx docs.
export const SET_RECIPES = '[Recipes] Set Recipes';
export const FETCH_RECIPES = '[Recipes] Fetch Recipes';
export const ADD_RECIPE = '[Recipe] Add Recipe';
export const UPDATE_RECIPE = '[Recipe] Update Recipe';
export const DELETE_RECIPE = '[Recipe] Delete Recipe';
export const STORE_RECIPES = '[Recipe] Store Recipes';


// 'SetRecipes' action
export class SetRecipes implements Action {
  readonly type = SET_RECIPES;

  constructor(public payload: Recipe[]) {}
}



// 'FetchRecipes' action
export class FetchRecipes implements Action {
  readonly type = FETCH_RECIPES;
}



// 'AddRecipe' action
export class AddRecipe implements Action {
  readonly type = ADD_RECIPE;

  constructor(public payload: Recipe) {}
}



// 'UpdateRecipe' action
export class UpdateRecipe implements Action {
  readonly type = UPDATE_RECIPE;

  constructor(public payload: { index: number; newRecipe: Recipe }) {}
}



// 'DeleteRecipe' action
export class DeleteRecipe implements Action {
  readonly type = DELETE_RECIPE;

  constructor(public payload: number) {}
}


// 'StoreRecipes' action
export class StoreRecipes implements Action {
  readonly type = STORE_RECIPES;
}



// Union type
export type RecipesActions =
    SetRecipes
  | FetchRecipes
  | AddRecipe
  | UpdateRecipe
  | DeleteRecipe
  | StoreRecipes;
