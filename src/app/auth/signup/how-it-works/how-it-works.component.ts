import { Component, Input } from '@angular/core';
import { ISignupDataItem } from 'src/store/auth/_interfaces';

// import svg1

@Component({
  selector: 'app-how-it-works',
  templateUrl: './how-it-works.component.html',
  styleUrls: ['./how-it-works.component.scss'],
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
