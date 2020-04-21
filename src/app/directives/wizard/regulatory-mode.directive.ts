import { Directive, HostListener, ElementRef, Renderer2, OnInit } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import * as _ from 'lodash';
import { ModalDotDrugConfirmComponent } from 'src/app/components/wizard';

import { FormWizardTestService } from 'src/app/_services';

@Directive({
    selector: '[appRegulatoryMode]'
})
export class RegulatoryModeDirective implements OnInit {
    divCDL: any;

    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
        private modalService: BsModalService,
        private formWizardTestService: FormWizardTestService
    ) { }

    ngOnInit(): void {
        this.divCDL = this.el.nativeElement.parentElement.parentElement.querySelector('#divCDL');
    }

    @HostListener('click', ['$event'])
    private onMouseClick(click: MouseEvent) {
       
        if (this.el.nativeElement.value == "FMCSA")
            this.renderer.setProperty(this.divCDL, 'style', '');
        else
            this.renderer.setProperty(this.divCDL, 'style', 'display:none;');

        click.stopPropagation();
    }

   
}
