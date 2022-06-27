import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  DropdownModule,
  GridModule,
  HeaderModule,
  NavModule, SidebarModule
} from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from '../../icons/icon-subset';
import { AppHeaderComponent } from './app-header.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('DefaultHeaderComponent', () => {
  let component: AppHeaderComponent;
  let fixture: ComponentFixture<AppHeaderComponent>;
  let iconSetService: IconSetService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppHeaderComponent],
      imports: [GridModule, HeaderModule, NavModule, BadgeModule, AvatarModule, DropdownModule, BreadcrumbModule, RouterTestingModule, SidebarModule],
      providers: [IconSetService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    iconSetService = TestBed.inject(IconSetService);
    iconSetService.icons = { ...iconSubset };

    fixture = TestBed.createComponent(AppHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
