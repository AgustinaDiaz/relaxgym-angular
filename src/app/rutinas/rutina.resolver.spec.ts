import { TestBed } from '@angular/core/testing';

import { RutinaResolver } from './rutina.resolver';

describe('RutinaResolver', () => {
  let resolver: RutinaResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(RutinaResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
