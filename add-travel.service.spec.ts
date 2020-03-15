import { TestBed } from '@angular/core/testing';

import { AddTravelService } from './add-travel.service';

describe('AddTravelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddTravelService = TestBed.get(AddTravelService);
    expect(service).toBeTruthy();
  });
});
