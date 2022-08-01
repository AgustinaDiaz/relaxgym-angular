import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaNotificacionComponent } from './nueva-notificacion.component';

describe('NuevaNotificacionComponent', () => {
  let component: NuevaNotificacionComponent;
  let fixture: ComponentFixture<NuevaNotificacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevaNotificacionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaNotificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
