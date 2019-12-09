export const featureName = 'giftGivingFeature';
import * as fromHolidays from './holidays.reducer';
import * as fromRecipients from './recipients.reducer';
import * as fromHolidayListControl from './holiday-list-controls.reducer';
import * as fromHolidayModels from '../models/holidays';
import * as fromRecipientModels from '../models/recipients';
import * as fromHolidayListControlModels from '../models/list-controls';
import * as moment from 'moment';

import { ActionReducerMap, createFeatureSelector, createSelector, createReducer } from '@ngrx/store';
import { DashboardModel } from '../models/Dashboard';

export interface GiftGivingState {
  holidays: fromHolidays.HolidayState;
  holidayListControls: fromHolidayListControl.HolidayListControlState;
  recipients: fromRecipients.RecipientsState;
}

export const reducers: ActionReducerMap<GiftGivingState> = {
  holidays: fromHolidays.reducer,
  holidayListControls: fromHolidayListControl.reducer,
  recipients: fromRecipients.reducer
};

// Selectors are queries. They are how we get data out of the state

// 1. Feature Selector
const selectGiftFeature = createFeatureSelector<GiftGivingState>(featureName);
// 2. Feature per branch
const selectHolidaysBranch = createSelector(selectGiftFeature, g => g.holidays);
const selectHolidayListControlsBranch = createSelector(selectGiftFeature, g => g.holidayListControls);
const selectRecipientBranch = createSelector(selectGiftFeature, g => g.recipients);
// 3. Helpers
const { selectAll: selectHolidayArray, selectEntities: selectHolidayEntities } = fromHolidays.adapter.getSelectors(selectHolidaysBranch);
const { selectAll: selectRecipientArray } = fromRecipients.adapter.getSelectors(selectRecipientBranch);
const selectShowAll = createSelector(
  selectHolidayListControlsBranch,
  b => b.showAll
);
const selectSortBy = createSelector(
  selectHolidayListControlsBranch,
  b => b.sortBy
);
// 4. For the Components

// 4.a. We need one that returns a holiday model.
const selectHolidayModelRaw = createSelector(
  selectHolidayArray,
  (holidays) => {
    return {
      holidays
    } as fromHolidayModels.HolidaysModel;
  }
);

const selectHolidayModelFiltered = createSelector(
  selectHolidayModelRaw,
  selectShowAll,
  (holidayModel, showAll) => {
    if (showAll) {
      return holidayModel;
    } else {
      return {
        holidays: holidayModel.holidays.filter(h => new Date(h.date) >= new Date())
      };
    }
  }
);

const selectHolidayListSorted = createSelector(
  selectHolidayModelFiltered,
  selectSortBy,
  (holiday, by) => {
    if (by === 'date') {
      return {
        holidays: [...holiday.holidays.sort(
          (lhs, rhs) => {
            if (new Date(lhs.date) < new Date(rhs.date)) {
              return -1;
            }
            if (new Date(lhs.date) > new Date(rhs.date)) {
              return 1;
            }
            return 0;
          }
        )]
      };
    } else {
      return {
        holidays: [...holiday.holidays.sort(
          (lhs, rhs) => {
            if (lhs.name.toLocaleLowerCase() < rhs.name.toLocaleLowerCase()) {
              return -1;
            }
            if (lhs.name.toLocaleLowerCase() > rhs.name.toLocaleLowerCase()) {
              return 1;
            }
            return 0;
          }
        )]
      };
    }
  }
);

export const selectHolidayListModel = createSelector(
  selectHolidayModelRaw,
  r => r.holidays
);

export const selectHolidayModel = createSelector(
  selectHolidayListSorted,
  h => h
);

export const selectHolidayListControlsModel = createSelector(
  selectHolidayListControlsBranch,
  b => {
    return {
      showingAll: b.showAll,
      showingUpcoming: !b.showAll,
      sortingByDate: b.sortBy === 'date',
      sortingByName: b.sortBy === 'name'
    } as fromHolidayListControlModels.ListControlsModel;
  }
);

export const selectRecipientModel = createSelector(
  selectRecipientArray,
  selectHolidayEntities,
  (recipients, holidays) => {
    return recipients.map(recipient => {
      return {
        id: recipient.id,
        name: recipient.name,
        email: recipient.email,
        holidays: recipient.selectedHolidayIds
          .map(id => holidays[id]).map(h => ({
            id: h.id,
            description: h.name + ' (' + moment(h.date).format('MMMM Do, YYYY') + ')'
          }))
      } as fromRecipientModels.RecipientListModel;
    });
  }
);

const currentDate = new Date();

export const selectDashboardModel = createSelector(
  selectHolidayModelRaw,
  selectRecipientModel,
  (holidays, recipients) => {
    const futureHolidays = [...holidays.holidays.filter(holiday => new Date(holiday.date) >= currentDate)
      .sort((x, y) => {
        if (new Date(x.date) > new Date(y.date)) { return 1; }
        if (new Date(x.date) < new Date(y.date)) { return 1; }
        return 0;
      })];
    return futureHolidays.map(holiday => ({
      holidayId: holiday.id,
      holiday: holiday.name + ' (' + moment(holiday.date).format('MMMM Do, YYYY') + ')',
      recipients: getCelebratingRecipients(holiday.id, recipients)
    } as DashboardModel)
    );
  }
);

function getCelebratingRecipients(holidayId: string, recipients: fromRecipientModels.RecipientListModel[]) {
  const celebratingRecipients = recipients.filter(recipient => recipient.holidays.some(holiday => holiday.id === holidayId));
  return celebratingRecipients.map((r) => ({ id: r.id, name: r.name }));
}
