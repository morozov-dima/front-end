//import { Recipe } from '../recipe.model';
import * as FromCommentsActions from './comments.action';




export interface State {
  //recipes: Recipe[];
  comments?: any[];
}



const initialState: State = {
    comments: []
};



export function commentsReducer(
  state = initialState,
  action: FromCommentsActions.CommentsActions
) {
  switch (action.type) {
    case FromCommentsActions.SET_COMMENTS:
      return {
        ...state,
        comments: [...action.payload, 'kuku']
      };
    
    default:
      return state;
  }
}
