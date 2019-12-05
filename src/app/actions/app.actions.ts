import { createAction, props } from '@ngrx/store';

export const applicationStarted = createAction(
  '[app] application started'
);

export const applicationError = createAction(
  '[app] application error',
  props<{ message: string, feature: string }>()
);

export const clearApplicationError = createAction(
  '[app] clear application error'
);
