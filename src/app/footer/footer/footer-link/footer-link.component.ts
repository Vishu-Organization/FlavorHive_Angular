import { Component, Input } from '@angular/core';
import { LinkType } from 'src/store/footer/_interfaces';

@Component({
  selector: 'app-footer-link',
  templateUrl: './footer-link.component.html',
  styleUrls: ['./footer-link.component.scss'],
})
export class FooterLinkComponent {
  @Input() title: string = '';
  @Input() to: string = '';
  @Input() type: number | null = null;
  
  linkType = LinkType;

  navigation =
    !this.type || this.type === LinkType.Link
      ? `/${this.to}`
      : this.type === LinkType.Email
      ? `mailto:${this.title}`
      : `tel:${this.title}`;
}
