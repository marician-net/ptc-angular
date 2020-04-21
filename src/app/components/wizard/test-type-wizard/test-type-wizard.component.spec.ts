import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestTypeWizardComponent } from './test-type-wizard.component';

describe('TestTypeWizardComponent', () => {
  let component: TestTypeWizardComponent;
  let fixture: ComponentFixture<TestTypeWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestTypeWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestTypeWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
