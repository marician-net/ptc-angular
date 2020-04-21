import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  NgZone
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { DataService } from '../_services/data.service';
import { NzNotificationService, NzMessageService } from 'ng-zorro-antd';
import * as differenceInCalendarDays from 'date-fns/difference_in_calendar_days';

import { FormWizardTestService } from 'src/app/_services';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  providers: [DataService],
  styleUrls: ['./wizard.component.css'],
})
export class WizardComponent implements OnInit, OnDestroy {
  preDataId: string;
  dateFormat = 'MM/dd/yyyy';
  today = new Date();
  chkDotdrugtest: boolean;
  chkNotdotdrugtest: boolean;
  chkAlcoholtest: boolean;
  chkObscollec: boolean;
  chkOverallow: boolean;
  chkPrintform: boolean;
  chkEmailform: boolean;
  chkSmsform: boolean;

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

  selectedReMode;
  selectedReason;
  selectedTimezone;
  expdate = null;
  exptime: Date | null = null;
  psddate = null;
  psdtime: Date | null = null;
  mcomment;
  donorname;
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

  sampledata = [];

  ReModata: Array<string> = ['PHMSA', 'FMCSA', 'FAA', 'FRA', 'USCG'];
  Reasondata: Array<string> = [
    'Pre-Employment',
    'Random',
    'Reasonable Suspicion/Cause',
    'Return to Duty',
    'Post Accident',
    'Follow-Up',
    'Other'
  ];
  Timezonedata: Array<string> = ['EST', 'CST', 'MST', 'PST'];
  Rangedata: Array<string> = ['100 miles', '200 miles', '500 miles', '1000 miles'];

  filteredDonorOptions: string[] = [];
  donorResponse;
  filteredSiteOptions: string[] = [];
  siteResponse;
  searchRange;

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

  // postData: null;
  postData = {
    Id: this.donorname,
    Donor: {
      ID: this.donorname,
      'Full Name': this.firstname + this.middlename + this.lastname,
      'Last Name': this.lastname,
      'First Name': this.firstname,
      'Middle Name': this.middlename,
      EveningPhone: this.ephone,
      DaytimePhone: this.dphone,
      DOB: this.birthdate,
      MobilePhone: this.mphone
    },
    Schedule: {
      TimeZone: this.selectedTimezone,
      OrderExpirationDate: this.expdate,
      OverrideAllowed: this.chkOverallow,
      PreferredScheduledDate: this.psdtime
    },
    Status: 0,
    TestType: this.chkDotdrugtest,
    RegulatoryMode: this.selectedReMode,
    Reason: this.selectedReason,
    ObservedCollection: this.chkObscollec,
    SelectedSite: {
      ID: this.ss_ID,
      COLLECTION_SITE: null,
      ADDRESS: this.ss_Address,
      CITY: this.ss_City,
      ST: this.ss_ST,
      ZIP: this.ss_ZIP,
      GeoLAT: this.ss_GeoLAT,
      GeoLONG: this.ss_GeoLONG,
      CONTACT: this.ss_Contact,
      PHONE: this.ss_phone,
      CODE: this.ss_Code,
      HOURS: this.ss_HOURS,
      FAX: this.ss_Fax,
      Inactive: this.ss_Inactive,
      Bad_Boy: this.ss_Bad_boy,
      distance: this.ss_distance,
      PhoneAfterHours: this.ss_phoneafterhours,
      Appointment_Req: this.ss_Appointment,
      Private: this.ss_private,
      PRIVATE_TEXT: this.ss_privatetext,
      CSS_CLASS: this.ss_Css_Class,
      FormFoxID: this.ss_FormFoxID
    },
    Notifications: {
      PrintForm: this.chkPrintform,
      Email: this.eaddress,
      SMSPhone: this.maddress
    }
  };

    
  constructor(
    private authService: AuthService,
    private dataService: DataService,
    private _ngZone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
    private notification: NzNotificationService,
    private message: NzMessageService,
    private cd: ChangeDetectorRef,
    public formWizardTestService: FormWizardTestService
  ) {}

  ngOnInit() {
    this.preDataId = this.route.snapshot.paramMap.get('id');
    //  console.log("Post Data ID", this.preDataId);
    if (this.preDataId !== 'new') {
        this.dataService.getAnOrder(this.preDataId).subscribe((res: any) => {
            this.sampledata = res.Data;
            this.formWizardTestService.form.patchValue(this.sampledata);
        //this.prefill_data(this.sampledata, this.preDataId);
        this.cd.detectChanges();
      });
    }
  }

  ngOnDestroy() {
    // this.preData.unsubscribe();
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

  FinishSection(): void {
    if (!this.eaddress.includes('@')) {
      this.eaddress = '';
      this.notification.create('error', 'Invalid Email', 'Please input correct email!', {
        nzDuration: 2000,
        nzAnimate: true
      });
      return;
    }
    if (this.postData) {
      this.dataService.postOrder(this.postData).subscribe((res: any) => {
        if (res) {
          this._ngZone.run(() => {
            // this.router.navigate(['/wizard']);
            this.message.create('success', 'Data posted successfully!!!');
          });
        } else {
          // this.notification.create('error', 'Failed', 'Failed to post data!', {nzDuration: 2000, nzAnimate: true});
          this.notification.create('error', 'Failed', 'Failed to post data!', {
            nzDuration: 2000,
            nzAnimate: true
          });
        }
      });
    } else {
      // this.notification.create('error', 'No Data', 'There is no data to post!', {nzDuration: 2000, nzAnimate: true});
      this.notification.create('error', 'No Data', 'There is no data to post!', {
        nzDuration: 2000,
        nzAnimate: true
      });
    }
  }

  Cancelsection(): void {
    this._ngZone.run(() => {
      this.router.navigateByUrl('/adminlist');
    });
  }

  prefill_data(rawData: Array<any>, index: string): void {
    var tempid: number;
    for (var i = 0; i < rawData.length; i++) {
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

      const data = this.formWizardTestService.form.value;
      this.postData = {...data, ...this.postData}; // this is the answer
      this.formWizardTestService.form.patchValue(this.postData);
      /*End Notification */
    }
  }

  autofillDonorData(event): void {
    const fullname = event.split(',')[0].split(':')[1];
    if (event.includes('Full Name:')) {
      for (var i = 0; i < this.donorResponse.length; i++) {
        if (fullname === this.donorResponse[i].FullName) {
          if (
              this.donorResponse[i].FirstName !== null &&
              this.donorResponse[i].FirstName !== undefined &&
              this.donorResponse[i].FirstName !== ''
          ) {
            this.fnameval = 2;
            this.firstname = this.donorResponse[i].FirstName;
          }
          if (
              this.donorResponse[i].MiddleName !== null &&
              this.donorResponse[i].MiddleName !== undefined &&
              this.donorResponse[i].MiddleName !== ''
          ) {
            this.mnameval = 2;
            this.middlename = this.donorResponse[i].MiddleName;
          }
          if (
              this.donorResponse[i].LastName !== null &&
              this.donorResponse[i].LastName !== undefined &&
              this.donorResponse[i].LastName !== ''
          ) {
            this.lnameval = 2;
            this.lastname = this.donorResponse[i].LastName;
          }
          if (
              this.donorResponse[i].EveningPhone !== null &&
              this.donorResponse[i].EveningPhone !== undefined &&
              this.donorResponse[i].EveningPhone !== ''
          ) {
            this.ephoneval = 2;
            this.ephone = this.donorResponse[i].EveningPhone;
          }
          if (
              this.donorResponse[i].DaytimePhone !== null &&
              this.donorResponse[i].DaytimePhone !== undefined &&
              this.donorResponse[i].DaytimePhone !== ''
          ) {
            this.dphoneval = 2;
            this.dphone = this.donorResponse[i].DaytimePhone;
          }
          if (
              this.donorResponse[i].DOB !== null &&
              this.donorResponse[i].DOB !== undefined &&
              this.donorResponse[i].DOB !== ''
          ) {
            this.birthdate = this.changeDateFormat(this.donorResponse[i].DOB);
          }
          if (
              this.donorResponse[i].MobilePhone !== null &&
              this.donorResponse[i].MobilePhone !== undefined &&
              this.donorResponse[i].MobilePhone !== ''
          ) {
            this.mphoneval = 2;
            this.mphone = this.donorResponse[i].MobilePhone;
          }
        }
      }
      this.cd.detectChanges();
    }
  }

  sacszSelect(event): void {
    var value = event.target.value;
    if (this.sacsz === null || this.sacsz === undefined) {
      this.sacszval = 1;
    } else {
      this.sacszval = 2;
    }

    if (value !== '') {
      if (this.searchRange !== null && this.searchRange !== undefined && this.searchRange !== '') {
        this.dataService
            .getSitedatawithparams(this.sacsz, this.searchRange)
            .subscribe((res: any) => {
              this.siteResponse = res.Data;
              this.cd.detectChanges();
            });
      } else {
        this.dataService.getSitedata(value).subscribe((res: any) => {
          this.siteResponse = res.Data;
          this.cd.detectChanges();
        });
      }
    }
  }

  rangeSelect(event): void {
    if (this.sacsz !== null && this.sacsz !== undefined && this.sacsz !== '') {
      switch (event) {
        case '100 miles': {
          this.searchRange = 100;
          break;
        }
        case '200 miles': {
          this.searchRange = 200;
          break;
        }
        case '500 miles': {
          this.searchRange = 500;
          break;
        }
        case '1000 miles': {
          this.searchRange = 1000;
          break;
        }
        default: {
          // statements;
          break;
        }
      }
      this.dataService.getSitedatawithparams(this.sacsz, this.searchRange).subscribe((res: any) => {
        this.siteResponse = res.Data;
        this.cd.detectChanges();
      });
    }
  }

  changeDateFormat(date: string): string {
    var tempdate = new Date(date);
    var result = tempdate.getMonth() + 1 + '/' + tempdate.getDate() + '/' + tempdate.getFullYear();
    return result;
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

  logoutfromorder(): void {
    this.authService.logout();
    this._ngZone.run(() => {
      this.router.navigateByUrl('/login');
    });
  }

  setValue(value: number) {
    this.pagenum = value;
  }

  setDrugval(focusval: number) {
    if (focusval === 2) {
      this.drugval = focusval;
    }
    if (focusval === 1) {
      if (
          this.selectedReMode === null ||
          this.selectedReMode === undefined ||
          this.selectedReMode === ''
      ) {
        this.drugval = focusval;
      } else {
        this.drugval = 2;
      }
    }
  }

  selRemode() {
    if (this.selectedReMode === null || this.selectedReMode === undefined) {
      this.drugval = 1;
    } else {
      this.drugval = 2;
    }
  }

  setReasonval(focusval: number) {
    if (focusval === 2) {
      this.reasonval = focusval;
    }
    if (focusval === 1) {
      if (
          this.selectedReason === null ||
          this.selectedReason === undefined ||
          this.selectedReason === ''
      ) {
        this.reasonval = focusval;
      } else {
        this.reasonval = 2;
      }
    }
  }

  selReason() {
    if (this.selectedReason === null || this.selectedReason === undefined) {
      this.reasonval = 1;
    } else {
      this.reasonval = 2;
    }
  }

  setTimezoneval(focusval: number) {
    if (focusval === 2) {
      this.timezoneval = focusval;
    }
    if (focusval === 1) {
      if (
          this.selectedTimezone === null ||
          this.selectedTimezone === undefined ||
          this.selectedReason === ''
      ) {
        this.timezoneval = focusval;
      } else {
        this.timezoneval = 2;
      }
    }
  }

  selTimezone() {
    if (this.selectedTimezone === null || this.selectedTimezone === undefined) {
      this.timezoneval = 1;
    } else {
      this.timezoneval = 2;
    }
  }

  onChangeexpdate(result: Date): void {
    this.expdate = result;
  }
  //  setExdateval(focusval: number){
  //    this.exdateval = focusval;
  //  }

  onChangeexptime(time: Date): void {
    this.exptime = time;
  }

  //  setTimeval(focusval: number){
  //    this.timeval = focusval;
  //  }

  onChangepsddate(result: Date): void {
    this.psddate = result;
  }

  //  setPsdate(focusval: number){
  //    this.psdate = focusval;
  //  }

  onChangepsdtime(time: Date): void {
    this.psdtime = time;
  }

  //  setPtimeval(focusval: number){
  //    this.ptimeval = focusval;
  //  }

  onChangeComment(comment: string): void {
    this.mcomment = comment;
  }

  setDionval(focusval: number) {
    if (focusval === 2) {
      this.dionval = focusval;
    }
    if (focusval === 1) {
      if (this.donorname === null || this.donorname === undefined || this.donorname === '') {
        this.dionval = focusval;
      } else {
        this.dionval = 2;
      }
    }
  }

  setFnameval(focusval: number) {
    if (focusval === 2) {
      this.fnameval = focusval;
    }
    if (focusval === 1) {
      if (this.firstname === null || this.firstname === undefined || this.firstname === '') {
        this.fnameval = focusval;
      } else {
        this.fnameval = 2;
      }
    }
  }

  setMnameval(focusval: number) {
    if (focusval === 2) {
      this.mnameval = focusval;
    }
    if (focusval === 1) {
      if (this.middlename === null || this.middlename === undefined || this.middlename === '') {
        this.mnameval = focusval;
      } else {
        this.mnameval = 2;
      }
    }
  }

  setLnameval(focusval: number) {
    if (focusval === 2) {
      this.lnameval = focusval;
    }
    if (focusval === 1) {
      if (this.lastname === null || this.lastname === undefined || this.lastname === '') {
        this.lnameval = focusval;
      } else {
        this.lnameval = 2;
      }
    }
  }

  setEphoneval(focusval: number) {
    if (focusval === 2) {
      this.ephoneval = focusval;
    }
    if (focusval === 1) {
      if (this.ephone === null || this.ephone === undefined || this.ephone === '') {
        this.ephoneval = focusval;
      } else {
        this.ephoneval = 2;
      }
    }
  }

  setDphoneval(focusval: number) {
    if (focusval === 2) {
      this.dphoneval = focusval;
    }
    if (focusval === 1) {
      if (this.dphone === null || this.dphone === undefined || this.dphone === '') {
        this.dphoneval = focusval;
      } else {
        this.dphoneval = 2;
      }
    }
  }

  onChangebirthdate(result: Date): void {
    this.birthdate = result;
  }

  //  setBirthdateval(focusval: number){
  //    this.birthdateval = focusval;
  //  }

  setMphoneval(focusval: number) {
    if (focusval === 2) {
      this.mphoneval = focusval;
    }
    if (focusval === 1) {
      if (this.mphone === null || this.mphone === undefined || this.mphone === '') {
        this.mphoneval = focusval;
      } else {
        this.mphoneval = 2;
      }
    }
  }

  setSacszval(focusval: number) {
    if (focusval === 2) {
      this.sacszval = focusval;
    }
    if (focusval === 1) {
      if (this.sacsz === null || this.sacsz === undefined || this.sacsz === '') {
        this.sacszval = focusval;
      } else {
        this.sacszval = 2;
      }
    }
  }

  setRangeval(focusval: number) {
    if (focusval === 2) {
      this.rangeval = focusval;
    }
    if (focusval === 1) {
      if (this.selectedRange === null || this.selectedRange === undefined) {
        this.rangeval = focusval;
      } else {
        this.rangeval = 2;
      }
    }
  }

  selRange() {
    if (this.selectedRange === null || this.selectedRange === undefined) {
      this.drugval = 1;
    } else {
      this.drugval = 2;
    }
  }

  setEaddressval(focusval: number) {
    if (focusval === 2) {
      this.eaddressval = focusval;
    }
    if (focusval === 1) {
      if (this.eaddress === null || this.eaddress === undefined) {
        this.eaddressval = focusval;
      } else {
        this.eaddressval = 2;
      }
    }
  }

  setMaddressval(focusval: number) {
    if (focusval === 2) {
      this.maddressval = focusval;
    }
    if (focusval === 1) {
      if (this.maddress === null || this.maddress === undefined) {
        this.maddressval = focusval;
      } else {
        this.maddressval = 2;
      }
    }
  }

  disabledDate = (current: Date): boolean => {
    return differenceInCalendarDays(current, this.today) < 0;
  }

  toggleDotdrugtest(e) {
    this.chkDotdrugtest = e.target.checked;
  }

  toggleNotdotdrugtest(e) {
    this.chkNotdotdrugtest = e.target.checked;
  }

  toggleAlcoholtest(e) {
    this.chkAlcoholtest = e.target.checked;
  }

  toggleObscollec(e) {
      this.chkObscollec = e.target.checked;
      
  }

  toggleOverallow(e) {
    this.chkOverallow = e.target.checked;
  }

  togglePrintform(e) {
    this.chkPrintform = e.target.checked;
  }

  toggleEmailform(e) {
    this.chkEmailform = e.target.checked;
  }

  toggleSmsform(e) {
    this.chkSmsform = e.target.checked;
  }
}
