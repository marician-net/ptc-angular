import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEmailConfirmComponent } from './modal-email-confirm.component';

describe('ModalEmailConfirmComponent', () => {
  let component: ModalEmailConfirmComponent;
  let fixture: ComponentFixture<ModalEmailConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEmailConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEmailConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
