import { Directive, ElementRef, Renderer2, HostListener, OnInit } from '@angular/core';
import { FormWizardTestService } from 'src/app/_services';

@Directive({
    selector: '[appObservedCollection]'
})
export class ObservedCollectionDirective {
    checkBoxEl: any;
    checkBoxToogle: any;
    sameGenderDiv: any;

    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
        private formWizardTestService: FormWizardTestService
    ) { }

    ngOnInit(): void {
        this.checkBoxEl = this.el.nativeElement.querySelector('.checkbox');
        this.sameGenderDiv = this.el.nativeElement.querySelector('#divSameGender');
        const observedcollection = this.formWizardTestService.form.get('ObservedCollection').value;
        if (observedcollection == "1") {
            this.checkBoxToogle = true;
            this.checkBox();
        }

    }

    @HostListener('click', ['$event'])
    private onMouseClick(click: MouseEvent) {
        this.checkBoxToogle = !this.checkBoxToogle;

        if (this.checkBoxToogle) {
            this.checkBox();
            this.formWizardTestService.form.get('ObservedCollection').patchValue("1");
        }
        if (!this.checkBoxToogle) {
            this.formWizardTestService.form.get('ObservedCollection').patchValue("0");
            this.uncheckBox();
        }
    }

    private checkBox() {
        this.renderer.setProperty(this.checkBoxEl, 'innerHTML', '<i class="fa fa-check"></i>');
        this.renderer.addClass(this.checkBoxEl, 'checkbox-selected');

        this.renderer.setProperty(this.sameGenderDiv, 'style', 'color:red;');

    }

    private uncheckBox() {
        this.renderer.setProperty(this.checkBoxEl, 'innerHTML', '');
        this.renderer.removeClass(this.checkBoxEl, 'checkbox-selected');
        this.renderer.setProperty(this.sameGenderDiv, 'style', 'display:none;')
    }

}
