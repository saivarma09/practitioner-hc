import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SiteSelectionPage } from './site-selection.page';

describe('SiteSelectionPage', () => {
  let component: SiteSelectionPage;
  let fixture: ComponentFixture<SiteSelectionPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteSelectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
