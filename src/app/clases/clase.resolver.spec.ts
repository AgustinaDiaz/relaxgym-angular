import { TestBed } from '@angular/core/testing';

import { ClaseResolver } from './clase.resolver';

describe('ClaseResolver', () => {
  let resolver: ClaseResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(ClaseResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
