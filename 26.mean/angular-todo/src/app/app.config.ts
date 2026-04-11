import { ApplicationConfig, provideZoneChangeDetection, provideBrowserGlobalErrorListeners, importProvidersFrom } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { NgxSpinnerModule } from 'ngx-spinner';
import { authInterceptor } from './interceptor/auth-interceptor';
import { errorInterceptor } from './interceptor/error-handler-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideBrowserGlobalErrorListeners(),

    // ✅ Register both interceptors here
    provideHttpClient(
      withInterceptors([
        authInterceptor,     // runs first
        errorInterceptor     // runs after (handles errors)
      ])
    ),

    provideRouter(routes),
    importProvidersFrom(NgxSpinnerModule)
  ]
};
