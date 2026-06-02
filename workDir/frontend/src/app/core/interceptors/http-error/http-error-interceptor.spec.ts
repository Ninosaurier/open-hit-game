import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { httpErrorInterceptor } from './http-error-interceptor';
import { LoggingService } from '../../services/logging/logging-service';

describe('httpErrorInterceptor', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let mockLoggingService: { error: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    mockLoggingService = {
      error: vi.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([httpErrorInterceptor])),
        provideHttpClientTesting(),
        { provide: LoggingService, useValue: mockLoggingService },
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    if (httpTestingController) {
      httpTestingController.verify();
    }
  });

  it('should pass through successful requests without logging', () => {
    httpClient.get('/api/test-success').subscribe({
      next: (response) => {
        expect(response).toEqual({ data: 'success' });
      },
    });

    const req = httpTestingController.expectOne('/api/test-success');
    req.flush({ data: 'success' });

    expect(mockLoggingService.error).not.toHaveBeenCalled();
  });

  it('should catch server-side errors and log them', () => {
    httpClient.get('/api/test-error').subscribe({
      next: () => {
        throw new Error('The request should have failed');
      },
      error: (error: Error) => {
        expect(error.message).toContain('Server-side error (Status: 500)');
      },
    });

    const req = httpTestingController.expectOne('/api/test-error');
    req.flush('Internal Server Error', { status: 500, statusText: 'Internal Server Error' });

    expect(mockLoggingService.error).toHaveBeenCalled();
  });

  it('should catch client-side errors and log them', () => {
    httpClient.get('/api/test-client-error').subscribe({
      next: () => {
        throw new Error('The request should have failed');
      },
      error: (error: Error) => {
        expect(error.message).toContain('Client-side error: Connection refused');
      },
    });

    const req = httpTestingController.expectOne('/api/test-client-error');
    const mockErrorEvent = new ErrorEvent('error', { message: 'Connection refused' });
    req.error(mockErrorEvent);

    expect(mockLoggingService.error).toHaveBeenCalled();
  });
});
