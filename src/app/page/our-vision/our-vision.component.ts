import { Component, inject } from '@angular/core';
import { PageService } from 'src/services/page/page.service';

@Component({
  selector: 'app-our-vision',
  standalone: true,
  imports: [],
  templateUrl: './our-vision.component.html',
  styleUrl: './our-vision.component.scss'
})
export class OurVisionComponent {

  private pageService = inject(PageService)

  constructor() { 

    this.pageService.getYoutubeVideoLink().subscribe(data => {
      console.log(data);
    })
  }

}
