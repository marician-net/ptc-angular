import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef, ElementRef, ViewChild, Renderer } from '@angular/core';
import { DataService } from '../../../_services/data.service';
import { FormWizardTestService } from '../../../_services';

@Component({
    selector: 'app-donor-wizard',
    templateUrl: './donor-wizard.component.html',
    styleUrls: ['./donor-wizard.component.scss']
})
export class DonorWizardComponent implements OnInit {
    @Output() controls = new EventEmitter<number>();
    @ViewChild('donorSearch') donorSearch: ElementRef;
    donorname;
    dionval = 1;
    donorResponse: any[];
    initialDonordata: any[] = [];
    loading = false;

    constructor(
        private dataService: DataService,
        private cd: ChangeDetectorRef,
        private renderer: Renderer,
        public formWizardTestService: FormWizardTestService
    ) { }

    ngOnInit() {
        this.loading = true;
        const donor = this.formWizardTestService.form.get('Donor').value;
        if (!this.formWizardTestService.isEmpty(donor)) {
            this.donorResponse = [donor];
        }
        this.dataService.getDonoralldata().subscribe((res: any) => {
            let tempDonordata = res.Data;
            for (let i in tempDonordata) {
                this.initialDonordata.push(tempDonordata[i]);
            }
            this.loading = false;
            this.cd.detectChanges();
        });
    }

    nextSection(donor: any) {
        // add DL # and State in case they were set on the Test Type step
        donor.DriverLicenseNumber = this.formWizardTestService.form.get('DriverLicenseNumber').value;
        donor.DriverLicenseState = this.formWizardTestService.form.get('DriverLicenseState').value;
        this.formWizardTestService.form.get('Donor').patchValue(donor);
        this.controls.emit();
    }
    donorAutoComplete(event): void {
        this.donorSearch.nativeElement.focus();
        const value = event.target.value;
        const isnum = /^\d+$/.test(value);
        if (this.donorname === null || this.donorname === undefined) {
            this.dionval = 1;
        } else {
            this.dionval = 2;
        }

        this.loading = true;
        this.dataService.getDonordata(value, isnum).subscribe((res: any) => {
            this.donorResponse = res.Data;
            this.loading = false;
            this.cd.detectChanges();
        });
    }
    changeDateFormat(date: string): string {
        const tempdate = new Date(date);
        const result = tempdate.getMonth() + 1 + '/' + tempdate.getDate() + '/' + tempdate.getFullYear();
        return result;
    }
}
