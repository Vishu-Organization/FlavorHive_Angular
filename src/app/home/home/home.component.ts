import { Component } from '@angular/core';
import { HomeHeroComponent } from '../home-hero/home-hero.component';
import { HomeBannerComponent } from '../home-banner/home-banner.component';
import { HomeRatingsComponent } from '../home-ratings/home-ratings.component';
import { HomeMenuComponent } from '../home-menu/home-menu.component';
import { HomeMealsShippedComponent } from '../home-meals-shipped/home-meals-shipped.component';
import { HomeTestimonialsComponent } from '../home-testimonials/home-testimonials.component';
import { HomeGettingStartedComponent } from '../home-getting-started/home-getting-started.component';
import { WhatsCookingComponent } from 'src/app/shared/components/whats-cooking/whats-cooking.component';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    HomeHeroComponent,
    HomeBannerComponent,
    HomeRatingsComponent,
    HomeMenuComponent,
    HomeMealsShippedComponent,
    HomeTestimonialsComponent,
    HomeGettingStartedComponent,
    WhatsCookingComponent,
  ],
})
export class HomeComponent {}
