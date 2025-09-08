import { TestBed } from '@angular/core/testing';
import { SsoAuthenticationService } from './sso-authentication';



describe('SsoAuthentication', () => {
  let service: SsoAuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SsoAuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
