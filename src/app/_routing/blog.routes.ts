import { Routes } from '@angular/router';

export const BLOG_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../blog/blog/blog.component').then((c) => c.BlogComponent),
  },
];
