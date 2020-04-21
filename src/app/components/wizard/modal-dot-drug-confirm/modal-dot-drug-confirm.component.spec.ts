import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDotDrugConfirmComponent } from './modal-dot-drug-confirm.component';

describe('ModalDotDrugConfirmComponent', () => {
  let component: ModalDotDrugConfirmComponent;
  let fixture: ComponentFixture<ModalDotDrugConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDotDrugConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDotDrugConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
