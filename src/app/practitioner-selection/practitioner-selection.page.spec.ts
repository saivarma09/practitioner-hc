import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PractitionerSelectionPage } from './practitioner-selection.page';

describe('PractitionerSelectionPage', () => {
  let component: PractitionerSelectionPage;
  let fixture: ComponentFixture<PractitionerSelectionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PractitionerSelectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
