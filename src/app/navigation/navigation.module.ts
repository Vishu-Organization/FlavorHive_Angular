import { NgModule } from '@angular/core';
import { NavigationComponent } from './navigation.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [NavigationComponent],
  imports: [RouterModule, CommonModule, MatIconModule],
  exports: [NavigationComponent],
})
export class NavigationModule {}
