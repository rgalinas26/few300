import { Component, OnInit } from '@angular/core';
import { GiftGivingState } from '../../../reducers';
import { Store } from '@ngrx/store';
import * as actions from '../../../actions/holidays.actions';

@Component({
  selector: 'app-holiday-entrys',
  templateUrl: './holiday-entrys.component.html',
  styleUrls: ['./holiday-entrys.component.scss']
})
export class HolidayEntrysComponent implements OnInit {

  constructor(private store: Store<GiftGivingState>) { }

  ngOnInit() {
  }

  addHoliday(nameEl: HTMLInputElement, dateEl: HTMLInputElement) {
    const name = nameEl.value;
    const date = dateEl.valueAsDate.toISOString();
    this.store.dispatch(actions.addHoliday({ name, date }));
    nameEl.value = '';
    dateEl.valueAsDate = new Date(); // today.
    nameEl.focus();
  }
}
