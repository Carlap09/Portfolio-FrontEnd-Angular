import { TestBed } from '@angular/core/testing';

import { AptitudesService } from './aptitudes.service';

describe('AptitudesService', () => {
  let service: AptitudesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AptitudesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
