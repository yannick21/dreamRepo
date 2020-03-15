import { TestBed } from '@angular/core/testing';

import { ParamsTransfertService } from './params-transfert.service';

describe('ParamsTransfertService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ParamsTransfertService = TestBed.get(ParamsTransfertService);
    expect(service).toBeTruthy();
  });
});
