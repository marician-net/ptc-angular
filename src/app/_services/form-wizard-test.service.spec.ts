import { TestBed } from '@angular/core/testing';

import { FormWizardTestService } from './form-wizard-test.service';

describe('FormWizardTestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FormWizardTestService = TestBed.get(FormWizardTestService);
    expect(service).toBeTruthy();
  });
});
