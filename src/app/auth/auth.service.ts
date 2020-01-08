import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, throwError} from 'rxjs';

import {AuthResponseData} from '../shared/model/AuthResponseData';
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

  constructor(private http: HttpClient, private router: Router) {
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      this.api + this.loginRoute,
      {
        email,
        password
      })
      .pipe(
        catchError(this.handleError), tap(
          resData => {
            this.handleAuthentication(email, resData.userId, resData.id, resData.ttl);
          }
        )
      );
  }

  logout() {
    this.user.next(null);

    // localStorage.clear();
    localStorage.removeItem('userData');

    if (this.tokenTimer) {
      clearTimeout(this.tokenTimer);
    }
    this.tokenTimer = null;
  }

  autoLogin() {
    // Check if user was stored before
    const userData = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    loadedUser.username = userData.username;
    loadedUser.description = userData.description;

    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);

    }

  }

  autoLogout(expirationDuration: number) {
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration);

  }

  register(email: string, password: string, username?: string) {
    return this.http.post<AuthResponseData>(
      this.api + this.registerRoute,
      {
        email,
        password,
        username
      })
      .pipe(
        catchError(this.handleError), tap(
          resData => {
          }
        )
      );
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const d = new Date().getTime() + (expiresIn * 1000);
    const expirationDate = new Date(d);
    const user = new User(email, userId, token, expirationDate);

    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {
    console.log(errorRes);

    const errorMessage = 'Keine Verbindung zum Server!';

    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }

    if (errorRes.error.error.message) {
      const arr = errorRes.error.error.message;
      let erg = '';
      let first = true;
      for (const key in arr) {
        if (arr.hasOwnProperty(key)) {
          if (!first) {
            erg = erg + ', ';
          }
          first = false;
          erg = erg + arr[key];
        }
      }
      if (erg !== '') {
        return throwError(erg);
      }
    }

    return throwError(errorRes.error.error.message);
  }
}
