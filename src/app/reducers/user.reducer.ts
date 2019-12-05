import { createReducer, Action } from '@ngrx/store';

export interface UserState {
  isLoggedIn: boolean;
  name: string;
  isAdmin: boolean;
}

const initialState: UserState = {
  isLoggedIn: false,
  name: null,
  isAdmin: true
};

export function reducer(state: UserState = initialState, action: Action) {
  return myReducer(state, action);
}

const myReducer = createReducer(
  initialState
);
