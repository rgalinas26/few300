import { Injectable } from '@angular/core';
import { RecipientsEntity } from '../reducers/recipients.reducer';
import * as recipientsActions from '../actions/recipients.actions';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class RecipientsEffects {
  readonly recipientUrl = environment.rootApiUrl + 'recipients';
  loadTheRecipients$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(recipientsActions.loadRecipients),
        switchMap(() => this.client.get<GetRecipientsResponse>(`${environment.rootApiUrl}recipients`)
          .pipe(
            map(r => r.recipients), // Recipients
            map(r => r.map(mapRecipient)),
            map((recipients) => recipientsActions.loadRecipientsSuccessful({ payload: recipients })),
            catchError((err) => of(recipientsActions.loadRecipientsFailed({
              payload: 'loading the recipients failed'
            })))
          )
        )
      )
    , { dispatch: true });

  saveTheRecipient$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(recipientsActions.recipientAdded),
        switchMap((originalAction) => this.client.post<RecipientsEntity>(`${this.recipientUrl}`, {
          name: originalAction.payload.name,
          email: originalAction.payload.email,
          selectedHolidayIds: originalAction.payload.selectedHolidayIds
        }).pipe(
          map(newRecipient => recipientsActions.addRecipientSucceeded({ payload: newRecipient, oldId: originalAction.payload.id })),
          catchError((err) => of(recipientsActions.addRecipientFailed({
            payload: originalAction.payload,
            message: 'could not add the recipient.'

          })))
        )
        )
      )
    , { dispatch: true });

  saveRecipientHolidays$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(recipientsActions.addRecipientSucceeded),
        switchMap((recipient) =>
          this.client.put(`${this.recipientUrl}/${recipient.payload.id}/holidays`, recipient.payload.selectedHolidayIds))
      )
    , { dispatch: false }
  );

  constructor(private actions$: Actions, private client: HttpClient) { }
}


interface GetRecipientsResponse {
  recipients: RecipientResponseItem[];
}
interface RecipientResponseItem {
  id: string;
  name: string;
  email: string;
  holidays: string[];
}

function mapRecipient(rec: RecipientResponseItem): RecipientsEntity {
  return {
    id: rec.id,
    name: rec.name,
    email: rec.email,
    selectedHolidayIds: rec.holidays
  } as RecipientsEntity;
}
