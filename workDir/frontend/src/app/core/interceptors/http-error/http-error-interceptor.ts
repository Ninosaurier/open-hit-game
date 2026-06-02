import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { LoggingService } from '../../services/logging/logging-service';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const loggerService = inject(LoggingService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unknown error appeared.';

      if (error.error instanceof ErrorEvent) {
        errorMessage = `Client-side error: ${error.error.message}`;
      } else {
        errorMessage = `Server-side error (Status: ${error.status}): ${error.message}`;
      }

      loggerService.error(errorMessage, error);

      // TODO: (Issue-Number#1) Implement central UI notification (e.g., Toast/Snackbar service) here in the future
      return throwError(() => new Error(errorMessage));
    }),
  );
};
