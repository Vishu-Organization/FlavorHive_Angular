import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LinkType } from 'src/store/footer/_interfaces';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-footer-link',
  templateUrl: './footer-link.component.html',
  styleUrls: ['./footer-link.component.scss'],
  imports: [NgClass, RouterLink, RouterModule],
})
export class FooterLinkComponent {
  @Input() title = '';
  @Input() to = '';
  @Input() type: number | null = null;

  linkType = LinkType;

  get navigation(): string {
    if (!this.type || this.type === LinkType.Link) return `/${this.to}`;
    if (this.type === LinkType.Email) return `mailto:${this.title}`;
    return `tel:${this.title}`;
  }
}
