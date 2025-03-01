import { Routes } from '@angular/router';
import { loginResolver } from 'src/resolvers/login/login.resolver';


export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'sign-up',
    loadComponent: () =>
      import('./signup/signup.component').then((m) => m.SignupComponent),
    resolve: { data: loginResolver },
  },
];
