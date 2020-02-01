import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, Observable, Subject, throwError} from 'rxjs';

import {User} from '../shared/model/user';

import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);

  private api = environment.api;
  private loginRoute = environment.loginRoute;
  private registerRoute = environment.registerRoute;

  private tokenTimer: any;

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string) {
    console.log(this.api + this.loginRoute);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    return this.http.post<{ successful: boolean, message: string, token: string}>(
      this.api + this.loginRoute,
      {
        username,
        password
      }, httpOptions)
      .pipe(
        catchError(this.handleError), tap(
          resData => {
            this.handleAuthentication(username, resData.token, 3600);
          }
        )
      );
  }

  logout() {
    this.user.next(null);

    localStorage.removeItem('userData');

    if (this.tokenTimer) {
      clearTimeout(this.tokenTimer);
    }
    this.tokenTimer = null;
  }

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loadedUser = new User(userData.username);
    loadedUser.username = userData.username;
    loadedUser.token = userData.token;
    loadedUser.expiredIn = userData.expiredIn;
    loadedUser.expirationDate = userData.expirationDate;

    if (loadedUser.token !== '') {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData.expirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);

    }

  }

  autoLogout(expirationDuration: number) {
    if (expirationDuration < 0) {
      this.logout();
      return;
    }

    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);
  }


  register(username: string, password: string) {
    return this.http.post<{ successful: boolean, message: string, token: string}>(
      this.api + this.registerRoute,
      {
        username,
        password
      })
      .pipe(
        catchError(this.handleError), tap(
          resData => {
            this.handleAuthentication(username, resData.token, 3600);
          }
        )
      );
  }

  private handleAuthentication(username: string, token: string, expiresIn: number) {
    const d = new Date().getTime() + (expiresIn * 1000);
    const expirationDate = new Date(d);

    const user = new User(username, token, expiresIn, expirationDate);

    this.user.next(user);
    this.autoLogout(expiresIn * 1000);

    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    if (errorRes.error) {
      return throwError(errorRes.error.message);
    }

    return throwError('An unknown error occured!');
  }

}
