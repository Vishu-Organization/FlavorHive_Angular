import {  Routes } from '@angular/router';
import { AuthGuard } from '../_guards/auth/auth.guard';

export const APP_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./home.routes').then((r) => r.HOME_ROUTES),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth.routes').then((r) => r.AUTH_ROUTES),
  },
  {
    path: 'blog',
    loadChildren: () => import('./blog.routes').then((r) => r.BLOG_ROUTES),
    canActivate: [AuthGuard],
  },
  {
    path: 'pages',
    loadChildren: () => import('./page.routes').then((r) => r.PAGE_ROUTES),
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
