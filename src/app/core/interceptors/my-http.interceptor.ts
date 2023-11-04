import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (localStorage.getItem('_token') !== null) {
      const myToken: any = localStorage.getItem('_token');
      const bearer: string = '3b8ny__';
      request = request.clone({
        setHeaders: {
          token: bearer + myToken,
        },
      });
    }

    return next.handle(request);
  }
}
