import * as fromErrors from './errors.reducer';
import * as fromUser from './user.reducer';
import { createSelector } from '@ngrx/store';
export interface AppState {
  errors: fromErrors.ErrorState;
  user: fromUser.UserState;
}

export const reducers = {
  errors: fromErrors.reducer,
  user: fromUser.reducer
};


// selectors

// 1. Feature Selector (we aren't in a feature)


// 2. selecter per branch

const selectErrorBranch = (state: AppState) => state.errors;
const selectUserBranch = (state: AppState) => state.user;

// 3. Helpers (optional)

// 4. for the components.


// hint: youll need a couple. one to tell if there is an error, the other for the message
export const selectUserIsAdmin = createSelector(
  selectUserBranch,
  u => u.isAdmin
);

export const selectHasError = createSelector(
  selectErrorBranch,
  b => b.hasError
);

export const selectErrorMessage = createSelector(
  selectErrorBranch,
  b => b.errorMessage
);
