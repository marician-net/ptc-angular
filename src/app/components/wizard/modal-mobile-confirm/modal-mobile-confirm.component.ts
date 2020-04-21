import { Component, OnInit, EventEmitter, Output } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';

import { FormWizardTestService } from 'src/app/_services/';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-modal-mobile-confirm',
  templateUrl: './modal-mobile-confirm.component.html',
  styleUrls: ['./modal-mobile-confirm.component.scss']
})
export class ModalMobileConfirmComponent implements OnInit {
  mobile: String;
  mobileForm: FormGroup;

  @Output() action = new EventEmitter();

  constructor(
      public bsModalRef: BsModalRef,
      private formWizardTestService: FormWizardTestService,
      private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.mobile = null;
    this.createForm();
    const notifications = this.formWizardTestService.form.get('Notifications').value;
    this.mobile = notifications['SMSPhone'];
  }

  createForm() {
    this.mobileForm = this.fb.group({
      phone: ['', [ Validators.pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/), Validators.required]],
    });
  }
  ok() {
    const notifications = this.formWizardTestService.form.get('Notifications').value;
    notifications['SMSPhone'] = this.mobile;
    this.formWizardTestService.form.get('Notifications').patchValue(notifications);
    this.action.emit(this.mobile);
    this.bsModalRef.hide();
  }

  cancel() {
    this.action.emit(false);
    this.bsModalRef.hide();
  }
}
