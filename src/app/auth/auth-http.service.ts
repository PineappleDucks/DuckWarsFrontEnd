import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthHttpService {
  private api = environment.api;
  private loginRoute = environment.loginRoute;
  private registerRoute = environment.registerRoute;

  constructor(private http: HttpClient) { }

  // github login
  login(body: any) {
    console.log('post: ' + this.api + this.loginRoute);
    return this.http.post(this.api + this.loginRoute, body);
  }

  // github registrieren
  register(body: any) {
    console.log('post: ' + this.api + this.registerRoute);
    return this.http.post(this.api + this.registerRoute, body);
  }
}
