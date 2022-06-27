import { TestBed } from '@angular/core/testing';

import { EstadoUsuarioService } from './estado-usuario.service';

describe('EstadoUsuarioService', () => {
  let service: EstadoUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadoUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
