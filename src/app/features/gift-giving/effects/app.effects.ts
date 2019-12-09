import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as appActions from '../../../actions/app.actions';
import * as holidaysActions from '../actions/holidays.actions';
import * as recipientActions from '../actions/recipients.actions';
import { map } from 'rxjs/operators';

@Injectable()
export class AppEffects {
  // turn addHolidayFailed -> applicationError
  addHolidayFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(holidaysActions.addHolidayFailed),
      map((x) => appActions.applicationError({ message: x.message, feature: 'Gift Giving' }))
    ));


  // turn applicationstarted into loadHolidays
  loadDataOnAppStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.applicationStarted),
      map(() => holidaysActions.loadHolidays())
    ));

  // turn applicationStartedinto loadRecipients
  loadRecipientsOnAppStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.applicationStarted),
      map(() => recipientActions.loadRecipients())
    )
  );


  constructor(private actions$: Actions) { }
}
