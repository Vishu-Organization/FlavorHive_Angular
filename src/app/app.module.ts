import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';

import { NavigationModule } from './navigation/navigation.module';
import { authReducer, signupDataReducer } from 'src/store/auth/reducer';
import { AuthEffects } from 'src/store/auth/effects';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from 'src/interceptors/auth/auth.interceptor';
import { ApikeyInterceptor } from 'src/interceptors/apikey/apikey.interceptor';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { homeReducer } from 'src/store/home/reducer';
import { HomeEffects } from 'src/store/home/effects';

import { footerReducer } from 'src/store/footer/reducer';

import { FooterEffects } from 'src/store/footer/effects';
import { WhatsCookingComponent } from './shared/components/whats-cooking/whats-cooking.component';
import { SharedModule } from './shared/shared/shared.module';
import { sharedReducer } from 'src/store/shared/reducer';
import { SharedEffects } from 'src/store/shared/effects';

@NgModule({
  declarations: [AppComponent],
  imports: [
    NavigationModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSlideToggleModule,
    MatSnackBarModule,

    StoreModule.forRoot(
      {
        auth: authReducer,
        signupData: signupDataReducer,
        home: homeReducer,
        footer: footerReducer,
        shared: sharedReducer,
      },
      {}
    ),
    EffectsModule.forRoot([
      AuthEffects,
      HomeEffects,
      FooterEffects,
      SharedEffects,
    ]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    SharedModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ApikeyInterceptor, multi: true },
  ],
  exports: [WhatsCookingComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
