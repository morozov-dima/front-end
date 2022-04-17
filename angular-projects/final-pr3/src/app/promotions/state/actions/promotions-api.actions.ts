import { createAction, props } from "@ngrx/store";
import { PostsResponse } from "../promotions.interface";

export const LoadPostsSuccess = createAction(
    '[Promotions] Load Posts Success',
    props<{ posts: PostsResponse[] }>()
);

export const LoadPostsFail = createAction(
    '[Promotions] Load Posts Fail',
    props<{ error: string }>()
);




