import { Component } from '@angular/core';
import { RouterModule } from "@angular/router";
import { Observable } from 'rxjs';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss'
})
export class PageComponent {

  // vision$: Observable<>

}
