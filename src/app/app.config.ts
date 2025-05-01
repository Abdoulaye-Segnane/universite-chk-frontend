import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { jwtInterceptor } from './core/interceptors/jwt.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    // The `eventCoalescing` option reduces redundant change detection cycles by coalescing multiple events into a single change detection run.
        provideZoneChangeDetection({ eventCoalescing: true }), 
        provideRouter(routes), 
        provideClientHydration(withEventReplay()), 
        provideHttpClient(withFetch(), withInterceptors([jwtInterceptor])),
        provideAnimations(),

  ]
};
