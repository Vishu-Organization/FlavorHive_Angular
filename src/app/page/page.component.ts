import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WhatsCookingComponent } from '../shared/components/whats-cooking/whats-cooking.component';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [RouterModule, WhatsCookingComponent],
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
})
export class PageComponent {}
