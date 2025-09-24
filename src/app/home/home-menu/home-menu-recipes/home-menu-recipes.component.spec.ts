import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeMenuRecipesComponent } from './home-menu-recipes.component';
import { Store } from '@ngrx/store';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { HomeService } from 'src/services/home/home.service';
import { RecipeImages, ImageContent } from 'src/store/home/_interfaces';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('HomeMenuRecipesComponent', () => {
  let component: HomeMenuRecipesComponent;
  let fixture: ComponentFixture<HomeMenuRecipesComponent>;
  let mockStore: jasmine.SpyObj<Store<any>>;
  let mockHomeService: jasmine.SpyObj<HomeService>;

  beforeEach(async () => {
    mockStore = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    mockHomeService = jasmine.createSpyObj('HomeService', [], {
      homeReciepesData$: of(null),
      homeReciepesLoading$: of(false),
      homeReciepesError$: of(null),
    });

    await TestBed.configureTestingModule({
    imports: [HomeMenuRecipesComponent],
    providers: [
        { provide: Store, useValue: mockStore },
        { provide: HomeService, useValue: mockHomeService },
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
    ]
}).compileComponents();

    fixture = TestBed.createComponent(HomeMenuRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Component Creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should expose observables from HomeService', () => {
      expect(component.homeMenuRecipes$).toBeDefined();
      expect(component.homeMenuRecipesLoading$).toBeDefined();
      expect(component.homeMenuRecipesError$).toBeDefined();
    });
  });

  describe('generateSrcSet', () => {
    it('should return empty string when no images provided', () => {
      expect(component.generateSrcSet(undefined)).toBe('');
    });

    it('should generate correct srcset with SMALL, REGULAR, and LARGE', () => {
      const images: RecipeImages = {
        SMALL: { url: 'small.jpg' } as ImageContent,
        REGULAR: { url: 'regular.jpg' } as ImageContent,
        LARGE: { url: 'large.jpg' } as ImageContent,
        THUMBNAIL: { url: 'thumbnail.jpg' } as ImageContent,
      };

      const result = component.generateSrcSet(images);
      expect(result).toBe('small.jpg 640w, regular.jpg 1024w, large.jpg 1280w');
    });

    it('should fallback to REGULAR if LARGE is missing', () => {
      const images: RecipeImages = {
        SMALL: { url: 'small.jpg' } as ImageContent,
        REGULAR: { url: 'regular.jpg' } as ImageContent,
        LARGE: undefined,
        THUMBNAIL: { url: 'thumbnail.jpg' } as ImageContent,
      };

      const result = component.generateSrcSet(images);
      expect(result).toBe(
        'small.jpg 640w, regular.jpg 1024w, regular.jpg 1280w'
      );
    });
  });

  describe('trackByKey', () => {
    it('should return the key of the item', () => {
      const item = { key: '123' };
      expect(component.trackByKey(0, item)).toBe('123');
    });
  });

  describe('generateQueryParam', () => {
    it('should generate query params correctly', () => {
      const result = component.generateQueryParam('category', 'dessert');
      expect(result).toEqual({ category: 'dessert' });
    });
  });
});
