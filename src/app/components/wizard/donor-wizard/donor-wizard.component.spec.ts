import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DonorWizardComponent } from './donor-wizard.component';

describe('DonorWizardComponent', () => {
  let component: DonorWizardComponent;
  let fixture: ComponentFixture<DonorWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DonorWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DonorWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
