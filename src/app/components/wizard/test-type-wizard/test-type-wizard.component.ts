import { Component, OnInit, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { FormWizardTestService } from 'src/app/_services';
import { DataService } from '../../../_services/data.service';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'app-test-type-wizard',
    templateUrl: './test-type-wizard.component.html',
    styleUrls: ['./test-type-wizard.component.scss']
})
export class TestTypeWizardComponent implements OnInit {
    RegulatoryMode: String;
    Reason: String;
    // NDOT test types:
    ProcessType: String = "";
    ProcessTypeAlcohol: String = "";
    ObservedCollection: String;
    @Output() controls = new EventEmitter<number>();
    CompanyName: String;
    LocationCode: String;
    DriverLicenseNumber: String = "";
    DriverLicenseState: String = "";

    Reasondata: Array<string> = [
        'Pre-Employment',
        'Random',
        'Reasonable Suspicion/Cause',
        'Return to Duty',
        'Post Accident',
        'Follow-Up',
        'Other'
    ];
    TestTypedata = [];
    RegTypedata = [];
    LocationCodedata = [];
    loading = false;
    orderId: any;
    order: any;

   
    constructor(public formWizardTestService: FormWizardTestService, private dataService: DataService, private _route: ActivatedRoute) {
        if (this._route.snapshot.params.id != undefined && this._route.snapshot.params.id != "new")
            this.orderId = this._route.snapshot.params.id;
        console.log("Order ID: " + this.orderId);
    }

   

    ngOnInit() {
        this.RegulatoryMode = this.formWizardTestService.form.get('RegulatoryMode').value;        
        this.ProcessType = this.formWizardTestService.form.get('ProcessType').value;
        this.ProcessTypeAlcohol = this.formWizardTestService.form.get('ProcessTypeAlcohol').value;
        this.Reason = this.formWizardTestService.form.get('ReasonForTestName').value;
        this.LocationCode = this.formWizardTestService.form.get('LocationName').value;       
        this.ObservedCollection = this.formWizardTestService.form.get('ObservedCollection').value;
        this.DriverLicenseNumber = this.formWizardTestService.form.get('DriverLicenseNumber').value;
        this.DriverLicenseState = this.formWizardTestService.form.get('DriverLicenseState').value;

        this.loading = true;
        this.dataService.getTestTypesdata().subscribe((res: any) => {
            this.TestTypedata = res.Data;
            console.log(this.TestTypedata);
        });
        this.dataService.getRegTypes().subscribe((res: any) => {
            this.RegTypedata = res.Data;
            console.log(this.RegTypedata);
            if (this.RegulatoryMode == undefined || this.RegulatoryMode == "")
                this.RegulatoryMode = this.RegTypedata[0];
        });
        this.dataService.getCompName().subscribe((res: any) => {
            this.CompanyName = res.Data;
            console.log(this.CompanyName);
        });
        this.dataService.getLocationCodes().subscribe((res: any) => {
            this.LocationCodedata = res.Data;
            this.loading = false;
            console.log(this.LocationCodedata);
            if (this.LocationCode == undefined || this.LocationCode == "")
                this.LocationCode = this.LocationCodedata[0];
        })

        //if (this.orderId != undefined) {
        //    // display the existing Order
        //    this.loading = true;
        //    this.dataService.getAnOrder(this.orderId).subscribe((res: any) => {
        //        this.order = res.Data;
        //        console.log("TestType=" + this.order.TestType);
        //        this.LocationCode = this.order.LocationName;  
        //        this.formWizardTestService.form.get('LocationName').patchValue(this.LocationCode);
        //        this.formWizardTestService.form.get('TestType').patchValue(this.order.TestType);
               
        //        switch (this.order.TestType) {
        //            case 1:
        //        //        rbDOTDrug.Checked = true;
        //        //        pnlRegulatoryMode.Visible = true;
        //        //        if (cmbRegulatoryMode.Items.Cast<RadComboBoxItem>().Any(cbi => cbi.Value == ord.TestingAuthority))
        //        //            cmbRegulatoryMode.SelectedValue = ord.TestingAuthority;
        //        //        if (cmbRegulatoryMode.SelectedValue == "FMCSA") {
        //        //            txtDriverLicenseNumber.Text = ord.DriverLicClass;
        //        //            ddlDriverLicenseState.SelectedValue = ord.DriverLicStateofIssue;
        //        //            pnlDriverLicense.Visible = true;
        //        //        }
        //        //        lblDrugBranch.Text = ord.LaboratoryAccount;
        //                break;
        //        //    case 0:
        //        //        rbNonDOTDrug.Checked = true;
        //        //        pnlTestType.Visible = true;
        //        //        lblDrugBranch.Text = ord.LaboratoryAccount;
        //        //        if (!String.IsNullOrWhiteSpace(ord.ProcessType)) {
        //        //            // lookup code that goes with NDOT Type                                    
        //        //            cmbTestType.SelectedValue = orderRep.getNDOTBranch(ord.ProcessType);
        //        //        }
        //        //        break;
        //        //    case 2:
        //        //        rbDOTAlcohol.Checked = true;
        //        //        lblAlcoholBranch.Text = ord.LaboratoryAccount;
        //        //        break;
        //        //    case 3:
        //        //        rbNonDOTAlcohol.Checked = true;
        //        //        pnlTestTypeAlcohol.Visible = true;
        //        //        lblAlcoholBranch.Text = ord.LaboratoryAccount;
        //        //        if (!String.IsNullOrWhiteSpace(ord.ProcessType)) {
        //        //            cmbTestTypeAlcohol.SelectedValue = orderRep.getNDOTBranch(ord.ProcessType);
        //        //        }
        //        //        break;
        //        }


        //        this.loading = false;
        //    })
        //}
    }

    nextSection() {

        this.formWizardTestService.form.get('RegulatoryMode').patchValue(this.RegulatoryMode);
        this.formWizardTestService.form.get('ProcessType').patchValue(this.ProcessType);
        this.formWizardTestService.form.get('ProcessTypeAlcohol').patchValue(this.ProcessTypeAlcohol);
        this.formWizardTestService.form.get('ReasonForTestName').patchValue(this.Reason);
        this.formWizardTestService.form.get('LocationName').patchValue(this.LocationCode);
        this.formWizardTestService.form.get('DriverLicenseNumber').patchValue(this.DriverLicenseNumber);
        this.formWizardTestService.form.get('DriverLicenseState').patchValue(this.DriverLicenseState);

        // make sure they picked at least one test
        if (
            (this.formWizardTestService.form.get('TestType').value == undefined || this.formWizardTestService.form.get('TestType').value === "") &&
            (this.formWizardTestService.form.get('TestTypeAlcohol').value == undefined || this.formWizardTestService.form.get('TestTypeAlcohol').value === "")
        )
        {
            alert("Please select a Drug and/or Alcohol Test");
            return;
        }
        if (this.formWizardTestService.form.get('TestType').value === 0 && this.formWizardTestService.form.get('ProcessType').value === "") {
            alert("Please select a Drug Test Type");
            return;
        }
        if (this.formWizardTestService.form.get('TestTypeAlcohol').value == 3 && this.formWizardTestService.form.get('ProcessTypeAlcohol').value === "") {
            alert("Please select an Alcohol Test Type");
            return;
        }
        if (this.Reason == undefined || this.Reason === "") {
            alert("Please select a Reason");
            return;
        }
        if (this.formWizardTestService.form.get('TestType').value == 1 && this.RegulatoryMode == "FMCSA" &&
            (this.DriverLicenseNumber == "" || this.DriverLicenseState == "")) {
            alert("Please enter a Driver License Number and State");
            return;
        }

        // continue       
        this.controls.emit();
    }
    
}
