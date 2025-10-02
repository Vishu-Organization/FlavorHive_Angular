import { Routes } from "@angular/router";
import { pageResolver } from "src/resolvers/page/page.resolver";

export const PAGE_ROUTES: Routes = [
  {
    path: '',
    loadComponent:()=> import('../page/page.component').then(c => c.PageComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'vision',
      },
      {
        path: 'vision',
        loadComponent: () =>
          import('../page/our-vision/our-vision.component').then(
            (c) => c.OurVisionComponent
          ),
        resolve: {vision: pageResolver}
      },
    ],
  },
];