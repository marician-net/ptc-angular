import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-optional-wizard',
  templateUrl: './optional-wizard.component.html',
  styleUrls: ['./optional-wizard.component.scss']
})
export class OptionalWizardComponent implements OnInit {
  @Output() controls = new EventEmitter<number>();
  constructor() {}

  ngOnInit() {}

  resetSection() {
    this.controls.emit();
  }

  onSubmit(e) {
    if (e) {
      this.resetSection();
    }
  }
}
