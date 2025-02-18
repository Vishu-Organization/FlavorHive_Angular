import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { HomeHeroComponent } from './home-hero/home-hero.component';
import { HomeRoutingModule } from './home-routing.module';
import { HomeBannerComponent } from './home-banner/home-banner.component';
import { HomeRatingsComponent } from './home-ratings/home-ratings.component';
import { HomeMealsShippedComponent } from './home-meals-shipped/home-meals-shipped.component';

@NgModule({
  declarations: [
    HomeComponent,
    HomeHeroComponent,
    HomeBannerComponent,
    HomeRatingsComponent,
    HomeMealsShippedComponent,
  ],
  imports: [CommonModule, HomeRoutingModule],
  exports: [],
})
export class HomeModule {}
