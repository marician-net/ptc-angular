import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class FormWizardTestService {

    public form: FormGroup;

    constructor(private fb: FormBuilder) {
        this.resetInfo();
    }

    get testType(): Number {
        return this.form.get('TestType').value;
    }

    get testTypeAlcohol(): Number {
        return this.form.get('TestTypeAlcohol').value;
    }

    isEmpty(obj) {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                return false;
            }
        }
        return true;
    }

    resetInfo() {
        this.form = this.fb.group({
            Id: [''],
            Status: [0],
            TestType: ['', Validators.required],
            TestTypeAlcohol: ['', Validators.required],
            LocationName: ['', Validators.required],
            RegulatoryMode: ['', Validators.required],
            ReasonForTestName: ['', Validators.required],
            ProcessType: [''],
            ProcessTypeAlcohol: [''],
            ObservedCollection: ['', Validators.required],
            SMSPhone: [''],
            Email: [''],
            PrintForm: [''],
            Schedule: [{}],
            Donor: [{}],
            SelectedSite: [{}],
            Notifications: [{
                SMSPhone: '',
                Email: '',
                PrintForm: false
            }],
            DriverLicenseNumber: [''],
            DriverLicenseState: ['']
        });
    }
}
