import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WizardRoutingModule } from './wizard-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  TestTypeWizardComponent,
  ScheduleWizardComponent,
  DonorWizardComponent,
  SiteWizardComponent,
  OptionalWizardComponent
} from 'src/app/components';
import { DotDrugConfirmDirective } from '../../directives/wizard/dot-drug-confirm.directive';
import { RegulatoryModeDirective } from '../../directives/wizard/regulatory-mode.directive';
import { WizardEmailConfirmDirective } from '../../directives/wizard/wizard-email-confirm.directive';
import { WizardRevieeOrderModalDirective } from '../../directives/wizard/wizard-reviee-order-modal.directive';
import { ObservedCollectionDirective } from '../../directives/wizard/observed-collection.directive';
import { ModalReviewOrderComponent } from '../../components/wizard/modal-review-order/modal-review-order.component';
import { ModalEmailConfirmComponent } from '../../components/wizard/modal-email-confirm/modal-email-confirm.component';
import { ModalMobileConfirmComponent } from '../../components/wizard/modal-mobile-confirm/modal-mobile-confirm.component';
import { WizardMobileConfirmDirective } from '../../directives/wizard/wizard-mobile-confirm.directive';
import { ModalDotDrugConfirmComponent } from '../../components/wizard/modal-dot-drug-confirm/modal-dot-drug-confirm.component';
import { AlcoholCheckboxDirective } from '../../directives/wizard/alcohol-checkbox.directive';
import { WizardPrintformCheckboxDirective } from '../../directives/wizard/wizard-printform-checkbox.directive';
import {ModalOrderSubmittedComponent} from '../../components/wizard/modal-order-submitted/modal-order-submitted.component';
import {MatSliderModule} from '@angular/material/slider';
import { Ng5SliderModule, Options } from 'ng5-slider';
import { AgmCoreModule } from '@agm/core';
import { AutocompleteModule } from 'ng2-input-autocomplete';
import { MatAutocompleteModule, MatInputModule } from '@angular/material';
import {PhoneMaskDirective} from '../../directives/wizard/phone-mask.directive';

@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      WizardRoutingModule,
      MatSliderModule,
      Ng5SliderModule,
      ReactiveFormsModule,
      AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCnSw_tHTDXP0avJ8NX7MUdjUeLl1k-fTI'}),
    AutocompleteModule.forRoot(),
    MatAutocompleteModule,
    MatInputModule
  ],
  declarations: [
    TestTypeWizardComponent,
    ScheduleWizardComponent,
    DonorWizardComponent,
    SiteWizardComponent,
    OptionalWizardComponent,
      DotDrugConfirmDirective,
      RegulatoryModeDirective,
    WizardEmailConfirmDirective,
    WizardRevieeOrderModalDirective,
    ObservedCollectionDirective,
    ModalReviewOrderComponent,
    ModalOrderSubmittedComponent,
    ModalEmailConfirmComponent,
    ModalMobileConfirmComponent,
    WizardMobileConfirmDirective,
    ModalDotDrugConfirmComponent,
    AlcoholCheckboxDirective,
    WizardPrintformCheckboxDirective,
    PhoneMaskDirective,
  ],
  exports: [
    TestTypeWizardComponent,
    ScheduleWizardComponent,
    DonorWizardComponent,
    SiteWizardComponent,
    OptionalWizardComponent
  ],
  entryComponents: [
    ModalReviewOrderComponent,
    ModalOrderSubmittedComponent,
    ModalEmailConfirmComponent,
    ModalMobileConfirmComponent,
    ModalDotDrugConfirmComponent
  ]
})
export class WizardModule {}
