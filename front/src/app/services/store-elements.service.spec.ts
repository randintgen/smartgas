import { TestBed } from '@angular/core/testing';

import { StoreElementsService } from './store-elements.service';

describe('StoreElementsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StoreElementsService = TestBed.get(StoreElementsService);
    expect(service).toBeTruthy();
  });
});
