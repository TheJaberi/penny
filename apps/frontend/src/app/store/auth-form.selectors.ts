import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthFormState } from './auth-form.model';

export const selectAuthFormState = createFeatureSelector<AuthFormState>('authForm');

export const selectUsername = createSelector(
  selectAuthFormState,
  (state) => state.username
);

export const selectEmail = createSelector(
  selectAuthFormState,
  (state) => state.email
);

export const selectPassword = createSelector(
  selectAuthFormState,
  (state) => state.password
);