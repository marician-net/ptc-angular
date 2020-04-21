import {Component, OnInit, Output, EventEmitter, Input} from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-dot-drug-confirm',
  templateUrl: './modal-dot-drug-confirm.component.html',
  styleUrls: ['./modal-dot-drug-confirm.component.scss']
})
export class ModalDotDrugConfirmComponent implements OnInit {
  @Output() action = new EventEmitter();
  @Input() origin: any;
  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {}

  yes() {
    this.bsModalRef.hide();
    this.action.emit(this.origin === 'alcohol' ? 2 : 1);
  }

  no() {
    this.bsModalRef.hide();
    this.action.emit(this.origin === 'alcohol' ? 3 : 0);
  }
}
