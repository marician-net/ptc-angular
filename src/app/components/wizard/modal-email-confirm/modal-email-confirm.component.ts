import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';

import { FormWizardTestService } from 'src/app/_services';
import {FormBuilder, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-modal-email-confirm',
  templateUrl: './modal-email-confirm.component.html',
  styleUrls: ['./modal-email-confirm.component.scss']
})
export class ModalEmailConfirmComponent implements OnInit {
  email: String;
  @Output() action = new EventEmitter();
  validations_form: any;
  submitted = false;

  constructor(
      public bsModalRef: BsModalRef,
      private formWizardTestService: FormWizardTestService,
      private fb: FormBuilder
  ) {}

  ngOnInit() {
    const notifications = this.formWizardTestService.form.get('Notifications').value;
    this.email = notifications['Email'];

    this.validations_form = this.fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.validations_form.controls; }

  ok() {
    this.submitted = true;

    if (this.validations_form.invalid) {
      return;
    }
    const notifications = this.formWizardTestService.form.get('Notifications').value;
    notifications['Email'] = this.email;
    this.formWizardTestService.form.get('Notifications').setValue(notifications);
    this.action.emit(this.email);
    this.bsModalRef.hide();
  }

  cancel() {
    this.action.emit(false);
    this.bsModalRef.hide();
  }
}
