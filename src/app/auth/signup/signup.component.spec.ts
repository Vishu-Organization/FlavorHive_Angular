import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupComponent } from './signup.component';
import { Store } from '@ngrx/store';
import { ActivatedRoute } from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { ToastService } from 'src/services/toast/toast.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthActions } from 'src/store/auth/actions';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let mockStore: jasmine.SpyObj<Store<any>>;
  let mockToast: jasmine.SpyObj<ToastService>;
  let mockDialog: jasmine.SpyObj<MatDialog>;

  beforeEach(async () => {
    mockStore = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    mockStore.select.and.returnValue(of(null));
    mockToast = jasmine.createSpyObj('ToastService', ['show']);
    mockDialog = {
      open: jasmine.createSpy('open').and.returnValue({
        afterClosed: () => of(true), // always return observable
      }),
    } as any;

    await TestBed.configureTestingModule({
      imports: [SignupComponent, NoopAnimationsModule],
      providers: [
        { provide: Store, useValue: mockStore },
        { provide: ToastService, useValue: mockToast },
        { provide: MatDialog, useValue: mockDialog },
        { provide: ActivatedRoute, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Component Creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should build form with required controls', () => {
      expect(component.signupForm.contains('name')).toBeTrue();
      expect(component.signupForm.contains('email')).toBeTrue();
      expect(component.signupForm.contains('password')).toBeTrue();
    });
  });

  describe('onSignup', () => {
    it('should show toast if name and email are missing', () => {
      component.signupForm.setValue({ name: '', email: '', password: '' });

      component.onSignup();

      expect(mockToast.show).toHaveBeenCalledWith(
        'Please fill name and email to continue'
      );
      expect(mockStore.dispatch).not.toHaveBeenCalled();
    });

    it('should set isContinue true if name and email provided but not continue yet', () => {
      component.signupForm.setValue({
        name: 'John',
        email: 'john@example.com',
        password: '',
      });

      component.onSignup();

      expect(component.isContinue).toBeTrue();
      expect(mockStore.dispatch).not.toHaveBeenCalled();
    });

    it('should dispatch signup action if all fields are valid and continue is true', () => {
      component.isContinue = true;
      component.signupForm.setValue({
        name: 'John',
        email: 'john@example.com',
        password: 'secret123',
      });

      component.onSignup();

      expect(mockStore.dispatch).toHaveBeenCalledWith(
        AuthActions.signup({
          name: 'John',
          email: 'john@example.com',
          password: 'secret123',
        })
      );
      expect(component.isFormSubmitted).toBeTrue();
    });
  });

  describe('canDeactivate', () => {
    it('should return true when form pristine', () => {
      component.signupForm.markAsPristine();
      const result = component.canDeactivate();
      expect(result).toBeTrue();
    });

    it('should return true when form is submitted', () => {
      component.isFormSubmitted = true;
      const result = component.canDeactivate();
      expect(result).toBeTrue();
    });

    it('should open dialog and return observable result when form dirty', (done) => {
      component.signupForm.markAsDirty();
      component.isFormSubmitted = false;

      const result$ = component.canDeactivate() as any;

      result$.subscribe((val: boolean) => {
        expect(val).toBeTrue();
        expect(mockDialog.open).toHaveBeenCalled();
        done();
      });
    });
  });
});
