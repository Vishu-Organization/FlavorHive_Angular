import { Routes } from '@angular/router';

export const onTheMenuRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../on-the-menu/on-the-menu/on-the-menu.component').then(
        (c) => c.OnTheMenuComponent
      ),
  },
];
