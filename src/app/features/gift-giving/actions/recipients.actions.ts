import { createAction, props } from '@ngrx/store';
import { RecipientsEntity } from '../reducers/recipients.reducer';

let currentId = 1;
export const recipientAdded = createAction(
  '[gift giving] added a recipient',
  ({ name, email, selectedHolidayIds }: { name: string; email: string; selectedHolidayIds: string[] }) => ({
    payload: {
      id: 'T' + currentId++,
      name,
      email,
      selectedHolidayIds
    }
  })
);

export const addRecipientSucceeded = createAction(
  '[gift giving] recipient added succesfully',
  props<{ payload: RecipientsEntity, oldId: string }>()
);
export const addRecipientFailed = createAction(
  '[gift giving] recipient was not added',
  props<{ payload: RecipientsEntity, message: string }>()
);

export const loadRecipients = createAction(
  '[gift giving] load the recipients'
);

export const loadRecipientsSuccessful = createAction(
  '[gift giving] loading the recipients worked',
  props<{ payload: RecipientsEntity[] }>()
);

export const loadRecipientsFailed = createAction(
  '[gift giving] loading the recipients failed',
  props<{ payload: string }>()
);
