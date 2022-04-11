import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.interface';

export const getAuthFeatureState = createFeatureSelector<AuthState>('auth');

export const getUser = createSelector(
  getAuthFeatureState,
  (state) => {
     return state.user
  }
);

