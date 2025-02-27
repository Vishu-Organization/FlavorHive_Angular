import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthState } from 'src/store/auth/_interfaces';
import { AuthActions } from 'src/store/auth/actions';
import { selectAuthLoading } from 'src/store/auth/selectors';

interface LoginForm {
  email: FormControl<string>;
  password: FormControl<string>;
  rememberMe: FormControl<boolean>;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
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
