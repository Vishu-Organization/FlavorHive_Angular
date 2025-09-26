import { Component, inject, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import {
  VisionPageImage,
  VisionPageImageDescription,
  VisionRouteData,
} from 'src/store/page/_types';
import { OurVisionImagesComponent } from './our-vision-images/our-vision-images.component';

type VisionRouteDataWithSafeVideo = VisionRouteData & {
  videoUrl: SafeResourceUrl;
};

@Component({
  selector: 'app-our-vision',
  standalone: true,
  imports: [OurVisionImagesComponent],
  templateUrl: './our-vision.component.html',
  styleUrl: './our-vision.component.scss',
})
export class OurVisionComponent {
  vision = signal<VisionRouteDataWithSafeVideo | null>(null);
  iframeHeight: number = window.innerHeight;
  images: VisionPageImage[] = [
    { path: 'assets/our-vision/fish.svg', alt: 'fish' },
    { path: 'assets/our-vision/pig.svg', alt: 'pig' },
    { path: 'assets/our-vision/sprouting-plant.svg', alt: 'sprout' },
  ];
  imageDescriptions: VisionPageImageDescription[] = [
    { description: 'Sustainable seafood recommended by Seafood Watch®' },
    {
      description: 'Not fed antibiotics or hormones*',
      linkText: 'Learn More',
      linkUrl: '',
    },
    {
      description: 'Our quality standards are responsibly sourced.',
      linkText: 'Learn More',
      linkUrl: '',
    },
  ];
  private route = inject(ActivatedRoute);
  private sanitizer = inject(DomSanitizer);

  constructor() {
    this.route.data
      .pipe(
        map((data) => data['vision']),
        map((vision) => {
          const videoId = this.extractVideoId(vision.url);
          this.vision.set({
            ...vision,
            videoUrl: this.sanitizer.bypassSecurityTrustResourceUrl(
              `https://www.youtube.com/embed/${videoId}`
            ),
          });
        })
      )
      .subscribe(); // route data emits once and completes. Unsubscribe is not required.
  }

  private extractVideoId(url: string): string {
    const regExp = /(?:youtube\.com.*(?:\?|&)v=|youtu\.be\/)([^&#]+)/;
    const match = url.match(regExp);
    return match ? match[1] : url;
  }
}
