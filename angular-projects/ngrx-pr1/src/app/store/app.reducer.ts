import { ActionReducerMap } from '@ngrx/store';
import * as fromComments from '../comments/store/comments.reducer';

export interface AppState {
  comments: any[];
}

export const appReducer: ActionReducerMap<AppState> = {
    comments: fromComments.commentsReducer
};
