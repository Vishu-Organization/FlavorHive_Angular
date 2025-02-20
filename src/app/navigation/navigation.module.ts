import { NgModule } from '@angular/core';
import { NavigationComponent } from './navigation.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared/shared.module';

@NgModule({
  declarations: [NavigationComponent],
  imports: [RouterModule, SharedModule],
  exports: [NavigationComponent],
})
export class NavigationModule {}
