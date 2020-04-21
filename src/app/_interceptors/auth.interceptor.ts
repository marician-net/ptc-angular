import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor() {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let accessToken;
    if (localStorage.getItem('access_token')){
      accessToken = localStorage.getItem('access_token');
    }
    if (sessionStorage.getItem('access_token')){
      accessToken = sessionStorage.getItem('access_token');
    }
    if (accessToken){
      req = req.clone({
        setHeaders: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
    }

    return next.handle(req);

  }
}