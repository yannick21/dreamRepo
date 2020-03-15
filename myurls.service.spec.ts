import { TestBed } from '@angular/core/testing';

import { MyurlsService } from './myurls.service';

describe('MyurlsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyurlsService = TestBed.get(MyurlsService);
    expect(service).toBeTruthy();
  });
});
