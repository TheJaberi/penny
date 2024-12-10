import { createReducer, on } from '@ngrx/store';
import { AuthFormState } from './auth-form.model';
import * as AuthFormActions from './auth-form.actions';

export const initialState: AuthFormState = {
  username: '',
  email: '',
  password: '',
};

export const authFormReducer = createReducer(
  initialState,
  on(AuthFormActions.updateUsername, (state, { username }) => ({ ...state, username })),
  on(AuthFormActions.updateEmail, (state, { email }) => ({ ...state, email })),
  on(AuthFormActions.updatePassword, (state, { password }) => ({ ...state, password })),
  on(AuthFormActions.resetAuthForm, () => initialState)
);