import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormWizardTestService} from '../../../_services';

@Component({
  selector: 'app-schedule-wizard',
  templateUrl: './schedule-wizard.component.html',
  styleUrls: ['./schedule-wizard.component.scss']
})
export class ScheduleWizardComponent implements OnInit {
  @Output() controls = new EventEmitter<number>();

  scheduleModel = {
    TimeZone: '',
    OrderExpirationDate: null,
    OrderExpirationTime: null,
    PreferredScheduleDate: null,
    PreferredScheduleTime: null,
    Comments: ''
  };
  constructor(public formWizardTestService: FormWizardTestService) {
  }

  ngOnInit() {
    const schedule = this.formWizardTestService.form.get('Schedule').value;
    if (!this.isEmpty(schedule)) {
        this.scheduleModel = schedule;
      }
      const observedCollection = this.formWizardTestService.form.get('ObservedCollection').value;
      if (observedCollection == "1")
          this.scheduleModel.Comments = "COLLECTION MUST BE DIRECTLY OBSERVED";
  }

  nextSection() {
    this.formWizardTestService.form.get('Schedule').patchValue(this.scheduleModel);
    this.controls.emit();
  }

  isEmpty(obj) {
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        return false;
      }
    }
    return true;
  }
}
