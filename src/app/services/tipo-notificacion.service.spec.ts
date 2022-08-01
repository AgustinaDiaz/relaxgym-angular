import { TestBed } from '@angular/core/testing';

import { TipoNotificacionService } from './tipo-notificacion.service';

describe('TipoNotificacionService', () => {
  let service: TipoNotificacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoNotificacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
