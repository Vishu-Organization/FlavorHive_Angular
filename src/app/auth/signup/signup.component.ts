import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ToastService } from 'src/services/toast/toast.service';
import { ISignupDataItem } from 'src/store/auth/_interfaces';
import { signup } from 'src/store/auth/actions';
import { SignupDataState } from 'src/store/auth/reducer';
import {
  selectAuthLoading,
  selectSignupDataLoading,
  selectSignupHowItWorks,
} from 'src/store/auth/selectors';

interface SignupForm {
  name: FormControl<string | null>;
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  signupForm!: FormGroup<SignupForm>;
  isContinue = false;
  howItWorksData$: Observable<ISignupDataItem[] | undefined>;
  howItWorksLoading$: Observable<boolean>;
  isAuthLoading$: Observable<boolean>;

  constructor(
    private store: Store<SignupDataState>,
    private toastService: ToastService
  ) {
    this.buildForm();
    this.howItWorksData$ = this.store.select(selectSignupHowItWorks);
    this.howItWorksLoading$ = this.store.select(selectSignupDataLoading);
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
      this.store.dispatch(signup({ email, name, password }));
  }
}
