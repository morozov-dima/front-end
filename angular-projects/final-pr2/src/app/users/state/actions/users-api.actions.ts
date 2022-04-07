import { createAction, props } from '@ngrx/store';
import { User } from '../users.interface';

export const loadUsersSuccess = createAction(
  '[Users Page] Load Success',
  props<{ users: User[] }>()
);

export const loadUsersFailure = createAction(
  '[Users Page] Load Failure',
  props<{ error: string }>()
);
