import { TestBed } from '@angular/core/testing';

import { MajCompteService } from './maj-compte.service';

describe('MajCompteService', () => {
  let service: MajCompteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MajCompteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
