import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-home-hero',
  templateUrl: './home-hero.component.html',
  styleUrls: ['./home-hero.component.scss'],
})
export class HomeHeroComponent {
  desktopSrcSet = `assets/home/hero/desktop/home-header-640.webp 640w, assets/home/hero/desktop/home-header-750.webp 750w, assets/home/hero/desktop/home-header-828.webp 828w, assets/home/hero/desktop/home-header-1080.webp 1080w, assets/home/hero/desktop/home-header-1200.webp 1200w, assets/home/hero/desktop/home-header-1920.webp 1920w, ssets/home/hero/desktop/home-header-2048.webp 2048w, assets/home/hero/desktop/home-header-3840.webp 3840w`;
  mobileSrcSet = `assets/home/hero/mobile/home-hero-mobile-640.webp 640w, assets/home/hero/mobile/home-hero-mobile-750.webp 750w, assets/home/hero/mobile/home-hero-mobile-828.webp 828w, assets/home/hero/mobile/home-hero-mobile-1080.webp 1080w, assets/home/hero/mobile/home-hero-mobile-1200.webp 1200w, assets/home/hero/mobile/home-hero-mobile-1920.webp 1920w, ssets/home/hero/mobile/home-hero-mobile-2048.webp 2048w, assets/home/hero/mobile/home-hero-mobile-3840.webp 3840w`;
}
