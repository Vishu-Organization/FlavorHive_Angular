import { Component, inject } from '@angular/core';
import { OnTheMenuFilterService } from 'src/services/on-the-menu/on-the-menu-filter/on-the-menu-filter.service';

@Component({
  selector: 'app-on-the-menu-header-filter',
  standalone: true,
  imports: [],
  templateUrl: './on-the-menu-header-filter.component.html',
  styleUrl: './on-the-menu-header-filter.component.scss'
})
export class OnTheMenuHeaderFilterComponent {

  private service = inject( OnTheMenuFilterService);

  constructor() {
    this.service.getMenuHeaderFilters().subscribe(data=> console.log(data))
  }
}
