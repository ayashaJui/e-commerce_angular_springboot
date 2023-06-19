import { TestBed } from '@angular/core/testing';

import { CustomFormServiceService } from './custom-form-service.service';

describe('CustomFormServiceService', () => {
  let service: CustomFormServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomFormServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
