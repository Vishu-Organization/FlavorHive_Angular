import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { Store } from '@ngrx/store';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { AuthActions } from 'src/store/auth/actions';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let storeSpy: jasmine.SpyObj<Store<any>>;

  beforeEach(async () => {
    storeSpy = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    storeSpy.select.and.returnValue(of(false)); // 👈 stub auth loading

    await TestBed.configureTestingModule({
    imports: [LoginComponent,
        NoopAnimationsModule,
        ReactiveFormsModule],
    providers: [{ provide: Store, useValue: storeSpy }, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
}).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Component creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Form validation', () => {
    it('should mark form invalid when empty', () => {
      component.loginForm.setValue({
        email: '',
        password: '',
        rememberMe: false,
      });
      expect(component.loginForm.valid).toBeFalse();
    });

    it('should mark form valid when fields are filled correctly', () => {
      component.loginForm.setValue({
        email: 'test@example.com',
        password: '123456',
        rememberMe: true,
      });
      expect(component.loginForm.valid).toBeTrue();
    });

    it('should require a minimum password length of 6 characters', () => {
      component.loginForm.setValue({
        email: 'test@example.com',
        password: '123', // too short
        rememberMe: false,
      });
      expect(component.loginForm.valid).toBeFalse();
    });
  });

  describe('onSubmit', () => {
    it('should dispatch login action when form is valid', () => {
      const email = 'test@example.com';
      const password = '123456';

      component.loginForm.setValue({ email, password, rememberMe: true });
      component.onSubmit();

      expect(storeSpy.dispatch).toHaveBeenCalledWith(
        AuthActions.login({ email, password })
      );
    });

    it('should not dispatch login action when form is invalid', () => {
      storeSpy.dispatch.calls.reset(); // 👈 reset previous calls

      component.loginForm.setValue({
        email: 'invalid-email',
        password: '', // falsy
        rememberMe: false,
      });

      component.onSubmit();
      expect(storeSpy.dispatch).not.toHaveBeenCalled();
    });
  });

  describe('Template', () => {
    it('should have a submit button disabled when form is invalid', () => {
      const button = fixture.debugElement.query(
        By.css('button[type="submit"]')
      ).nativeElement;
      expect(button.disabled).toBeTrue();
    });

    it('should enable submit button when form is valid', () => {
      component.loginForm.setValue({
        email: 'test@example.com',
        password: '123456',
        rememberMe: true,
      });
      fixture.detectChanges();

      const button = fixture.debugElement.query(
        By.css('button[type="submit"]')
      ).nativeElement;
      expect(button.disabled).toBeFalse();
    });
  });
});
