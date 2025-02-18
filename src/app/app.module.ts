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
import { HomeModule } from './home/home.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    NavigationModule,
    HomeModule,
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
      },
      {}
    ),
    EffectsModule.forRoot([AuthEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ApikeyInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
