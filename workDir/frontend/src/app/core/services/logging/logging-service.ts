import { Injectable, isDevMode } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoggingService {
    log(message: string, ...args: unknown[]): void {
    if (isDevMode()) {
      console.log(`[INFO]: ${message}`, ...args);
    }
  }

  error(message: string, error?: unknown): void {
    if (isDevMode()) {
      console.error(`[ERROR]: ${message}`, error);
    }
  }
}
