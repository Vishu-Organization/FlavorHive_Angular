import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { VisionPageImage, VisionPageImageDescription } from 'src/store/page/_types';

@Component({
  selector: 'app-our-vision-images',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './our-vision-images.component.html',
  styleUrl: './our-vision-images.component.scss',
})
export class OurVisionImagesComponent {
  @Input({ required: true }) images!: VisionPageImage[];
  @Input({ required: true }) imageDescriptions!: VisionPageImageDescription[];
}
