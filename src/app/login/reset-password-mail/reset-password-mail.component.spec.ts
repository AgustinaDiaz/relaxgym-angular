import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetPasswordMailComponent } from './reset-password-mail.component';

describe('ResetPasswordMailComponent', () => {
  let component: ResetPasswordMailComponent;
  let fixture: ComponentFixture<ResetPasswordMailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetPasswordMailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetPasswordMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
