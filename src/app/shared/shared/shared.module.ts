import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WhatsCookingComponent } from '../components/whats-cooking/whats-cooking.component';
import { FooterComponent } from 'src/app/shared/components/footer/footer.component';
import { FooterLinkComponent } from 'src/app/shared/components/footer/footer-link/footer-link.component';
import { MatIconModule } from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [WhatsCookingComponent, FooterComponent, FooterLinkComponent],
  imports: [
    CommonModule,
    MatIconModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MatIconModule,
    FontAwesomeModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
  ],
  exports: [
    WhatsCookingComponent,
    FooterComponent,
    FooterLinkComponent,
    CommonModule,
    MatIconModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
  ],
})
export class SharedModule {}
