import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LoginResolver } from 'src/resolvers/login/login.resolver';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'sign-up',
    component: SignupComponent,
    resolve: { data: LoginResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
