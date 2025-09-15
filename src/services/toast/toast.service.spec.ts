import { TestBed } from '@angular/core/testing';
import { ToastService } from './toast.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

describe('ToastService', () => {
  let service: ToastService;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      imports: [MatSnackBarModule],
      providers: [{ provide: MatSnackBar, useValue: spy }],
    });

    service = TestBed.inject(ToastService);
    snackBarSpy = TestBed.inject(MatSnackBar) as jasmine.SpyObj<MatSnackBar>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call snackBar.open with success type by default', () => {
    service.show('Success message');
    expect(snackBarSpy.open).toHaveBeenCalledWith('Success message', 'OK', {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'left',
      panelClass: 'success-snackbar',
    });
  });

  it('should call snackBar.open with error type', () => {
    service.show('Error message', 'error', 'Dismiss', 5000);
    expect(snackBarSpy.open).toHaveBeenCalledWith('Error message', 'Dismiss', {
      duration: 5000,
      verticalPosition: 'bottom',
      horizontalPosition: 'left',
      panelClass: 'error-snackbar',
    });
  });
});
