import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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
  ],
})
export class SignupComponent {
  signupForm!: FormGroup<SignupForm>;
  isContinue = false;
  howItWorksData$: Observable<ISignupDataItem[] | null>;
  howItWorksLoading$: Observable<boolean>;
  isAuthLoading$: Observable<boolean>;

  constructor(
    private store: Store<SignupDataState>,
    private toastService: ToastService
  ) {
    this.buildForm();
    this.howItWorksData$ = this.store.select(selectSignupHowItWorksData);
    this.howItWorksLoading$ = this.store.select(selectSignupHowItWorksLoading);
    this.isAuthLoading$ = this.store.select(selectAuthLoading);
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
  }
}
