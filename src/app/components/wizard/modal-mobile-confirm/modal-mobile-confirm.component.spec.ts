import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMobileConfirmComponent } from './modal-mobile-confirm.component';

describe('ModalMobileConfirmComponent', () => {
  let component: ModalMobileConfirmComponent;
  let fixture: ComponentFixture<ModalMobileConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalMobileConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMobileConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
