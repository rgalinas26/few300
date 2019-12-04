import { Component, OnInit, Input, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray, Validators, ValidatorFn } from '@angular/forms';
import { HolidayListItem } from '../../../models';
import * as actions from '../../../actions/recipients.actions';
import { GiftGivingState } from '../../../reducers';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipient-entry',
  templateUrl: './recipient-entry.component.html',
  styleUrls: ['./recipient-entry.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipientEntryComponent implements OnInit {

  @Input() holidays: HolidayListItem[];
  form: FormGroup;
  holidaysArray: FormArray;
  name: FormControl;
  email: FormControl;
  // changesSub: Subscription;
  constructor(private formBuilder: FormBuilder, private store: Store<GiftGivingState>) {
    this.holidaysArray = new FormArray([], minNumberOfSelectedCheckBoxes(1));
    this.name = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]);
    // this is how you could save half-input data in case you wanted to give the user back their data
    // when they return. Remember to unsub/
    // this.name.valueChanges.subscribe(v => console.log(v));
    this.email = new FormControl('', Validators.email);
    this.form = formBuilder.group({
      name: this.name,
      email: this.email,
      holidays: this.holidaysArray
    });

  }
  // ngOnDestroy() {
  //   this.changesSub.unsubscribe();
  // }

  createCheckBoxes() {
    this.holidays.forEach((holiday, index) => {
      const control = new FormControl();
      (this.holidaysArray).push(
        control
      );
    });
  }
  ngOnInit() {
    this.createCheckBoxes();
  }

  submit() {
    console.log(this.form.value);
    const selectedHolidayIds = this.form.value.holidays
      .map((v, i) => v ? this.holidays[i].id : null)
      .filter(v => v !== null);
    const name = this.form.value.name;
    const email = this.form.value.email;
    this.store.dispatch(actions.recipientAdded({ name, email, selectedHolidayIds }));
  }

}


function minNumberOfSelectedCheckBoxes(min: number) {
  const validator: ValidatorFn = (formArray: FormArray) => {
    const numberSelected = formArray.controls
      .map(c => c.value)
      .reduce((prev, next) => next ? prev + next : prev, 0);
    return numberSelected >= min ? null : { required: true, needed: min };
  };
  return validator;
}
