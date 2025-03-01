import { NgFor, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ISignupDataItem } from 'src/store/auth/_interfaces';

// import svg1

@Component({
  standalone: true,
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.scss'],
  imports: [NgFor, NgIf, MatProgressSpinnerModule],
})
export class HowItWorksComponent {
  @Input() howItWorksData: ISignupDataItem[] = [];
  @Input() howItWorksLoading = false;
  svgs = [
    {
      path: 'assets/signup/how-it-works/choose-meal.svg',
      alt: 'choose meal',
    },
    {
      path: 'assets/signup/how-it-works/enjoy-meal.svg',
      alt: 'enjoy meal',
    },
    {
      path: 'assets/signup/how-it-works/receive-meal.svg',
      alt: 'receive meal',
    },
  ];

  trackById(index: number, data: ISignupDataItem) {
    return data.id;
  }
}
