import { TestBed } from '@angular/core/testing';

import { TurnoResolver } from './turno.resolver';

describe('TurnoResolver', () => {
  let resolver: TurnoResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(TurnoResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
