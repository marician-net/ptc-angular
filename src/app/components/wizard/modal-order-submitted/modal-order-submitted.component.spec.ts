import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalOrderSubmittedComponent } from './modal-order-submitted.component';

describe('ModalOrderSubmittedComponent', () => {
  let component: ModalOrderSubmittedComponent;
  let fixture: ComponentFixture<ModalOrderSubmittedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalOrderSubmittedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalOrderSubmittedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
