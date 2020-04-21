import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef, SimpleChanges } from '@angular/core';
import { Options } from 'ng5-slider';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DataService } from '../../../_services/data.service';
import { FormWizardTestService } from '../../../_services';

@Component({
    selector: 'app-site-wizard',
    templateUrl: './site-wizard.component.html',
    styleUrls: ['./site-wizard.component.scss']
})
export class SiteWizardComponent implements OnInit {
    @Output() controls = new EventEmitter<number>();
    searchRange = 200;
    sliderOptions: Options = {
        floor: 0,
        ceil: 1000
    };
    title = 'PTC';
    lat = 37.8153796;
    lng = -96.8503509;
    selectedSite: null;
    searchText = '';
    control = new FormControl();
    streets: any[] = [];
    filteredStreets: Observable<string[]>;
    initialSitedata: any[] = [];
    loading = false;

    constructor(private dataService: DataService, private cd: ChangeDetectorRef, public formWizardTestService: FormWizardTestService) { }

    ngOnInit() {
       
        this.loadData();
        const site = this.formWizardTestService.form.get('SelectedSite').value;
        if (!this.formWizardTestService.isEmpty(site)) {
            this.control.setValue(site['CITY'] + ', ' + site['ADDRESS']);
            const lat = site['GeoLAT'];
            const long = site['GeoLONG'];
            if (lat && long) {
                this.lat = lat;
                this.lng = long;
            }
        }
       
    }

    loadData() {
        this.loading = true;
        this.dataService.getSitedatawithparams(this.searchText, this.searchRange.toString()).subscribe((res: any) => {
            this.initialSitedata = [];
            const tempSitedata = res.Data;
            for (let i in tempSitedata) {
                if (i !== '50') {
                    this.initialSitedata.push(tempSitedata[i]);
                }
            }
            this.streets = this.initialSitedata;
            console.log(this.initialSitedata);
            this.loading = false;
            this.cd.detectChanges();
        });
    }
    searchSites(data: any) {
        this.loadData();
    }

    nextSection(site: any) {
        this.adressSelected(site);
        this.formWizardTestService.form.get('SelectedSite').patchValue(site);
        this.controls.emit();
    }

    private _normalizeValue(value: string): string {
        return value.toLowerCase().replace(/\s/g, '');
    }

    adressSelected(addressObj: any) {
        this.lat = parseFloat(addressObj['GeoLAT']);
        this.lng = parseFloat(addressObj['GeoLONG']);
        this.selectedSite = addressObj;
    }

}
