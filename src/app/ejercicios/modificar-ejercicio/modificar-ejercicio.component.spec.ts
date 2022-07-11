import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarEjercicioComponent } from './modificar-ejercicio.component';

describe('ModificarEjercicioComponent', () => {
  let component: ModificarEjercicioComponent;
  let fixture: ComponentFixture<ModificarEjercicioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModificarEjercicioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarEjercicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
