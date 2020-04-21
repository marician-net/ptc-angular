import { Component, OnInit, NgZone, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { Router, Route, ActivatedRoute } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd';
import { AuthService } from '../_services/auth.service';
import { DataService } from '../_services/data.service';
import { AdminData } from '../_models/adminlist.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-adminlist',
    templateUrl: './adminlist.component.html',
    providers: [DataService],
    styleUrls: ['./adminlist.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminlistComponent implements OnInit {
    preDataId: string;
    searchText;
    passingId: number;
    editCache = {};
    sampledata = [];
    loadAPI: Promise<any>;
    mapOfExpandData: { [key: string]: boolean } = {};
    dataSet = [];
    mdataSet = [];
    chkDotdrugtest: boolean;
    chkNotdotdrugtest: boolean;
    chkAlcoholtest: boolean;
    chkObscollec: boolean;
    chkOverallow: boolean;
    chkPrintform: boolean;
    chkEmailform: boolean;
    selectedReMode;
    selectedReason;
    selectedTimezone;
    donorname;

    pagenum = 1;
    drugval = 1;
    reasonval = 1;
    timezoneval = 1;    
    dionval = 1;
    fnameval = 1;
    mnameval = 1;
    lnameval = 1;
    ephoneval = 1;
    dphoneval = 1;    
    mphoneval = 1;
    sacszval = 1;
    rangeval = 1;
    eaddressval = 1;
    maddressval = 1;

    expdate = null;
    exptime: Date | null = null;
    psddate = null;
    psdtime: Date | null = null;
    mcomment;
    firstname;
    middlename;
    lastname;
    ephone;
    dphone;
    birthdate = null;
    mphone;
    sacsz;
    selectedRange;
    eaddress;
    maddress;
    chkSmsform: boolean;

    // Site Response Selection Variable
    ss_ID;
    ss_Address;
    ss_Appointment: boolean;
    ss_Bad_boy: boolean;
    ss_City;
    ss_Code;
    ss_Collect_Site;
    ss_Contact;
    ss_Css_Class;
    ss_Fax;
    ss_FormFoxID;
    ss_GeoLAT;
    ss_GeoLONG;
    ss_HOURS;
    ss_Inactive: boolean;
    ss_phone;
    ss_privatetext;
    ss_phoneafterhours;
    ss_private: boolean;
    ss_ST;
    ss_ZIP;
    ss_distance;
    dateFormat = 'dd.MM.YYYY';
    loading = false;

    constructor(private authService: AuthService,
        private dataService: DataService,
        private cd: ChangeDetectorRef,
        private notification: NzNotificationService,
        private router: Router,
        private _ngZone: NgZone,
        private route: ActivatedRoute) {
        this.loadAPI = new Promise((resolve) => {
            this.loadScript();
            resolve(true);
        });
    }

    dataList: any[];

    ngOnInit(): void {
        this.loading = true; 
        this.dataService.getOrder(9).subscribe(
            (res: any) => {
                this.sampledata = res.Data;
                //console.log(this.sampledata);
                this.parseData(this.sampledata);
                this.loading = false;
                this.cd.detectChanges();               
            },
            (error: HttpErrorResponse) => {
                console.log(error);
            }
        );
    }


    // load external javascript
    public loadScript() {
        let isfirst = false;
        const scripts = document.getElementsByTagName('script');
        for (let i = 0; i < scripts.length; ++i) {
            if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes('loader')) {
                isfirst = true;
            }
        }

        if (!isfirst) {
            const dynamicScripts1 = ['assets/bundles/libscripts.bundle.js'];
            const dynamicScripts2 = ['assets/bundles/vendorscripts.bundle.js'];
            const dynamicScripts3 = ['assets/bundles/mainscripts.bundle.js'];

            for (let i = 0; i < dynamicScripts1.length; i++) {
                const node = document.createElement('script');
                node.src = dynamicScripts1[i];
                node.type = 'text/javascript';
                node.async = false;
                node.charset = 'utf-8';
                document.getElementsByTagName('head')[0].appendChild(node);
            }

            for (let i = 0; i < dynamicScripts2.length; i++) {
                const node = document.createElement('script');
                node.src = dynamicScripts2[i];
                node.type = 'text/javascript';
                node.async = false;
                node.charset = 'utf-8';
                document.getElementsByTagName('head')[0].appendChild(node);
            }

            for (var i = 0; i < dynamicScripts3.length; i++) {
                const node = document.createElement('script');
                node.src = dynamicScripts3[i];
                node.type = 'text/javascript';
                node.async = false;
                node.charset = 'utf-8';
                document.getElementsByTagName('head')[0].appendChild(node);
            }
        }
    }

    parseData(rawData: Array<any>): void {
        let tempData: AdminData;
        this.dataSet = [];
        this.mdataSet = [];
        for (let i = 0; i < rawData.length; i++) {
            if (rawData[i].Id !== null && rawData[i].Id !== undefined && rawData[i].Id !== '') {
                tempData = new AdminData();
                tempData.index = i;
                tempData.ID = rawData[i].Id;
                tempData.event = rawData[i].ReferenceTestID;
                tempData.fname = rawData[i].Donor.FirstName;
                tempData.lname = rawData[i].Donor.LastName;
                tempData.dob = rawData[i].Donor.DOB;
                tempData.phone = rawData[i].Donor.MobilePhone;
                tempData.testtype = rawData[i].TestTypeDescription;
                let expDate = new Date(rawData[i].Schedule.OrderExpirationDate);
                tempData.expdate = ((expDate.getMonth() > 8) ? (expDate.getMonth() + 1) : ('0' + (expDate.getMonth() + 1))) + '/' + ((expDate.getDate() > 9) ? expDate.getDate() : ('0' + expDate.getDate())) + '/' + expDate.getFullYear();
                if (tempData.expdate == '01/01/1')
                    tempData.expdate = '';

                tempData.ordered = rawData[i].DateOrdered;
                tempData.notifiedvia = rawData[i].NotifiedVia;
                tempData.drugstatus = rawData[i].DrugStatus;
                tempData.alcstatus = rawData[i].AlcoholStatus;
                this.dataSet.push(tempData);
                this.mdataSet.push(tempData);
            }
        }
    }

    startEdit(ID: number): void {
        this._ngZone.run(() => {
            this.router.navigate(['/wizard', ID]);
        });
    }

    startResend(index: number): void {
        console.log(index);
        this.loading = true;
        if (this.sampledata[index]) {
            this.dataService.resendNotification(this.sampledata[index].Id, this.sampledata[index].Notifications).subscribe(
                result => {
                    console.log(result);
                    this.notification.create('success', 'Resend Notification', 'Message sent Successfully!', { nzDuration: 2000, nzAnimate: true });
                },
                err => {
                    console.log(err);
                    this.notification.create('error', 'Resend Notification', err.error.Error, { nzDuration: 2000, nzAnimate: true });
                });
        } else {
            this.notification.create('error', 'Resend Notification', 'There is no data to resend!', { nzDuration: 2000, nzAnimate: true });
        }
        this.loading = false;
    }

    startCancel(index: number): void {
        this.loading = true;
        this.dataService.cancelNotification(this.sampledata[index].Id).subscribe(
            result => {
                console.log(result);
                this.notification.create('success', 'Cancel Order Notification', 'Cancel Order successfully!', { nzDuration: 2000, nzAnimate: true });
                this.filterStatus('Canceled');
            },
            err => {
                console.log(err);
                this.notification.create('error', 'Cancel Order Notification', err.error.Error, { nzDuration: 2000, nzAnimate: true });
            });
        this.loading = false;
    }

    filterStatus(filter): void {

        this.loading = true; 
        let currentSel = null;
        currentSel = document.querySelector('div.filtersrch>span.selected');
        if (currentSel != null) {// if there's already one styled like it's selected, delete it.
            currentSel.classList.toggle('selected');
        }

        currentSel = document.querySelector('div.filtersrch>span#filter_' + filter.toLowerCase());

        currentSel.classList.toggle('selected');

        let status = 0;
        switch (filter) {
            case "all":
                status = 9;
                break;
            case "Scheduled":
                status = 4;
                break;
            case "Expired":
                status = 6;
                break;
            case "Canceled":
                status = 5;
                break;
            case "OK":
                status = 0;
                break;
        }
        this.dataService.getOrder(status).subscribe(
            (res: any) => {
                this.sampledata = res.Data;
                //console.log(this.sampledata);
                this.parseData(this.sampledata);
                this.loading = false;
                this.cd.detectChanges();
            },
            (error: HttpErrorResponse) => {
                console.log(error);
            }
        );
    }

    logoutfromadmin(): void {
        this.authService.logout();
        this._ngZone.run(() => {
            this.router.navigateByUrl('/login');
        });
    }

    prefill_data(rawData: Array<any>, index: string): void {
        let tempid: number;
        for (let i = 0; i < rawData.length; i++) {
            if (rawData[i].Id === Number(index)) {
                tempid = i;
            }
        }
        // console.log(rawData[tempid]);
        if (rawData[tempid] !== null && rawData[tempid] !== undefined) {
            /*Start prefill Test Type*/
            switch (rawData[tempid].TestType) {
                case 1: {
                    this.chkDotdrugtest = true;
                    break;
                }
                case 2: {
                    this.chkNotdotdrugtest = true;
                    break;
                }
                case 3: {
                    this.chkAlcoholtest = true;
                    break;
                }
                case 4: {
                    this.chkObscollec = true;
                    break;
                }
                default: {
                    // statements;
                    break;
                }
            }

            switch (rawData[tempid].RegulatoryMode) {
                case 0: {
                    this.selectedReMode = 'PHMSA';
                    this.drugval = 2;
                    break;
                }
                case 1: {
                    this.selectedReMode = 'FMCSA';
                    this.drugval = 2;
                    break;
                }
                case 2: {
                    this.selectedReMode = 'FAA';
                    this.drugval = 2;
                    break;
                }
                case 3: {
                    this.selectedReMode = 'FRA';
                    this.drugval = 2;
                    break;
                }
                case 4: {
                    this.selectedReMode = 'USCG';
                    this.drugval = 2;
                    break;
                }
                default: {
                    // statements;
                    break;
                }
            }

            if (rawData[tempid].Reason !== null && rawData[tempid].Reason !== undefined) {
                this.selectedReason = rawData[tempid].Reason;
                this.reasonval = 2;
            }
            /*End Test Type*/

            /*Start prefill  Schedule */
            switch (rawData[tempid].Schedule.TimeZone) {
                case 'CST': {
                    this.selectedTimezone = 'CST';
                    this.timezoneval = 2;
                    break;
                }
                case 'PST': {
                    this.selectedTimezone = 'PST';
                    this.timezoneval = 2;
                    break;
                }
                case 'MST': {
                    this.selectedTimezone = 'MST';
                    this.timezoneval = 2;
                    break;
                }
                case 'EST': {
                    this.selectedTimezone = 'EST';
                    this.timezoneval = 2;
                    break;
                }
                default: {
                    // statements;
                    break;
                }
            }

            if (
                rawData[tempid].Schedule.OrderExpirationDate !== null &&
                rawData[tempid].Schedule.OrderExpirationDate !== undefined
            ) {
                //  var tempexpdate = new Date(rawData[tempid].Schedule.OrderExpirationDate);
                //  (tempexpdate.getMonth() + 1) + '/' + tempexpdate.getDate() + '/' + tempexpdate.getFullYear();
                this.expdate = this.changeDateFormat(rawData[tempid].Schedule.OrderExpirationDate);
            }

            if (
                rawData[tempid].Schedule.PreferredScheduledDate !== null &&
                rawData[tempid].Schedule.PreferredScheduledDate !== undefined
            ) {
                //  var temppsddate = new Date(rawData[tempid].Schedule.PreferredScheduledDate);
                //  this.psddate = (temppsddate.getMonth() + 1) + '/' + temppsddate.getDate() + '/' + temppsddate.getFullYear();
                this.psddate = this.changeDateFormat(rawData[tempid].Schedule.PreferredScheduledDate);
            }

            this.chkOverallow = rawData[tempid].Schedule.OverrideAllowed;
            /*End Schedule */

            /*Start prefill Donor */
            if (rawData[tempid].Donor !== null && rawData[tempid].Donor !== undefined) {
                // this.donorname = rawData[tempid].Donor.ID;
                this.donorname =
                    'Full Name:' +
                    rawData[tempid].Donor.FullName +
                    ',' +
                    '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' +
                    ' Birthday:' +
                    '\xa0\xa0' +
                    this.changeDateFormat(rawData[tempid].Donor.DOB);
                this.dionval = 2;
                if (
                    rawData[tempid].Donor.FirstName !== null &&
                    rawData[tempid].Donor.FirstName !== undefined
                ) {
                    this.firstname = rawData[tempid].Donor.FirstName;
                    this.fnameval = 2;
                }
                if (
                    rawData[tempid].Donor.MiddleName !== null &&
                    rawData[tempid].Donor.MiddleName !== undefined
                ) {
                    this.middlename = rawData[tempid].Donor.MiddleName;
                    this.mnameval = 2;
                }
                if (
                    rawData[tempid].Donor.LastName !== null &&
                    rawData[tempid].Donor.LastName !== undefined
                ) {
                    this.lastname = rawData[tempid].Donor.LastName;
                    this.lnameval = 2;
                }
                if (
                    rawData[tempid].Donor.EveningPhone !== null &&
                    rawData[tempid].Donor.EveningPhone !== undefined
                ) {
                    this.ephone = rawData[tempid].Donor.EveningPhone;
                    this.ephoneval = 2;
                }
                if (
                    rawData[tempid].Donor.DaytimePhone !== null &&
                    rawData[tempid].Donor.DaytimePhone !== undefined
                ) {
                    this.dphone = rawData[tempid].Donor.DaytimePhone;
                    this.dphoneval = 2;
                }
                if (rawData[tempid].Donor.DOB !== null && rawData[tempid].Donor.DOB !== undefined) {
                    //  var tempdob = new Date(rawData[tempid].Donor.DOB);
                    //  this.birthdate = (tempdob.getMonth() + 1) + '/' + tempdob.getDate() + '/' + tempdob.getFullYear();
                    this.birthdate = this.changeDateFormat(rawData[tempid].Donor.DOB);
                }
                if (
                    rawData[tempid].Donor.MobilePhone !== null &&
                    rawData[tempid].Donor.MobilePhone !== undefined
                ) {
                    this.mphone = rawData[tempid].Donor.MobilePhone;
                    this.mphoneval = 2;
                }
            }
            /*End Donor */

            /*Start prefill SITE Selection */
            /*End SITE Selection */

            /*Start prefill Notification */
            this.chkPrintform = rawData[tempid].Notifications.PrintForm;
            if (
                rawData[tempid].Notifications.Email !== null &&
                rawData[tempid].Notifications.Email !== undefined
            ) {
                this.chkEmailform = true;
                this.eaddress = rawData[tempid].Notifications.Email;
                this.eaddressval = 2;
            }
            if (
                rawData[tempid].Notifications.SMSPhone !== null &&
                rawData[tempid].Notifications.SMSPhone !== undefined
            ) {
                this.chkSmsform = true;
                this.maddress = rawData[tempid].Notifications.SMSPhone;
                this.maddressval = 2;
            }
            /*End Notification */
        }
    }

    changeDateFormat(date: string): string {
        const tempdate = new Date(date);
        const result = tempdate.getMonth() + 1 + '/' + tempdate.getDate() + '/' + tempdate.getFullYear();
        return result;
    }

    Selectsite(site: any): void {
        // console.log("Select Site", site);
        this.ss_ID = site.ID;
        this.ss_Address = site.ADDRESS;
        this.ss_Appointment = site.Appointment_Req;
        this.ss_Bad_boy = site.Bad_Boy;
        this.ss_City = site.CITY;
        this.ss_Code = site.CODE;
        this.ss_Collect_Site = site.COLLECTION_SITE;
        this.ss_Contact = site.CONTACT;
        this.ss_Css_Class = site.CSS_CLASS;
        this.ss_Fax = site.FAX;
        this.ss_FormFoxID = site.FormFoxID;
        this.ss_GeoLAT = site.GeoLAT;
        this.ss_GeoLONG = site.GeoLONG;
        this.ss_HOURS = site.HOURS;
        this.ss_Inactive = site.Inactive;
        this.ss_phone = site.PHONE;
        this.ss_privatetext = site.PRIVATE_TEXT;
        this.ss_phoneafterhours = site.PhoneAfterHours;
        this.ss_private = site.Private;
        this.ss_ST = site.ST;
        this.ss_ZIP = site.ZIP;
        this.ss_distance = site.distance;
        this.pagenum++;
    }

    Nextsection(): void {
        this.pagenum++;
    }

    Prevsection(): void {
        this.pagenum--;
    }

    Resetsection(): void {
        this.pagenum = 1;
    }

    setValue(value: number) {
        this.pagenum = value;
    }

}
