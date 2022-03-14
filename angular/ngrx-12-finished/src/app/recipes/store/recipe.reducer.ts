import { Recipe } from '../recipe.model';
import * as RecipesActions from './recipe.actions';




export interface State {
  recipes: Recipe[];
}



const initialState: State = {
  recipes: []
};




// 1. reducer is just a function that we export.
//
// 2. reducer is a function which will receive a state and an action
//    and then you have return a new state.
export function recipeReducer(
  state = initialState,
  action: RecipesActions.RecipesActions
) {
  switch (action.type) {
    // SET_RECIPES case
    case RecipesActions.SET_RECIPES:
      return {
        // copy the existing state with SPREAD operator
        ...state,
        // Overwrite the recipes in there by taking the recipes we find
        // in the 'action.payload' because the 'action.payload' here
        // of course has an array of recipes. Here we also use SPREAD
        // operator to get my 'action.payload'. This will pull out all the
        // elements from the recipes array I am getting and add these recipes
        // here to these recipes array of the new state.
        recipes: [...action.payload]
      };
    
    // ADD_RECIPE case  
    case RecipesActions.ADD_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };
     
    // UPDATE_RECIPE case  
    case RecipesActions.UPDATE_RECIPE:
      const updatedRecipe = {
        ...state.recipes[action.payload.index],
        ...action.payload.newRecipe
      };

      const updatedRecipes = [...state.recipes];
      updatedRecipes[action.payload.index] = updatedRecipe;

      return {
        ...state,
        recipes: updatedRecipes
      };

    // DELETE_RECIPE case  
    case RecipesActions.DELETE_RECIPE:
      return {
        ...state,
        recipes: state.recipes.filter((recipe, index) => {
          return index !== action.payload;
        })
      };
    default:
      return state;
  }
}
