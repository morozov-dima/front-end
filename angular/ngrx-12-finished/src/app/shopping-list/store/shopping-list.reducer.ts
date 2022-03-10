
import { Ingredient } from '../../shared/ingredient.model';





// 1. we can import everything from that file with the '*'
// 2. we also add alias 'ShoppingListActions' to group all the things that are
//    imported from that file into one object. So 'ShoppingListActions' will
//    be object.
import * as ShoppingListActions from './shopping-list.actions';


// here we add out interface
import { ShoppingListState } from './shopping-list.model';








// 1. initial state (before it was changed)
// 2. initial state should be javaScript object.
const initialState: ShoppingListState = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
  editedIngredient: null,
  editedIngredientIndex: -1
};









/**
 *  1. reducer is just a function
 *  2. reducer function receives two argumants 'state' and 'action'
 *  3. we can set 'initialState' as a default argument. So the first time
 *     the reducer will run, it will receive that initial state.
 *  4. in reducer we have only synchronous code. (no asynchronous code)
 *
 */
export function shoppingListReducer(
  state: ShoppingListState = initialState,
  // first 'ShoppingListActions' is simply the alias I'm using here.
  // this '.ShoppingListActions' then refers to this union type.
  action: ShoppingListActions.ShoppingListActions
) {
  // here we check type of our action.
  switch (action.type) {
    case ShoppingListActions.ADD_INGREDIENT:
      // we always have to return a new state, so a new object here.
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
        // always copy the old state first with 'SPREAD' operator.
        ...state,
        // we set 'ingredients' to a new array where I copy all my old state ingredients, 
        // so all the existing ingredient elements in that ingredient array and then
        // I have to add the ingredients added by my 'action.payload'
        ingredients: [...state.ingredients, ...action.payload]
      };


    case ShoppingListActions.UPDATE_INGREDIENT:
      // one ingredient that we want to edit.
      const ingredient = state.ingredients[state.editedIngredientIndex];
      const updatedIngredient = {
        ...ingredient,
        ...action.payload
      };
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.editedIngredientIndex] = updatedIngredient;
      // we need return a bew object which will reflet our new state.
      return {
        // copy existing state
        ...state,
        ingredients: updatedIngredients,
        editedIngredientIndex: -1,
        editedIngredient: null
      };


    case ShoppingListActions.DELETE_INGREDIENT:
      return {
        // copy existing state
        ...state,
        // filter function will always return a new array, so it will automatically give us
        // a copy. and filter is a function built into Javascript.
        ingredients: state.ingredients.filter((ig, igIndex) => {
          return igIndex !== state.editedIngredientIndex;
        }),
        editedIngredientIndex: -1,
        editedIngredient: null
      };


    case ShoppingListActions.START_EDIT:
      return {
        // copy existing state
        ...state,
        editedIngredientIndex: action.payload,
        editedIngredient: { ...state.ingredients[action.payload] }
      };


    case ShoppingListActions.STOP_EDIT:
      return {
        // copy existing state
        ...state,
        editedIngredient: null,
        editedIngredientIndex: -1
      };

    // to use our initial state and return it unchanged, we need to add
    // a default case to our switch.
    default:
      return state;
  }
}
