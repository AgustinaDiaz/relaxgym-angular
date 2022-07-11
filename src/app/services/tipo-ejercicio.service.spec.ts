import { TestBed } from '@angular/core/testing';

import { TipoEjercicioService } from './tipo-ejercicio.service';

describe('TipoEjercicioService', () => {
  let service: TipoEjercicioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoEjercicioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
