import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SignupComponent } from './signup/signup.component';
import { HowItWorksComponent } from './signup/how-it-works/how-it-works.component';
import { AdditionalInfoComponent } from './signup/additional-info/additional-info.component';
import { SharedModule } from '../shared/shared/shared.module';

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    HowItWorksComponent,
    AdditionalInfoComponent,
  ],
  imports: [CommonModule, AuthRoutingModule, SharedModule],
})
export class AuthModule {}
