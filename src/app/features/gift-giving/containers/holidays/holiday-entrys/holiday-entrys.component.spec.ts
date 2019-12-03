import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayEntrysComponent } from './holiday-entrys.component';

describe('HolidayEntrysComponent', () => {
  let component: HolidayEntrysComponent;
  let fixture: ComponentFixture<HolidayEntrysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HolidayEntrysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HolidayEntrysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
