import { Ingredient } from '../../shared/ingredient.model';

// 1. we can import everything from that file with the '*'
// 2. we also add alias 'ShoppingListActions' to group all the things that are
//    imported from that file into one object. So 'ShoppingListActions' will
//    be object.
import * as ShoppingListActions from './shopping-list.actions';

export interface State {
  ingredients: Ingredient[];
  editedIngredient: Ingredient;
  editedIngredientIndex: number;
}


// 1. initial state (before it was changed)
// 2. initial state should be javaScript object.
const initialState: State = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
  editedIngredient: null,
  editedIngredientIndex: -1
};








/**
 *  1. reducer is just a function
 *  2. reducer function receives two argumants 'state' and 'action'
 *  3. we can set 'initialState' as a default argument. So the first time
 *     the reducer will run, it will receive that initial state.
 *
 */
export function shoppingListReducer(
  state: State = initialState,
  action: ShoppingListActions.ShoppingListActions
) {
  // here we check type of our action.
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      return {
        // copy the old state with the SPREAD operator, we can copy 'objects' with SPREAD 
        // operator. And now we have old object with new data.
        ...state,
        // assign a new value to 'ingredients'.
        // here we also don't want to lose my old 'ingredients', Therefore in this
        // 'ingredients' array, I also again copy my old 'state.ingredients'.
        // 
        ingredients: [...state.ingredients, action.payload]
      };
      
    case ShoppingListActions.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload]
      };
    case ShoppingListActions.UPDATE_INGREDIENT:
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload
      };
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;

      return {
        ...state,
        ingredients: updatedIngredients,
        editedIngredientIndex: -1,
        editedIngredient: null
      };
    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ig, igIndex) => {
          return igIndex !== state.editedIngredientIndex;
        }),
        editedIngredientIndex: -1,
        editedIngredient: null
      };
    case ShoppingListActions.START_EDIT:
      return {
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: { ...state.ingredients[action.payload] }
      };
    case ShoppingListActions.STOP_EDIT:
      return {
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      };
    default:
      return state;
  }
}
