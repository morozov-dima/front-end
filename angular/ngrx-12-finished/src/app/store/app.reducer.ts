import { ActionReducerMap } from '@ngrx/store';

import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromShoppingListModel from '../shopping-list/store/shopping-list.model';

import * as fromAuth from '../auth/store/auth.reducer';
import * as fromRecipes from '../recipes/store/recipe.reducer';







// 'AppState' to describe the application-wide state.
// 'shoppingList', 'auth' and 'recipes' are store slices.
export interface AppState {
  shoppingList: fromShoppingListModel.ShoppingListState;
  auth: fromAuth.State;
  recipes: fromRecipes.State;
}







// ********************* appReducer **************************
// 1. here we can see list of our reducers
// 2. the idea here is that it merges all my other reducers together.
// 3. 'ActionReducerMap' should be imported from '@ngrx/store'
export const appReducer: ActionReducerMap<AppState> = {
  // 'shoppingList' slice
  shoppingList: fromShoppingList.shoppingListReducer,
  // 'auth' slice
  auth: fromAuth.authReducer,
  // 'recipes' slice
  recipes: fromRecipes.recipeReducer
};
