import { Component, NgZone, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormWizardTestService } from 'src/app/_services';
import { ModalOrderSubmittedComponent } from '../modal-order-submitted/modal-order-submitted.component';
import { Subject } from 'rxjs';
import { NzMessageService, NzNotificationService } from 'ng-zorro-antd';
import { DataService } from '../../../_services/data.service';

@Component({
    selector: 'app-modal-review-order',
    templateUrl: './modal-review-order.component.html',
    styleUrls: ['./modal-review-order.component.scss']
})
export class ModalReviewOrderComponent implements OnInit {
    constructor(public bsModalRef: BsModalRef, public formWizardTestService: FormWizardTestService,
        private modalService: BsModalService, private notification: NzNotificationService,
        private dataService: DataService, private _ngZone: NgZone, private message: NzMessageService) { }
    modalRef: BsModalRef;
    public onClose: Subject<boolean>;
    loading = false;
    postData = {
        Id: null,
        Donor: {
            ID: null,
            'Full Name': null,
            'Last Name': null,
            'First Name': '',
            'Middle Name': '',
            EveningPhone: '',
            DaytimePhone: '',
            DOB: null,
            MobilePhone: null
        },
        Schedule: {
            TimeZone: null,
            OrderExpirationDate: null,
            OverrideAllowed: null,
            PreferredScheduledDate: null
        },
        Status: 0,
        TestType: null,
        TestTypeAlcohol: null,
        ProcessType: null,
        ProcessTypeAlcohol: null,
        RegulatoryMode: null,
        Reason: null,
        ObservedCollection: null,
        SelectedSite: {},
        Notifications: {}
    };
    ngOnInit() {
        this.onClose = new Subject();
        if (this.formWizardTestService.form && this.formWizardTestService.form.value) {
            const data = this.formWizardTestService.form.value;
            this.postData = { ...this.postData, ...data }; // this is the answer
        }
    }

    getData() {
        return `Send this order for ${this.getDonorName()} to ${this.getFacilityName()} ${this.getFacilityCity()}, ${this.getFacilityState()}?`;
    }

    getDonorName() {
        return this.postData.Donor['FullName'];
    }

    getFacilityName() {
        if (this.postData.SelectedSite && this.postData.SelectedSite['COLLECTION_SITE']) {
            return this.postData.SelectedSite['COLLECTION_SITE'];
        }
        return '';
    }

    getFacilityCity() {
        if (this.postData.SelectedSite && this.postData.SelectedSite['CITY']) {
            return this.postData.SelectedSite['CITY'];
        }
        return '';
    }

    getFacilityState() {
        if (this.postData.SelectedSite && this.postData.SelectedSite['ST']) {
            return this.postData.SelectedSite['ST'];
        }
        return '';
    }

    submit() {
        this.sendData();
    }

    cancel() {
        this.bsModalRef.hide();
        this.onClose.next(false);
    }

    sendData(): void {
        if (this.postData) {
            if (this.postData['Notifications']['Email'] != undefined &&
                this.postData['Notifications']['Email'] !== null &&
                this.postData['Notifications']['Email'] !== '' &&
                !this.postData['Notifications']['Email'].includes('@')) {
                this.formWizardTestService.form.get('Email').setValue(null);
                this.postData.Notifications['EMAIL'] = '';
                this.notification.create('error', 'Invalid Email', 'Please input correct email!', {
                    nzDuration: 2000,
                    nzAnimate: true
                });
                return;
            }
            this.loading = true;
            this.dataService.postOrder(this.postData).subscribe((res: any) => {
                this.loading = false;
                if (res) {
                    this._ngZone.run(() => {
                        // this.router.navigate(['/wizard']);
                        this.message.create('success', 'Data posted successfully!!!');
                    });

                    this.bsModalRef.hide();
                    this.onClose.next(true);
                    this.modalRef = this.modalService.show(ModalOrderSubmittedComponent, {
                        class: 'modal-dialog-centered rounded',
                        animated: false
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
}
