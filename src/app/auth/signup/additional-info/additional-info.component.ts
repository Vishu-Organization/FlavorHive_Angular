import { AsyncPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ISignupDataItem, SignupDataState } from 'src/store/auth/_interfaces';
import { selectSignupAdditionalInfoData } from 'src/store/auth/selectors';

@Component({
  standalone: true,
  selector: 'app-additional-info',
  templateUrl: './additional-info.component.html',
  styleUrls: ['./additional-info.component.scss'],
  imports: [NgClass, NgFor, NgIf, AsyncPipe],
})
export class AdditionalInfoComponent {
  additionalInfo$ = this.store.select(selectSignupAdditionalInfoData);

  svgs = [
    {
      path: 'assets/signup/additional-info/convenient-delivery.svg',
      alt: 'convenient-delivery',
    },
    {
      path: 'assets/signup/additional-info/no-commitment.svg',
      alt: 'no-commitment',
    },
    {
      path: 'assets/signup/additional-info/personalized-menus.svg',
      alt: 'personalized-menus',
    },
  ];

  constructor(private store: Store<SignupDataState>) {}

  trackById(index: number, item: ISignupDataItem) {
    return item.id;
  }
}
