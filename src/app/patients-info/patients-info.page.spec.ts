import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientsInfoPage } from './patients-info.page';

describe('PatientsInfoPage', () => {
  let component: PatientsInfoPage;
  let fixture: ComponentFixture<PatientsInfoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientsInfoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
