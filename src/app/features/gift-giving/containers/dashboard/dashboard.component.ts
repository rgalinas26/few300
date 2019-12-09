import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { GiftGivingState, selectDashboardModel } from '../../reducers';
import { Observable } from 'rxjs';
import { DashboardModel } from '../../models/Dashboard';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  recipients$: Observable<DashboardModel[]>;
  constructor(private store: Store<GiftGivingState>) { }

  ngOnInit() {
    this.recipients$ = this.store.select(selectDashboardModel);
  }

}
