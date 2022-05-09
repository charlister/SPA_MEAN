import { TestBed } from '@angular/core/testing';

import { NouvelleRecetteService } from './nouvelle-recette.service';

describe('NouvelleRecetteService', () => {
  let service: NouvelleRecetteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NouvelleRecetteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
