import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { ISignupDataItem } from 'src/store/auth/_interfaces';
import { SignupDataState } from 'src/store/auth/reducer';
import { selectSignupAdditionalInfo } from 'src/store/auth/selectors';

@Component({
  selector: 'app-additional-info',
  templateUrl: './additional-info.component.html',
  styleUrls: ['./additional-info.component.scss'],
})
export class AdditionalInfoComponent {
  additionalInfo$ = this.store.select(selectSignupAdditionalInfo);

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
