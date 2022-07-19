import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarRutinaComponent } from './asignar-rutina.component';

describe('AsignarRutinaComponent', () => {
  let component: AsignarRutinaComponent;
  let fixture: ComponentFixture<AsignarRutinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignarRutinaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarRutinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
