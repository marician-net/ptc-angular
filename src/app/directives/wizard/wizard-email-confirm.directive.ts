import { Directive, ElementRef, Renderer2, HostListener, OnInit } from '@angular/core';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalEmailConfirmComponent } from 'src/app/components/wizard';

import { FormWizardTestService } from 'src/app/_services';

@Directive({
  selector: '[appWizardEmailConfirm]'
})
export class WizardEmailConfirmDirective implements OnInit {
  modalRef: BsModalRef;
  checkBoxEl: any;
  checkBoxToogle: any;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private modalService: BsModalService,
    private formWizardTestService: FormWizardTestService
  ) {}

  ngOnInit() {
    this.checkBoxEl = this.el.nativeElement.querySelector('.checkbox');
    const notifications = this.formWizardTestService.form.get('Notifications').value;
    if (notifications['Email'] && notifications['Email'] !== '') {
      this.checkBoxToogle = true;
      this.checkBox();
    }
  }

  @HostListener('click', ['$event'])
  private onMouseClick(click: MouseEvent) {
    this.checkBoxToogle = !this.checkBoxToogle;

    if (this.checkBoxToogle) {
      this.modalRef = this.modalService.show(ModalEmailConfirmComponent, {
        class: 'modal-dialog-centered rounded',
        animated: false,
        keyboard: false,
        ignoreBackdropClick: true
      });
      this.modalRef.content.action.subscribe((value: any) => {
        if (value) {
          this.checkBox();
        } else {
          this.uncheckBox();
          this.checkBoxToogle = false;
        }
      });
    }
    if (!this.checkBoxToogle) {
      const notifications = this.formWizardTestService.form.get('Notifications').value;
      notifications['Email'] = null;
      this.formWizardTestService.form.get('Notifications').patchValue(notifications);
      this.uncheckBox();
    }
  }

  private checkBox() {
    this.renderer.setProperty(this.checkBoxEl, 'innerHTML', '<i class="fa fa-check"></i>');
    this.renderer.addClass(this.checkBoxEl, 'checkbox-selected');
  }

  private uncheckBox() {
    this.renderer.setProperty(this.checkBoxEl, 'innerHTML', '');
    this.renderer.removeClass(this.checkBoxEl, 'checkbox-selected');
  }
}
