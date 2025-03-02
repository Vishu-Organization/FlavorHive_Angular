import { Routes } from '@angular/router';
import { loginResolver } from 'src/resolvers/login/login.resolver';


export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('../auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'sign-up',
    loadComponent: () =>
      import('../auth/signup/signup.component').then((m) => m.SignupComponent),
    resolve: { data: loginResolver },
  },
];
