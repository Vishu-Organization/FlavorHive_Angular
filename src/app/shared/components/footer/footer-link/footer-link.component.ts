import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LinkType } from 'src/store/footer/_interfaces';

@Component({
  standalone: true,
  selector: 'app-footer-link',
  templateUrl: './footer-link.component.html',
  styleUrls: ['./footer-link.component.scss'],
  imports: [NgClass],
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
