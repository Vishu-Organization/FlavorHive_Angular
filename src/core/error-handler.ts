import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, inject, Injectable } from '@angular/core';
import {
  ErrorPayload,
  HttpErrorPayload,
  LogError,
  RuntimeErrorPayload,
} from 'src/app/types/logger';
import { LoggerService } from 'src/services/logger/logger.service';

@Injectable({ providedIn: 'root' })
export class GlobalErrorHandler implements ErrorHandler {
  private loggerService = inject(LoggerService);

  handleError(error: LogError): void {
    let logPayload: ErrorPayload;

    if (error instanceof HttpErrorResponse) {
      logPayload = {
        app: 'angular-app',
        env: 'dev',
        level: 'ERROR',
        timestamp: new Date().toISOString(),
        message: error.message,
        stack: null,
        url: error.url ?? window.location.href,
        userAgent: navigator.userAgent,
        status: error.status,
        statusText: error.statusText,
        type: 'HTTP_ERROR',
      } as HttpErrorPayload;
      console.error('HTTP error caught:', error);
    } else {
      logPayload = {
        app: 'angular-app',
        env: 'dev',
        level: 'ERROR',
        timestamp: new Date().toISOString(),
        message: String(error),
        stack: null,
        url: window.location.href,
        userAgent: navigator.userAgent,
        type: 'RUNTIME_ERROR',
      } as RuntimeErrorPayload;

      console.error('Unknown error caught:', error);
    }

    console.error('Global error caught:', error);

    this.loggerService.logError(logPayload).subscribe({
      next: (res) => console.log('Log sent successfully', res),
      error: (err) => console.error('Failed to send log', err),
    });
  }
}
