import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmDialogComponent } from './confirm-dialog.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

describe('ConfirmDialogComponent', () => {
  let component: ConfirmDialogComponent;
  let fixture: ComponentFixture<ConfirmDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<ConfirmDialogComponent>>;

  beforeEach(() => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    TestBed.configureTestingModule({
      imports: [ConfirmDialogComponent],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { message: 'Test', btnText: 'OK' },
        },
      ],
    });

    fixture = TestBed.createComponent(ConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Component Creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should receive data from MAT_DIALOG_DATA', () => {
      expect(component.data.message).toBe('Test');
      expect(component.data.btnText).toBe('OK');
    });
  });

  describe('onConfirm', () => {
    it('should close the dialog with true', () => {
      component.onConfirm();
      expect(dialogRefSpy.close).toHaveBeenCalledWith(true);
    });
  });

  describe('onCancel', () => {
    it('should close the dialog with false', () => {
      component.onCancel();
      expect(dialogRefSpy.close).toHaveBeenCalledWith(false);
    });
  });
});
