import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { ToastService } from 'src/services/toast/toast.service';
import { ISignupDataItem, SignupDataState } from 'src/store/auth/_interfaces';
import { AuthActions } from 'src/store/auth/actions';
import {
  selectAuthLoading,
  selectSignupHowItWorksLoading,
  selectSignupHowItWorksData,
} from 'src/store/auth/selectors';
import { AdditionalInfoComponent } from './additional-info/additional-info.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HowItWorksComponent } from './how-it-works/how-it-works.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CanComponentDeactivate } from 'src/app/_guards/can-signup-deactivate.guard';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { RouterModule } from '@angular/router';

interface SignupForm {
  name: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  standalone: true,
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  imports: [
    NgIf,
    NgClass,
    AsyncPipe,
    MatFormFieldModule,
    AdditionalInfoComponent,
    MatProgressSpinnerModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    HowItWorksComponent,
    RouterModule,
  ],
})
export class SignupComponent implements CanComponentDeactivate {
  signupForm!: FormGroup<SignupForm>;
  isContinue = false;
  howItWorksData$: Observable<ISignupDataItem[] | null>;
  howItWorksLoading$: Observable<boolean>;
  isAuthLoading$: Observable<boolean>;
  isFormSubmitted = false;

  constructor(
    private store: Store<SignupDataState>,
    private toastService: ToastService,
    private dialog: MatDialog
  ) {
    this.buildForm();
    this.howItWorksData$ = this.store.select(selectSignupHowItWorksData);
    this.howItWorksLoading$ = this.store.select(selectSignupHowItWorksLoading);
    this.isAuthLoading$ = this.store.select(selectAuthLoading);
  }
  canDeactivate(): boolean | Observable<boolean> {
    if (this.signupForm.pristine) {
      return true;
    } else if (this.isFormSubmitted) {
      return true;
    }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'You have unsaved changes. Do you really want to leave?',
      },
    });

    return dialogRef.afterClosed().pipe(map((result) => !!result));
  }

  buildForm() {
    this.signupForm = new FormGroup<SignupForm>({
      name: new FormControl('', [Validators.required, Validators.minLength(3)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSignup() {
    const { name, email, password } = this.signupForm.value;

    if (!name && !email) {
      this.toastService.show('Please fill name and email to continue');
      return;
    }

    if (!this.isContinue && name && email) {
      this.isContinue = true;
      return;
    }

    email &&
      name &&
      password &&
      this.store.dispatch(AuthActions.signup({ email, name, password }));
    this.isFormSubmitted = true;
  }
}
