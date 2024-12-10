import { createAction, props } from '@ngrx/store';

export const updateUsername = createAction(
  '[Auth Form] Update Username',
  props<{ username: string }>()
);

export const updateEmail = createAction(
  '[Auth Form] Update Email',
  props<{ email: string }>()
);

export const updatePassword = createAction(
  '[Auth Form] Update Password',
  props<{ password: string }>()
);

export const resetAuthForm = createAction('[Auth Form] Reset');