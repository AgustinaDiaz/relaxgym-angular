import { TestBed } from '@angular/core/testing';

import { EstadoNotificacionService } from './estado-notificacion.service';

describe('EstadoNotificacionService', () => {
  let service: EstadoNotificacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstadoNotificacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
