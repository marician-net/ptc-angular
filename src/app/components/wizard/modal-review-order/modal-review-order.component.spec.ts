import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalReviewOrderComponent } from './modal-review-order.component';

describe('ModalReviewOrderComponent', () => {
  let component: ModalReviewOrderComponent;
  let fixture: ComponentFixture<ModalReviewOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalReviewOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalReviewOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
