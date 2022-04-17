import { createReducer, on } from "@ngrx/store";
import { PromotionsApiActions, PromotionsPageActions } from "./actions";
import { PromotionsState } from "./promotions.interface";

const initialState: PromotionsState = {
    posts: [],
    error: ''
};

export const promotionsReducer = createReducer<PromotionsState>(
    initialState,
    on(
        PromotionsApiActions.LoadPostsSuccess,
        (state, action): PromotionsState => {
            return {
                ...state,
                posts: action.posts,
                error: ''
            }
        } 
    ),
    on(
      PromotionsApiActions.LoadPostsFail,
      (state, action): PromotionsState => {
          return {
              ...state,
              posts: [],
              error: action.error
          }
      }  
    )
);