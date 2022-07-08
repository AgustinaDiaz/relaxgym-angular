import { TestBed } from '@angular/core/testing';

import { InicioResolver } from './inicio.resolver';

describe('InicioResolver', () => {
  let resolver: InicioResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(InicioResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
