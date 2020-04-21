import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionalWizardComponent } from './optional-wizard.component';

describe('OptionalWizardComponent', () => {
  let component: OptionalWizardComponent;
  let fixture: ComponentFixture<OptionalWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionalWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionalWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
