import { TestBed } from '@angular/core/testing';

import { EjercicioResolver } from './ejercicio.resolver';

describe('EjercicioResolver', () => {
  let resolver: EjercicioResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(EjercicioResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
