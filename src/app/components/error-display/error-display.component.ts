import { Component, OnInit, Input } from '@angular/core';
import { clearApplicationError } from 'src/app/actions/app.actions';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-error-display',
  templateUrl: './error-display.component.html',
  styleUrls: ['./error-display.component.scss']
})
export class ErrorDisplayComponent implements OnInit {

  @Input() message: string = null;
  constructor(private store: Store<AppState>) { }

  ngOnInit() {
  }

  clearError() {
    this.store.dispatch(clearApplicationError());
  }

}
