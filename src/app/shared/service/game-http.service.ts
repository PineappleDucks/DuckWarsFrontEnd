import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Message} from '../model/Message';

@Injectable({
  providedIn: 'root'
})
export class GameHttpService {
  private api = environment.api;
  private initRoute = environment.initRoute;
  private messageRoute = environment.messageRoute;

  constructor(private http: HttpClient) { }

  // github aktuellen stand
  init() {
    console.log('post: ' + this.api + this.initRoute);
    return this.http.post(this.api + this.initRoute, {});
  }

  // github nachrichtSenden
  message(message: Message) {
    console.log('post: ' + this.api + this.messageRoute);
    return this.http.post(this.api + this.messageRoute, message);
  }
}
