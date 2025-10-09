import { Component } from '@angular/core';
import { OnTheMenuHeaderComponent } from './on-the-menu-header/on-the-menu-header.component';

@Component({
  selector: 'app-on-the-menu',
  standalone: true,
  imports: [OnTheMenuHeaderComponent],
  templateUrl: './on-the-menu.component.html',
  styleUrl: './on-the-menu.component.scss'
})
export class OnTheMenuComponent {

}
