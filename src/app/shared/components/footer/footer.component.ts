import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FooterService } from 'src/services/footer/footer.service';
import { FooterLinkItem, FooterState } from 'src/store/footer/_interfaces';
import { FooterActions } from 'src/store/footer/actions';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  footerLinks$: Observable<FooterLinkItem[] | null>;
  footerLinksLoading$: Observable<boolean>;
  footerLinksError$: Observable<string | null>;

  constructor(
    private store: Store<FooterState>,
    private footerService: FooterService
  ) {
    this.store.dispatch(FooterActions.load());

    this.footerLinks$ = this.footerService.footerLinks$;
    this.footerLinksLoading$ = this.footerService.footerLinksLoading$;
    this.footerLinksError$ = this.footerService.footerLinksError$;
  }
}
