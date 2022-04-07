import { createSelector, createFeatureSelector } from '@ngrx/store';
import { UserState } from '../state/users.interface';

const getUserFeatureState = createFeatureSelector<UserState>('users');

export const getUsers = createSelector(
    getUserFeatureState,
    (state) => state.users
);