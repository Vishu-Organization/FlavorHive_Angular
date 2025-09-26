import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { of } from 'rxjs';
import { PageService } from 'src/services/page/page.service';
import { VisionRouteData } from 'src/store/page/_types';

export const pageResolver: ResolveFn<VisionRouteData | null> = (_, { url }) => {

  const pageService = inject(PageService);

  const urlSegment = url.split('/').pop();

  switch (urlSegment) {
    case 'vision':
      return pageService.getVisionPageData();
    default:
      return of(null)
  }
};
