import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import {
  PreloadAllModules,
  provideRouter,
  withPreloading,
  withRouterConfig,
} from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { APP_ROUTES } from './app/app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { SharedEffects } from './store/shared/effects';
import { AuthEffects } from './store/auth/effects';
import { HomeEffects } from './store/home/effects';
import { FooterEffects } from './store/footer/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { isDevMode } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { apikeyInterceptor } from './interceptors/apikey/apikey.interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
import { storeConfig } from './store/types/urls';
import { authInterceptor } from './interceptors/auth/auth.interceptor';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(
      APP_ROUTES,
      withPreloading(PreloadAllModules),
      withRouterConfig({ onSameUrlNavigation: 'ignore' })
    ),
    provideHttpClient(withInterceptors([apikeyInterceptor, authInterceptor])),
    provideStore(storeConfig),
    provideEffects([AuthEffects, HomeEffects, FooterEffects, SharedEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    MatSnackBar,
    provideAnimations(),
  ],
}).catch((err) => console.error(err));
