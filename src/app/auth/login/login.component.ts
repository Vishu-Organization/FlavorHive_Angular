import { AsyncPipe, NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Store } from '@ngrx/store';
import { WhatsCookingComponent } from 'src/app/shared/components/whats-cooking/whats-cooking.component';
import { AuthState } from 'src/store/auth/_interfaces';
import { AuthActions } from 'src/store/auth/actions';
import { selectAuthLoading } from 'src/store/auth/selectors';
import { MatCheckboxModule } from '@angular/material/checkbox';

interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
  rememberMe: FormControl<boolean>;
}

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [
    WhatsCookingComponent,
    MatFormFieldModule,
    ReactiveFormsModule,
    NgClass,
    NgIf,
    MatProgressSpinnerModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    AsyncPipe,
  ],
})
export class LoginComponent {
  loginForm: FormGroup<LoginForm>;
  isAuthLoading$ = this.store.select(selectAuthLoading);
  data: any;

  constructor(private store: Store<AuthState>) {
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        nonNullable: true,
        validators: [Validators.email, Validators.required],
      }),
      password: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required, Validators.minLength(6)],
      }),
      rememberMe: new FormControl(false, { nonNullable: true }),
    });
  }

  onSubmit() {
    const { email, password } = this.loginForm.value;
    email &&
      password &&
      this.store.dispatch(AuthActions.login({ email, password }));
  }

  onLoginWithGoogle() {}
}
