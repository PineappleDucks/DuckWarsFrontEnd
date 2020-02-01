import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, exhaustMap, take} from 'rxjs/operators';

import {AuthService} from './auth.service';
import {HelperService} from '../shared/service/helper.service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService, private helperService: HelperService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
      take(1),
      exhaustMap(user => {
          if (!user) {
            return next.handle(req);
          }
          const modifiedReq = req.clone({ headers: req.headers.append('jsessionid', user.token) });
          return next.handle(modifiedReq);
        }
      ), catchError(err => {
        if (!err.status) {
          const errorMessage = 'No Connection! Please try again later!';

          this.helperService.openSnackBar(errorMessage, 'Close');
        } else {
          return throwError(err);
        }
      })
    );
  }
}
