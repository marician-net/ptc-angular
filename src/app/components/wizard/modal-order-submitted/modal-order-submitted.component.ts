import {Component, NgZone, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {Router} from '@angular/router';
import {FormWizardTestService} from '../../../_services';

@Component({
  selector: 'app-modal-order-submitted',
  templateUrl: './modal-order-submitted.component.html',
  styleUrls: ['./modal-order-submitted.component.scss']
})
export class ModalOrderSubmittedComponent implements OnInit {

  constructor(public bsModalRef: BsModalRef,  private _ngZone: NgZone, private router: Router, public formWizardTestService: FormWizardTestService) { }

  ngOnInit() {
  }

  goToNewTest() {
    this.bsModalRef.hide();
    this.resetInfo();
    this._ngZone.run(() => {
      this.router.navigateByUrl('/wizard/new');
    });
  }

  goToList() {
    this.bsModalRef.hide();
    this.resetInfo();
    this._ngZone.run(() => {
      this.router.navigateByUrl('/adminlist');
    });
  }

  resetInfo() {
    this.formWizardTestService.resetInfo();
  }

}
