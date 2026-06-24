import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideToastr } from 'ngx-toastr';
import { headerInterceptor } from './core/interceptors/header/header-interceptor';
import { loadingInterceptor } from './core/interceptors/loading/loading-interceptor';
import { errorInterceptor } from './core/interceptors/error/error-interceptor';
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes , withInMemoryScrolling({scrollPositionRestoration:'top'})  , withViewTransitions()),
    provideHttpClient(withFetch() , withInterceptors([headerInterceptor,loadingInterceptor,errorInterceptor])),
    importProvidersFrom(CookieService , NgxPaginationModule , NgxSpinnerModule),
    provideAnimations(),
    provideToastr(),
    provideClientHydration(withEventReplay())
  ]
};
