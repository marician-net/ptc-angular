import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteWizardComponent } from './site-wizard.component';

describe('SiteWizardComponent', () => {
  let component: SiteWizardComponent;
  let fixture: ComponentFixture<SiteWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
