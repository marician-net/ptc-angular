import { Directive, HostListener, ElementRef, Renderer2, OnInit } from '@angular/core';
import { ModalDotDrugConfirmComponent } from '../../components/wizard';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormWizardTestService } from '../../_services';

@Directive({
    selector: '[appAlcoholCheckbox]'
})
export class AlcoholCheckboxDirective implements OnInit {
    isChecked = false;
    modalRef: BsModalRef;
    dotDrugEl: Element;
    checkBoxToogle: any;
    checkBoxEl: any;
    divDOTAlcohol: any;
    divNDOTTestType: any;

    constructor(private el: ElementRef, private renderer: Renderer2, private modalService: BsModalService,
        private formWizardTestService: FormWizardTestService) { }

    ngOnInit(): void {
        this.checkBoxEl = this.el.nativeElement.querySelector('.checkbox');
        this.divDOTAlcohol = this.el.nativeElement.querySelector('#divDOTAlcohol');
        this.dotDrugElementCreate();
        this.divNDOTTestType = this.el.nativeElement.parentElement.parentElement.parentElement.parentElement.querySelector("#divNDOTTestTypeAlcohol");

        if (this.formWizardTestService.form.get('TestTypeAlcohol').value) {
            this.checkBoxToogle = true;
            this.toggleDotDrug(this.formWizardTestService.form.get('TestTypeAlcohol').value);
            this.checkBox();
        }
    }

    @HostListener('click', ['$event'])
    private onMouseClick(click: MouseEvent) {
        this.isChecked = !this.isChecked;

        const checkBox = this.el.nativeElement.querySelector('.checkbox');

        if (this.isChecked) {
            this.modalRef = this.modalService.show(ModalDotDrugConfirmComponent, {
                class: 'modal-dialog-centered rounded',
                animated: false,
                keyboard: false,
                ignoreBackdropClick: true
            });

            this.modalRef.content.origin = 'alcohol';
            this.modalRef.content.action.subscribe((value: number) => {
                this.checkBox();
                this.toggleDotDrug(value);
                this.formWizardTestService.form.get('TestTypeAlcohol').patchValue(value);
            });
            this.checkBox();
        } else {
            this.formWizardTestService.form.get('TestTypeAlcohol').patchValue(0);
            this.uncheckBox();
            this.renderer.removeChild(this.el.nativeElement.parentElement, this.dotDrugEl);
            this.renderer.setProperty(this.divDOTAlcohol, "style", "display:none;");
            this.renderer.setProperty(this.divNDOTTestType, 'style', 'display:none;');
        }
    }

    private toggleDotDrug(value: number) {
        const element: Element = this.el.nativeElement.parentElement;
        switch (value) {
            case 2: { // DOT
                this.renderer.appendChild(element, this.dotDrugEl);
                this.renderer.setProperty(this.divDOTAlcohol, "style", "color:red;");
                this.renderer.setProperty(this.divNDOTTestType, 'style', 'display:none;');
                break;
            }
            case 3: { // Non-DOT
                this.renderer.removeChild(element, this.dotDrugEl);
                this.renderer.setProperty(this.divDOTAlcohol, "style", "display:none;");
                this.renderer.setProperty(this.divNDOTTestType, 'style', '');
                break;
            }
            default: {
                // statements;
                break;
            }
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
    private dotDrugElementCreate() {
        this.dotDrugEl = this.renderer.createElement('div');
        this.renderer.addClass(this.dotDrugEl, 'drug-dot-tag-alcohol');
        const text = this.renderer.createText('DOT');
        this.renderer.appendChild(this.dotDrugEl, text);
    }
}
