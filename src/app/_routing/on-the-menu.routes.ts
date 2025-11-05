import { Routes } from '@angular/router';

export const onTheMenuRoutes: Routes = [
  {
    path: '',
    title: 'FlavorHive - Menu',
    loadComponent: () =>
      import('../on-the-menu/on-the-menu.component').then(
        (c) => c.OnTheMenuComponent
      ),
  },
];
