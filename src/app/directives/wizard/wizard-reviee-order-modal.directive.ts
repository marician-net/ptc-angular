import {Directive, HostListener, Output, EventEmitter} from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { ModalReviewOrderComponent } from 'src/app/components/wizard';

@Directive({
  selector: '[appWizardRevieeOrderModal]'
})
export class WizardRevieeOrderModalDirective {
  modalRef: BsModalRef;
  @Output('custom-submit') customSubmit: EventEmitter<any> = new EventEmitter();

  constructor(private modalService: BsModalService) {}

  @HostListener('click', ['$event'])
  private onMouseClick(click: MouseEvent) {
    this.modalRef = this.modalService.show(ModalReviewOrderComponent, {
      class: 'modal-dialog-centered rounded',
      animated: false
    });
    this.modalRef.content.onClose.subscribe(result => {
      if (result) {
        this.customSubmit.emit(result);
      }
    });
  }
}
