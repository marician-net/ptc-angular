import { Directive, ElementRef, Renderer2, OnInit, HostListener } from '@angular/core';
import { FormWizardTestService } from 'src/app/_services';

@Directive({
  selector: '[appWizardPrintformCheckbox]'
})
export class WizardPrintformCheckboxDirective implements OnInit {
  checkBoxEl: any;
  checkBoxToogle: any;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private formWizardTestService: FormWizardTestService
  ) {}

  ngOnInit() {
    this.checkBoxEl = this.el.nativeElement.querySelector('.checkbox');
    const notifications = this.formWizardTestService.form.get('Notifications').value;
    if (notifications['PrintForm']) {
      this.checkBoxToogle = true;
      this.checkBox();
    }
  }

  @HostListener('click', ['$event'])
  private onMouseClick(click: MouseEvent) {
    this.checkBoxToogle = !this.checkBoxToogle;
    const notifications = this.formWizardTestService.form.get('Notifications').value;

    if (this.checkBoxToogle) {
      this.checkBox();
      notifications['PrintForm'] = true;
      this.formWizardTestService.form.get('Notifications').patchValue(notifications);
    }
    if (!this.checkBoxToogle) {
      notifications['PrintForm'] = false;
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
