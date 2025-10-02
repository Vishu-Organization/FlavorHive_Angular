import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OurVisionComponent } from './our-vision.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { OurVisionImagesComponent } from './our-vision-images/our-vision-images.component';

describe('OurVisionComponent', () => {
  let component: OurVisionComponent;
  let fixture: ComponentFixture<OurVisionComponent>;

  const mockVisionData = {
    url: 'https://www.youtube.com/watch?v=C_Xgn87CF-I',
    how_food_grown: 'Food is grown sustainably',
    quality_description: 'High quality ingredients',
  };

  const mockActivatedRoute = {
    data: of({ vision: mockVisionData }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurVisionComponent, OurVisionImagesComponent],
      providers: [{ provide: ActivatedRoute, useValue: mockActivatedRoute }],
    }).compileComponents();

    fixture = TestBed.createComponent(OurVisionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Component Initialization', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

    it('should have default images array', () => {
      expect(component.images.length).toBe(3);
      expect(component.images[0].alt).toBe('fish');
    });

    it('should have default imageDescriptions array', () => {
      expect(component.imageDescriptions.length).toBe(3);
      expect(component.imageDescriptions[1].description).toContain(
        'Not fed antibiotics'
      );
    });

    it('iframeHeight should be initialized with window.innerHeight', () => {
      expect(component.iframeHeight).toBe(window.innerHeight);
    });
  });

  describe('Vision signal', () => {
    it('should set vision signal with sanitized videoUrl', () => {
      const visionValue = component.vision();
      expect(visionValue).toBeTruthy();
      expect(visionValue!.how_food_grown).toBe(mockVisionData.how_food_grown);
      expect(visionValue!.quality_description).toBe(
        mockVisionData.quality_description
      );
      expect(visionValue!.videoUrl).toBeTruthy();
      // You can check that the videoId is in the URL
      const videoUrlString = (visionValue!.videoUrl as any)
        .changingThisBreaksApplicationSecurity as string;
      expect(videoUrlString).toContain('C_Xgn87CF-I');
    });
  });

  describe('extractVideoId', () => {
    it('should extract YouTube video ID correctly', () => {
      const url1 = 'https://www.youtube.com/watch?v=C_Xgn87CF-I';
      const url2 = 'https://youtu.be/C_Xgn87CF-I';
      const url3 = 'https://www.youtube.com/watch?v=C_Xgn87CF-I&t=30s';
      expect(component['extractVideoId'](url1)).toBe('C_Xgn87CF-I');
      expect(component['extractVideoId'](url2)).toBe('C_Xgn87CF-I');
      expect(component['extractVideoId'](url3)).toBe('C_Xgn87CF-I');
    });

    it('should return the url if no video ID found', () => {
      const invalidUrl = 'https://example.com';
      expect(component['extractVideoId'](invalidUrl)).toBe(invalidUrl);
    });
  });
});
