import { TestBed } from '@angular/core/testing';

import { RolebaseGuard } from './rolebase.guard';

describe('RolebaseGuard', () => {
  let guard: RolebaseGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RolebaseGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
