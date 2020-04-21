import { Directive, HostListener, ElementRef, Renderer2, OnInit } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import * as _ from 'lodash';
import { ModalDotDrugConfirmComponent } from 'src/app/components/wizard';

import { FormWizardTestService } from 'src/app/_services';

@Directive({
    selector: '[appDotDrugConfirm]'
})
export class DotDrugConfirmDirective implements OnInit {
    checkBoxToogle: any;
    checkBoxEl: any;
    dotDrugEl: Element;
    modalRef: BsModalRef;
    divDrugBranch: any;
   
    divNDOTTestType: any;

    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
        private modalService: BsModalService,
        private formWizardTestService: FormWizardTestService
    ) { }

    ngOnInit(): void {
        this.checkBoxEl = this.el.nativeElement.querySelector('.checkbox');
        this.divDrugBranch = this.el.nativeElement.querySelector('#divDrugBranch');
       
        this.divNDOTTestType = this.el.nativeElement.parentElement.parentElement.parentElement.parentElement.querySelector("#divNDOTTestType");

        this.dotDrugElementCreate();

        if (this.formWizardTestService.form.get('TestType').value) {
            this.checkBoxToogle = true;
            this.toggleDotDrug(this.formWizardTestService.form.get('TestType').value);
            this.checkBox();
        }
    }

    @HostListener('click', ['$event'])
    public onMouseClick(click: MouseEvent) {
        this.checkBoxToogle = !this.checkBoxToogle;

        if (this.checkBoxToogle) {
            // Drug is CHECKED
            this.modalRef = this.modalService.show(ModalDotDrugConfirmComponent, {
                class: 'modal-dialog-centered rounded',
                animated: false,
                keyboard: false,
                ignoreBackdropClick: true
            });
            this.modalRef.content.origin = 'drug';

            this.modalRef.content.action.subscribe((value: number) => {
                this.checkBox();
                this.toggleDotDrug(value);
                this.formWizardTestService.form.get('TestType').patchValue(value);
                console.log('TestType = ' + value);
            });
        } else {
            // Drug is UNchecked
            this.formWizardTestService.form.get('TestType').patchValue('');
            this.uncheckBox();
            this.renderer.removeChild(this.el.nativeElement.parentElement, this.dotDrugEl);
            this.renderer.setProperty(this.divNDOTTestType, 'style', 'display:none;');
            console.log(this.formWizardTestService.form.get("TestType"));
        }

        click.stopPropagation();
    }

    private dotDrugElementCreate() {
        this.dotDrugEl = this.renderer.createElement('div');
        this.renderer.addClass(this.dotDrugEl, 'drug-dot-tag');
        const text = this.renderer.createText('DOT');
        this.renderer.appendChild(this.dotDrugEl, text);
    }

    private toggleDotDrug(value: number) {
        const element: Element = this.el.nativeElement.parentElement;
        switch (value) {
            case 0:
            // Non-DOT
            {
                this.renderer.removeChild(element, this.dotDrugEl);
                this.renderer.setProperty(this.divNDOTTestType, 'style', '');
                break;
            }
            case 1:
            // DOT
            {
                this.renderer.appendChild(element, this.dotDrugEl);
                this.renderer.setProperty(this.divNDOTTestType, 'style', 'display:none;');
                break;
            }          
        }
    }

    public checkBox() {
        this.renderer.setProperty(this.checkBoxEl, 'innerHTML', '<i class="fa fa-check"></i>');
        this.renderer.addClass(this.checkBoxEl, 'checkbox-selected');
    }

    public uncheckBox() {
        this.renderer.setProperty(this.checkBoxEl, 'innerHTML', '');
        this.renderer.removeClass(this.checkBoxEl, 'checkbox-selected');
    }
}
