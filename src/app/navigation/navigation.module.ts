import { NgModule } from '@angular/core';
import { NavigationComponent } from './navigation.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [NavigationComponent],
  imports: [RouterModule],
  exports: [NavigationComponent],
})
export class NavigationModule {}
