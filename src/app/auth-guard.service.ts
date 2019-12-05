import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { selectUserIsAdmin, AppState } from './reducers';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private store: Store<AppState>) { }
  canActivate() {
    return this.store.select(selectUserIsAdmin);
  }
}
