import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppointmentInfoPage } from './appointment-info.page';

describe('AppointmentInfoPage', () => {
  let component: AppointmentInfoPage;
  let fixture: ComponentFixture<AppointmentInfoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
