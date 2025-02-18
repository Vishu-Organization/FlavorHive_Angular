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
import { FooterComponent } from './footer/footer/footer.component';
import { footerReducer } from 'src/store/footer/reducer';
import { FooterLinkComponent } from './footer/footer/footer-link/footer-link.component';
import { FooterEffects } from 'src/store/footer/effects';

@NgModule({
  declarations: [AppComponent, FooterComponent, FooterLinkComponent],
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
      },
      {}
    ),
    EffectsModule.forRoot([AuthEffects, HomeEffects, FooterEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ApikeyInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
