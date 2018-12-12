import { TestBed } from '@angular/core/testing';

import { UserActionsService } from './user-actions.service';

describe('UserActionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserActionsService = TestBed.get(UserActionsService);
    expect(service).toBeTruthy();
  });
});
