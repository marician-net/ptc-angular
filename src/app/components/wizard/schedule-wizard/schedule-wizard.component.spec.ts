import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleWizardComponent } from './schedule-wizard.component';

describe('ScheduleWizardComponent', () => {
  let component: ScheduleWizardComponent;
  let fixture: ComponentFixture<ScheduleWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
