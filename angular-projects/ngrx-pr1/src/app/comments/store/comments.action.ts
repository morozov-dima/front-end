import { Action } from '@ngrx/store';

// import { Recipe } from '../recipe.model';

export const SET_COMMENTS = '[Comments] Set Comments';


export class SetComments implements Action {
  readonly type = SET_COMMENTS;

  //constructor(public payload: Recipe[]) {}
  constructor(public payload: any[]) {}
}



export type CommentsActions =
    SetComments;
