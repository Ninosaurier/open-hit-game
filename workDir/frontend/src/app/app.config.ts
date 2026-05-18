import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { BASE_PATH } from '../core/api/variables';

import { routes } from './app.routes';
import { environment } from '../environments/environment';


export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(),
    { provide: BASE_PATH, useValue: environment.apiBasePath}
  ]
};