import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ShoppingListState } from '../../shopping-list/store/shopping-list.model';

// getShoppingListStateSelector selector
export const getShoppingListStateSelector = createFeatureSelector<ShoppingListState>('shoppingList');

// getIngredientsSelector selector
export const getIngredientsSelector = createSelector(
  getShoppingListStateSelector,
  (state: ShoppingListState) => state.ingredients
);



