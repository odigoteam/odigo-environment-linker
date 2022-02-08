import { TestBed } from '@angular/core/testing';

import { EnvironmentsService } from './environments.service';

describe('EnvironmentsService', () => {
  let service: EnvironmentsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnvironmentsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
