import { TestBed } from '@angular/core/testing';

import { AllTravelsService } from './all-travels.service';

describe('AllTravelsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AllTravelsService = TestBed.get(AllTravelsService);
    expect(service).toBeTruthy();
  });
});
