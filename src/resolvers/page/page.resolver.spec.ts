import { TestBed } from '@angular/core/testing';
import { pageResolver } from './page.resolver';
import { PageService } from 'src/services/page/page.service';
import { of, lastValueFrom, Observable } from 'rxjs';
import { VisionRouteData } from 'src/store/page/_types';
import { Injector, runInInjectionContext } from '@angular/core';

describe('pageResolver', () => {
  let mockPageService: jasmine.SpyObj<PageService>;

  beforeEach(() => {
    mockPageService = jasmine.createSpyObj('PageService', [
      'getVisionPageData',
    ]);

    TestBed.configureTestingModule({
      providers: [{ provide: PageService, useValue: mockPageService }],
    });
  });

  it('should return vision data for "/vision"', async () => {
    const mockData: VisionRouteData = {
      url: 'https://youtube.com/video',
      how_food_grown: 'Sustainable',
      quality_description: 'High quality',
    } as VisionRouteData;

    mockPageService.getVisionPageData.and.returnValue(of(mockData));

    const routeSnapshot: any = {};
    const state: any = { url: '/vision' };

    // ✅ Use runInInjectionContext
    const result$: Observable<VisionRouteData | null> = runInInjectionContext(
      TestBed.inject(Injector),
      () => pageResolver(routeSnapshot, state)
    ) as Observable<VisionRouteData | null>;
    const result = await lastValueFrom(result$);
    expect(result).toEqual(mockData);
    expect(mockPageService.getVisionPageData).toHaveBeenCalled();
  });

  it('should return vision data for "/vision/" with trailing slash', async () => {
    const mockData: VisionRouteData = {
      url: 'https://youtube.com/video',
      how_food_grown: 'Sustainable',
      quality_description: 'High quality',
    } as VisionRouteData;

    mockPageService.getVisionPageData.and.returnValue(of(mockData));

    const routeSnapshot: any = {};
    const state: any = { url: '/vision/' };

    // ✅ Use runInInjectionContext
    const result$: Observable<VisionRouteData | null> = runInInjectionContext(
      TestBed.inject(Injector),
      () => pageResolver(routeSnapshot, state)
    ) as Observable<VisionRouteData | null>;
    const result = await lastValueFrom(result$);
    expect(result).toEqual(mockData);
    expect(mockPageService.getVisionPageData).toHaveBeenCalled();
  });

  it('should return null for unknown URLs', async () => {
    const routeSnapshot: any = {};
    const state: any = { url: '/unknown' };

    // ✅ Use runInInjectionContext
    const result$: Observable<VisionRouteData | null> = runInInjectionContext(
      TestBed.inject(Injector),
      () => pageResolver(routeSnapshot, state)
    ) as Observable<VisionRouteData | null>;
    const result = await lastValueFrom(result$);

    expect(result).toBeNull();
    expect(mockPageService.getVisionPageData).not.toHaveBeenCalled();
  });
});
