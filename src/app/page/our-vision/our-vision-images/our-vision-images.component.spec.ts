import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OurVisionImagesComponent } from './our-vision-images.component';
import { RouterTestingModule } from '@angular/router/testing';
import {
  VisionPageImage,
  VisionPageImageDescription,
} from 'src/store/page/_types';
import { By } from '@angular/platform-browser';

describe('OurVisionImagesComponent', () => {
  let component: OurVisionImagesComponent;
  let fixture: ComponentFixture<OurVisionImagesComponent>;

  const mockImages: VisionPageImage[] = [
    { path: 'assets/our-vision/fish.svg', alt: 'fish' },
    { path: 'assets/our-vision/pig.svg', alt: 'pig' },
    { path: 'assets/our-vision/sprouting-plant.svg', alt: 'sprout' },
  ];

  const mockImageDescriptions: VisionPageImageDescription[] = [
    {
      description: 'Sustainable seafood',
      linkText: 'Learn More',
      linkUrl: '/learn-more',
    },
    {
      description: 'Not fed antibiotics',
      linkText: 'Learn More',
      linkUrl: '/learn-more',
    },
    {
      description: 'Responsibly sourced',
      linkText: 'Learn More',
      linkUrl: '/learn-more',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurVisionImagesComponent, RouterTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(OurVisionImagesComponent);
    component = fixture.componentInstance;

    component.images = mockImages;
    component.imageDescriptions = mockImageDescriptions;

    fixture.detectChanges();
  });

  describe('Component Initialization', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should have images and descriptions inputs defined', () => {
      expect(component.images).toEqual(mockImages);
      expect(component.imageDescriptions).toEqual(mockImageDescriptions);
    });
  });

  describe('Images Rendering', () => {
    it('should render all descriptions text', () => {
      const descriptionEls = fixture.debugElement.queryAll(
        By.css('section article p')
      );
      expect(descriptionEls.length).toBe(mockImageDescriptions.length);

      mockImageDescriptions.forEach((desc, index) => {
        const el = descriptionEls[index].nativeElement;
        expect(el.textContent).toContain(desc.description);
      });
    });
  });

  describe('Descriptions and Links Rendering', () => {
    it('should render all descriptions text', () => {
      const descriptionEls = fixture.debugElement.queryAll(
        By.css('section article p')
      );
      expect(descriptionEls.length).toBe(mockImageDescriptions.length);

      mockImageDescriptions.forEach((desc, index) => {
        const el = descriptionEls[index].nativeElement;
        expect(el.textContent).toContain(desc.description);
      });
    });

    it('should render links correctly only when linkText exists', () => {
      const linkEls = fixture.debugElement.queryAll(
        By.css('section article a')
      );
      const expectedLinks = mockImageDescriptions.filter((d) => d.linkText);

      expect(linkEls.length).toBe(expectedLinks.length);

      linkEls.forEach((linkEl, index) => {
        const desc = expectedLinks[index];
        expect(linkEl.nativeElement.getAttribute('href')).toBe(desc.linkUrl);
        expect(linkEl.nativeElement.textContent).toContain(desc.linkText);
      });
    });
  });
});
