import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ToastService } from 'src/services/toast/toast.service';
import { ISignupDataItem } from 'src/store/auth/_interfaces';
import { SignupDataState } from 'src/store/auth/reducer';
import {
  selectSignupData,
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

  constructor(
    private store: Store<SignupDataState>,
    private toastService: ToastService
  ) {
    this.buildForm();
    this.howItWorksData$ = this.store.select(selectSignupHowItWorks);
    this.howItWorksLoading$ = this.store.select(selectSignupDataLoading);
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

    console.log(this.signupForm.value);
  }
}
