import { TestBed } from '@angular/core/testing';

import { AwsRoleSwitcherService } from './aws-role-switcher.service';

describe('AwsRoleSwitcherService', () => {
  let service: AwsRoleSwitcherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AwsRoleSwitcherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
